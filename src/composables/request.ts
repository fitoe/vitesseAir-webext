import { createAlova } from 'alova'
import { createClientTokenAuthentication } from 'alova/client'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'
import { isLogin, logout, user } from '~/composables/user'
import { baseHost } from '~/env'
import { baseHost as baseHostProduction } from '~/env.production'

const isDev = process.env.NODE_ENV !== 'production'
function handleRefreshToken() {
  return new Promise<void>((resolve, reject) => {
    try {
      useRequest(() => post('/auth/refresh-token', { refreshToken: user.value?.info?.refreshToken, client: 'extention' }, { meta: { authRole: 'refreshToken' } })).onSuccess((res) => {
        resolve(res)
      }).onError((err) => {
        reject(err)
      })
    }
    catch (error) {
      reject(error)
    }
  })
}

const { onAuthRequired } = createClientTokenAuthentication({
  assignToken: (method) => {
    method.config.headers.Authorization = `Bearer ${user.value?.info?.token || ''}`
  },
  refreshToken: {
    isExpired: (method) => {
      const token = user.value.info?.token || ''
      if (!token || token === 'prepare')
        return false

      try {
        const { exp } = JSON.parse(atob(token.split('.')[1]))
        const currentTime = Math.floor(Date.now() / 1000)
        return exp < currentTime
      }
      catch (error) {
        return false
      }
    },

    handler: async (method) => {
      try {
        const refreshResponse = await handleRefreshToken()
        if (refreshResponse && user.value?.info)
          user.value.info = refreshResponse.data.data
      }
      catch (error) {
        console.log(error)
      }
    },
  },
})

const instance = createAlova({
  statesHook: VueHook,
  baseURL: isDev ? baseHost : baseHostProduction,
  requestAdapter: adapterFetch(),
  timeout: 3000,
  cacheFor: {
    GET: 0,
    POST: 0,
  },
  beforeRequest: onAuthRequired((method) => {
    if (!isLogin.value && !['refreshToken', 'login'].includes(method.meta?.authRole))
      console.info('请先登录')
    if (system.value.status !== 'ok') {
      console.info('系统维护中')
      throw new Error('系统维护中')
    }
  }),
  responded: {
    onSuccess: async (response) => {
      switch (response.status) {
        case 200:
          return (await response.json())
        case 401:
          logout()
          throw new Error('请先登录')
        case 404:
          throw new Error('接口不存在')
          break
        default:
          break
      }
    },
    onError: (error, method) => {
      console.log('请求失败', error)

      // return Promise.reject(new Error('请求失败'))
    },
  },
})

// 优化：使用泛型和默认参数
export const get = (url: string, params?: object, config: object = {}) => instance.Get(url, { ...params, ...config })

export const post = (url: string, data?: object, config: object = {}) => instance.Post(url, data, config)

export const del = (url: string, data?: object, config: object = {}) => instance.Delete(url, data, config)

export const put = (url: string, data?: object, config: object = {}) => instance.Put(url, data, config)

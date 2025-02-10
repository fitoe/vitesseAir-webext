import { onMessage, sendMessage } from 'webext-bridge/background'
import { baseHost } from '~/env'

const isDev = process.env.NODE_ENV !== 'production'

const getVersion = useDebounceFn(() => {
  fetch(isDev ? `${baseHost}/release/version.manifest` : 'https://domain.com/release/version.manifest').then(async (data) => {
    const json = await data.json()
    system.value = json
  }).catch((error) => {
    system.value = {
      version: '1.0.1',
      status: 'error',
      remark: 'system maintenance',
    }
    console.error('error:', error)
  })
}, 600000, { maxWait: 1800000 })

onMessage('getVersion', () => {
  getVersion()
})

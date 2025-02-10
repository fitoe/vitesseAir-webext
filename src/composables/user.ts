export const user = useWebExtensionStorage('user', { info: { nickname: 'not login', token: 'prepare' } })

export function logout() {
  user.value = null
}
export const isLogin = computed(() => user.value?.info?.token && user.value?.info?.token !== 'prepare')

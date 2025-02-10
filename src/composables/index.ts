// version
import semver from 'semver'
import { version as version_ } from '../../package.json'

export function sleep(ms: number = 1) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export function getUid() {
  const url = new URL(window.location.href)
  const uid = url.searchParams.get('uid') // get uid from query params
  return uid
}

// get current tab id
export async function getCurrentTabId() {
  return new Promise<number>((resolve, reject) => {
    chrome.runtime.sendMessage({ action: 'getTabId' }, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      }
      else {
        resolve(response.tabId)
      }
    })
  })
}
export const version = version_
export const demoinput = useWebExtensionStorage('demoinput', 'sync with storage')
export const system = useWebExtensionStorage('system', defaultManifest)
export const latestversion = computed(() => semver.gt(system.value.version, version) ? '立即更新' : '') // new version prompt text
export const isminorupdate = computed(() => ['minor', 'major'].includes(semver.diff(system.value.version, version))) // whether it is a minor update
export function copy(text: string) {
  navigator.clipboard.writeText(text)
}

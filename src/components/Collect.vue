<script setup lang="ts">
// inject script
import { onMessage, sendMessage } from 'webext-bridge/content-script'
import { isLogin, user } from '~/composables/user'

async function handleMessage(e: MessageEvent) {
  if (e.data.type === 'xhr') {
    const item = injectWhitelist.find(item => e.data?.url.includes(item.url) && item.method === e.data.method)
    if (item) {
      const tabid = await getCurrentTabId()
      const result = {
        url: e.data.url,
        data: e.data?.data,
        tabid,
      }
      sendMessage(item.command, result, 'background')
    }
  }
  // ... message ...
}

function injectScript(file_path, node) {
  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', file_path)
  node.appendChild(script)
  script.onload = function () {
    // this.remove();
  }
}

injectScript(browser.runtime.getURL('assets/injected.js'), (document.head || document.documentElement))

onMounted(() => {
  window.addEventListener('message', handleMessage)
})
</script>

<template>
  <div class="fixed flex-center text-white bg-red left-20 bottom-10 m-5 z-100 flex items-end font-sans select-none leading-1em" />
</template>

<script setup lang='ts'>
import { onMessage, sendMessage } from 'webext-bridge/content-script'

import { isLogin } from '../../composables/user'

onMounted(() => {
  // do something
})
onMessage('message', async ({ data }) => {
  // send message to background
  sendMessage('dosomething', { tabid: tabId }, 'background')
})

const toolbarel = ref<HTMLElement | null>(null)
const started = ref(false)
const storePosition = useStorage('toolbar-position', { x: window.innerWidth / 2 - 150, y: 0 })
const { x, y, style } = useDraggable(toolbarel, {
  initialValue: storePosition,
  preventDefault: true,
  stopPropagation: true,
  onStart: (position, event) => {
    started.value = true
  },
  onEnd: (Position, event) => {
    started.value = false
    storePosition.value = Position
    // prevent drag out of window
    const maxX = window.innerWidth - toolbarel.value?.offsetWidth - 20 || 0
    const maxY = window.innerHeight - toolbarel.value?.offsetHeight - 20 || 0

    if (Position.x < 0)
      Position.x = 0
    if (Position.y < 0)
      Position.y = 0
    if (Position.x > maxX)
      Position.x = maxX
    if (Position.y > maxY)
      Position.y = maxY
  },
})
</script>

<template>
  <div ref="toolbarel" :style="style" :class="[started ? 'cursor-move' : '', storePosition.y === 0 ? 'b-t-none rounded-t-none' : 'rounded-t-lg']" class="fixed shadow transition-shadow duration-100 z-2001 flex items-center gap-x-3 b b-white rounded-b-lg  bg-white bg-opacity-10 px-2 py-1 text-sm text-black  backdrop-blur backdrop-blur ">
    toolbar
  </div>
</template>

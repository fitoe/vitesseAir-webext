<script setup lang="ts">
import { sendMessage } from 'webext-bridge/popup'
// sendMessage('getVersion', {}, 'background')
</script>

<template>
  <main class="">
    <router-view />
  </main>
</template>

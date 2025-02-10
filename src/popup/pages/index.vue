<script setup lang="ts">
import { isLogin, user } from '~/composables/user'

const router = useRouter()
onMounted(async () => {
  await sleep()
  if (system.value.status !== 'ok') {
    router.push('/notavailable')
  }
  else if (user.value?.info?.token && user.value?.info?.token !== 'prepare' && isLogin.value) {
    router.push('/users')
  }
  else {
    router.push('/login')
  }
})
</script>

<template>
  <div class="" />
</template>

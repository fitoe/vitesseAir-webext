<script setup lang="ts">
import { isLogin, user } from '~/composables/user'

const router = useRouter()

function logout() {
  user.value = {}
  router.push('/login')
}
</script>

<template>
  <div class="py-4 w-52 bg-gradient-to-b from-white to-sky-50 p-3">
    <div class="mx-auto rounded-full b b-sky-5 bg-sky-50 mb-2 w-12 h-12 flex-center">
      <div class=" text-xl i-ep-user  text-sky-5" />
    </div>
    <div class="text-blue text-base text-center">
      {{ user?.info?.nickname }}
    </div>
    <div class="my-8 text-center ">
      some content here
    </div>
    <div class="text-xs flex-between mt-3">
      <Version />
      <el-link v-if="isLogin" class="text-xs! block" size="small" plain type="primary" round @click="logout">
        Logout
      </el-link>
    </div>
  </div>
</template>

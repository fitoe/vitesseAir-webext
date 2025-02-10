<script setup lang='ts'>
import { user } from '~/composables/user'

const router = useRouter()
const formref = ref()
const form = reactive({
  username: '',
  password: '',
  client: 'extention',
  machineid: Math.random().toString(36).substring(2, 8),
})
const rules = reactive({
  username: [
    { required: true, message: 'username is required', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'password is required', trigger: 'blur' },
  ],
})
// const { send } = useRequest(
//   post('/auth/login', form, { meta: { authRole: 'login' } }),
//   { immediate: false },
// ).onSuccess(({ data }) => {
//   $message.success('login success')
//   user.value.info = data.data
//   router.push('/users')
// }).onError(({ error }) => {
//   console.log('login error', error)
//   $message.error(error.message)
// })

// mock login
async function send() {
  $message.success('login success')
  user.value.info = {
    nickname: 'Tom',
    token: 'test',
  }
  router.push('/users')
}

async function submit() {
  try {
    await formref.value.validate()
    await send()
  }
  catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div class="w-64 px-4 py-2">
    <div class="flex-center">
      <div class="w-full">
        <div class="text-gradient text-center text-xl my-4 font-bold">
          Login
        </div>
        <div class="text-center text-sm text-gray-500">
          {{ form.uuid }}
        </div>
        <div class="">
          {{ user.value?.info?.token }}
        </div>
        <el-form ref="formref" class="" size="large" :model="form" status-icon :rules="rules" label-width="auto">
          <el-form-item label="" prop="username">
            <el-input v-model="form.username" prefix-icon="i-ep-user" placeholder="username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="form.password" prefix-icon="i-ep-lock" type="password" placeholder="password" autocomplete="off" @keyup.enter="submit" />
          </el-form-item>
          <el-form-item>
            <el-button class="w-full" type="primary" round @click="submit">
              login
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Version />
  </div>
</template>

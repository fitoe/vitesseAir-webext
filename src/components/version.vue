<script setup lang='ts'>
const router = useRouter()

onMounted(() => {
  if (isminorupdate.value) {
    router.push('/needupdate')
  }
})
watch(isminorupdate, (newVal) => {
  if (newVal) {
    router.push('/needupdate')
  }
})
</script>

<template>
  <div class=" flex-center gap-x-2 text-gray-4 text-center">
    <div class="text-sm">
      v{{ version }}
    </div>
    <a v-if="latestversion" target="_blank" :href="downloadPage" class="text-xs text-red">
      <el-tag type="danger" size="small" plain round>
        {{ latestversion }}
      </el-tag>
    </a>
  </div>
</template>

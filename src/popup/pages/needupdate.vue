<script setup lang='ts'>
</script>

<template>
  <div class="w-52 py-5 px-4 bg-gradient-to-b space-y-5 from-white to-blue-50 rounded-lg">
    <div class="text-center">
      <div class="text-xl text-sky-500 font-bold">
        需要升级
      </div>
    </div>
    <div class="flex-center gap-x-2">
      <el-tag plain size="small">
        {{ version }}
      </el-tag>
      <div class="i-ep-right" />
      <el-tag plain size="small" type="danger">
        {{ system.version }}
      </el-tag>
    </div>
    <div class="text-center">
      <div class="text-sm">
        软件进行了功能更新
      </div>
    </div>
    <div class="text-center">
      <a :href="downloadPage" target="_blank">
        <el-button type="primary">
          立即升级
        </el-button>
      </a>
    </div>
  </div>
</template>

<route lang='yaml'>
meta:
  title: '需要升级'
</route>

import { setupLayouts } from 'virtual:generated-layouts'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { setupApp } from '~/logic/common-setup'
import App from './Popup.vue'
import '../styles'

// 配置路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: setupLayouts(routes),
})

const app = createApp(App)
app.use(router)
setupApp(app)
app.mount('#app')

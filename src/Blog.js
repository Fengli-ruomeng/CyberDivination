import { createApp } from 'vue'
import Blog from './blog.vue'
import router from './router/index.js'  // 添加router导入

const app = createApp(Blog)
app.use(router)
app.mount('#app')
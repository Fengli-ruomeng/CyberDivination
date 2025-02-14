// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Blog from '../blog.vue' // 导入 Blog 组件

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  },
  {
    path: '/blog', // blog 的路径
    name: 'Blog',
    component: Blog // blog 对应的组件
  },
  // 其他路由...
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
<template>
  <div class="cyber-blog">
    <!-- 头部 -->
    <header class="blog-header">
      <h1 class="neon-title">量子观测日志</h1>
      <div class="matrix-divider"></div>
    </header>

    <!-- 文章列表 -->
    <div class="post-grid">
      <article 
        v-for="post in posts" 
        :key="post.id"
        class="cyber-post"
        @mouseenter="hoverPost(post.id)"
      >
        <div class="post-glitch" :class="{ active: post.hover }"></div>
        <h2 class="post-title">{{ post.title }}</h2>
        
        <div class="post-meta">
          <span class="neon-tag">#{{ post.category }}</span>
          <time class="neon-date">{{ formatDate(post.date) }}</time>
        </div>

        <p class="post-excerpt">{{ post.excerpt }}</p>
        
        <el-button 
          type="primary" 
          class="cyber-button"
          @click="readPost(post)"
        >
          <span class="button-text">量子解析</span>
        </el-button>
      </article>
    </div>

    <!-- 占卜彩蛋 -->
    <div class="easter-egg" @click="showDivination">
      <div class="matrix-code">01010111 01101000 01100001 01110100 00100111 01110011 00100000 01101110 01100101 01111000 01110100 00111111</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟数据
const posts = ref([
  {
    id: 1,
    title: '2024年星象运势预测',
    date: '2023-12-25',
    category: '占星术',
    excerpt: '根据量子计算模拟，2024年主要星象变化将带来...',
    content: '...',
    hover: false
  },
  {
    id: 2,
    title: '塔罗牌阵的量子解释',
    date: '2023-12-20',
    category: '塔罗牌',
    excerpt: '通过量子纠缠理论解析经典凯尔特十字牌阵...',
    content: '...',
    hover: false
  },
  {
    id: 3,
    title: '测试内容3',
    date: '2099-9-9',
    category: '崩坏',
    excerpt: '我们正在寻找web开发的可能性',
    content: '...',
    hover: false
  },
  {
    id: 4,
    title: '测试内容4',
    date: '2043-1-2',
    category: 'Testing',
    excerpt: '我应该在这里写点什么吗？',
    content: '...',
    hover: false
  }
])

// 日期格式化
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 悬停效果
const hoverPost = (postId) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.hover = true
    setTimeout(() => post.hover = false, 1000)
  }
}

// 跳转详情页
const readPost = (post) => {
  router.push({
    path: `/post/${post.id}`,
    query: { 
      title: post.title,
      content: post.content
    }
  })
}

// 彩蛋功能
const showDivination = () => {
  router.push('/'); // 跳转到主页
}
</script>

<style>

html,body {
    background: black;
}

</style>

<style scoped>
.cyber-blog {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #00ff9d;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.neon-title {
  color: #00ff9d;
  text-shadow: 0 0 20px #00ff9d;
  font-size: 2.5rem;
}

.post-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.cyber-post {
  position: relative;
  padding: 2rem;
  background: rgba(0, 30, 30, 0.9);
  border: 1px solid #ff00ff;
  transition: all 0.3s ease;
}

.post-glitch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, 
    transparent 49%, 
    #ff00ff 50%, 
    transparent 51%);
  opacity: 0;
}

.post-glitch.active {
  animation: glitch 0.3s infinite;
  opacity: 0.3;
}

@keyframes glitch {
  0% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  100% { transform: translateX(0); }
}

.post-title {
  color: #00ff9d;
  margin-bottom: 1rem;
}

.post-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.neon-tag {
  background: rgba(0, 255, 157, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  color: #00ff9d;
}

.neon-date {
  color: #ff00ff;
}

.easter-egg {
  margin-top: 3rem;
  text-align: center;
  cursor: pointer;
}

.matrix-code {
  color: #00ff9d;
  font-family: monospace;
  opacity: 0.3;
  transition: opacity 0.3s;
}

.matrix-code:hover {
  opacity: 1;
}
</style>

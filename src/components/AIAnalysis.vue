<template>
  <div class="ai-analysis">
    <h3 class="neon-title">🔮 赛博灵媒解读 🔮</h3>
    <div class="loading" v-if="isLoading">
      <div class="matrix-loader">量子解析中...</div>
    </div>
    <div class="content" v-else>
      <p class="glitch-text">{{ analysisText }}</p>
    </div>
    <el-button @click="$emit('close')" class="cyber-button">关闭解读</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import OpenAI from "openai"

const props = defineProps({
  cards: Array
})

const isLoading = ref(true)
const analysisText = ref('')

// 修改后的API调用方法
const fetchAnalysis = async () => {
  try {
    const prompt = `作为塔罗牌占卜师，请解读以下牌阵：
    ${props.cards.map(c => `${c.name}（${c.isUpside ? '正位' : '逆位'}）`).join('、')}
    请用200字以内给出专业解读，包含以下要素：
    1. 整体运势分析
    2. 每张牌的具体含义
    3. 结合牌阵的综合建议
    使用口语化中文，带有些许神秘感`
    
    const response = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "你是一位资深的塔罗牌占卜师，擅长结合牌阵给出精准解读" },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    analysisText.value = response.choices[0].message.content
  } catch (error) {
    analysisText.value = '⚠️ 量子通道受阻，请稍后再试...'
    console.error('API调用失败:', error)
  } finally {
    isLoading.value = false
  }
}

// 在组件初始化时创建OpenAI实例
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-9d45be2d8fda4a449623ae30cfc22e88',
  dangerouslyAllowBrowser: true // 允许浏览器环境使用
})

fetchAnalysis()
</script>

<style scoped>
.ai-analysis {
  border: 2px solid #ff00ff;
  padding: 2rem;
  margin: 2rem;
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 0 0 30px rgba(255,0,255,0.3);
}

.neon-title {
  color: #ff00ff;
  text-shadow: 0 0 10px #ff00ff;
  margin-bottom: 1.5rem;
}

.matrix-loader {
  color: #00ff9d;
  animation: glitch 1s infinite;
}

@keyframes glitch {
  0% { text-shadow: 2px 0 #00ff9d, -2px 0 #ff00ff; }
  50% { transform: translateX(2px); }
  100% { transform: translateX(0); }
}
</style> 
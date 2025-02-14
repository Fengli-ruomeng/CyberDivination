<template>
  <el-container class="cyber-container" :class="{'doomed-theme' : isDoomed }">
    <!-- 头部 -->
    <el-header class="title-text">
      <h1>赛博占卜屋</h1>
      <nav class="cyber-nav">
        <div class="borderCle"><a href="https://github.com/Fengli-ruomeng/Fengli-ruomeng"><span class="nav-texts">About Me</span></a></div>
        <div class="borderCle"><a href="h#"><span class="nav-texts">My Other Web</span></a></div>
        <div class="borderCle"><a href="https://github.com/Fengli-ruomeng"><span class="nav-texts">Github pages</span></a></div>
        <div class="borderCle"><a href="h#/"><span class="nav-texts">Testbutton</span></a></div>
      </nav>
    </el-header>
    
    <el-main>

      <div class="control-panel">
        <!-- 占卜按钮 -->
        <el-button 
          :disabled=true
          type="primary" 
          class="cyber-button" 
          @click="startDivination"
        >
          <span class="neon-text">开始占卜</span>
        </el-button>

        <!-- 新增的矩阵特效按钮 -->
        <el-button 
          type="danger" 
          class="cyber-button"
          @click="showMatrixEffect = !showMatrixEffect"
        >
          <span class="neon-text">
            {{ showMatrixEffect ? '关闭' : '开启' }}数字雨
          </span>
        </el-button>

        <el-button
          type="primary"
          class="cyber-button"
        >
        <span class="neon-text" @click="tarotCardEvent">
          塔罗牌测试
        </span>
      </el-button>
      </div>

      <!-- 占卜结果卡片组件 -->
      <CyberCard 
        ref="cyberCard"
        @doomsday-start="handleDoomsday"
        @doomsday-end="isDoomed = false"
      />

      <Tarot
        ref="tarotCard"
      />

      <!-- 数字雨特效 -->
      <div v-if="showMatrixEffect" class="matrix-effect">
        <span 
          v-for="(char, index) in matrixChars" 
          :key="index" 
          class="matrix-char"
          :style="{
            left: `${char.x}%`,
            animationDelay: `${char.delay}s`
          }"
        >{{ char.value }}</span>
      </div>
    </el-main>

    <!-- 底部 -->
    <el-footer>
      <p class="neon-text">🛸 Version：Beta 0.0.1 🛸</p>
    </el-footer>

  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import CyberCard from './components/CyberCard.vue'  // [!code focus] 确保路径正确
import Tarot from './components/Tarot.vue'

const isDoomed = ref(false)

const handleDoomsday = (doomedState) => {
  isDoomed.value = doomedState
  if (doomedState) {
    document.body.classList.add('doomed-effect')
  } else {
    document.body.classList.remove('doomed-effect')
  }
}

const tarotCardEvent = () => {
  if (tarotCard.value.isShow === false) tarotCard.value.isShow = true
  tarotCard.value.generateResult()
}

// --- 核心逻辑 ---
const cyberCard = ref(null)       // [!code focus] 获取子组件实例
const showMatrixEffect = ref(false) // 控制数字雨显示
const tarotCard = ref(null)

// 生成随机数字雨字符
const matrixChars = ref(
  Array.from({ length: 50 }, () => ({
    x: Math.random() * 100,
    delay: Math.random() * 5,
    value: Math.random() > 0.5 ? '0' : '1'
  }))
)

// 启动占卜
const startDivination = () => {  // [!code focus] 关键修复点
  if (cyberCard.value) {
    cyberCard.value.generateResult() // [!code focus] 必须与子组件暴露的方法名完全一致
  }
}
</script>

<style>

html,body {
  background: #000000;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

</style>

<style scoped>

/* 容器样式 */
.cyber-container {
  background: transparent !important;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* 控制面板布局 */
.control-panel {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 2rem;
}

/* 数字雨特效 */
.matrix-effect {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 允许点击穿透 */
  z-index: 0;          /* 确保在内容下方 */
  opacity: 0.3;
}

.matrix-char {
  color: #00ff9d;
  font-family: 'Courier New', monospace;
  position: absolute;
  animation: fall 5s linear infinite;
  user-select: none; /* 禁止文字被选中 */
}

@keyframes fall {
  from { transform: translateY(-100vh); }
  to { transform: translateY(100vh); }
}

/* 霓虹文字效果 */
.neon-text {
  text-shadow: 0 0 10px #00ff9d;
}

.title-text {
  color: #000000;
  text-shadow: 0 0 10px #00eeff;
}

/* 按钮统一样式 */
.cyber-button {
  border: 2px solid #00ff9d !important;
  background: transparent !important;
  transition: all 0.3s ease !important;
}

.cyber-button:hover {
  background: rgba(0, 255, 157, 0.1) !important;
  box-shadow: 0 0 15px #00ff9d !important;
}

/* 新增末日主题样式 */
.doomed-theme {
  background: #ff0000 !important;
  color: #000 !important;
  transition: all 1s ease;
}

.doomed-theme .neon-text {
  text-shadow: 0 0 10px #000 !important;
  color: #000 !important;
}

/* 全局末日特效 */
.doomed-effect {
  animation: doomShake 0.5s infinite;
}

@keyframes doomShake {
  0% { transform: translate(1px, 1px); }
  10% { transform: translate(-1px, -2px); }
  20% { transform: translate(-3px, 0px); }
  30% { transform: translate(3px, 2px); }
  40% { transform: translate(1px, -1px); }
  50% { transform: translate(-1px, 2px); }
  60% { transform: translate(-3px, 1px); }
  70% { transform: translate(3px, 1px); }
  80% { transform: translate(-1px, -1px); }
  90% { transform: translate(1px, 2px); }
  100% { transform: translate(1px, -2px); }
}

/* 新增导航样式 */
.cyber-nav {
  transform: translateX(-20px);
  justify-content: flex-end;
  margin-right: 20px;
  margin-top: -3rem;
  display: flex;
  gap: 0.5rem;
}

.nav-button {
  background: transparent !important;
  border: 2px solid #00ff9d !important;
}

.active-nav {
  background: rgba(0, 255, 157, 0.1) !important;
  box-shadow: 0 0 15px #00ff9d !important;
}

.borderCle {
  border: 2px solid #ffffff;
  border-radius: 4px;
  padding: 8px;
  display: inline-block;
}

.nav-texts {
  color: white;
  text-shadow: 0px 0px 30px pink;
}
</style>

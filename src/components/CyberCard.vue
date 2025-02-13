<template>
    <div class="cyber-card" v-if="showResult">
      <h3 class="neon-effect">🔮 量子占卜结果 🔮</h3>
      <p class="glitch-text">{{ resultText }}</p>
      <el-button @click="reset" class="cyber-button">重置命运</el-button>
    </div>
  </template>
  
  <script setup>

  const isDoomed = ref(false)

  import { ref , watch } from 'vue'
  
  const resultList = ref([
  '你是一个乐观的人，总是能看到生活中的美好。',
    '你最近可能会遇到一些挑战，但不要担心，你会克服的。',
    '你的努力会得到回报，未来会有更好的发展。',
    '你是一个有创造力的人，你的想法总是与众不同。',
    '你是一个有责任感的人，总是尽力完成自己的工作。',
    '你是一个有爱心的人，总是关心身边的人。',
    '你是一个有智慧的人，总是能看到问题的本质。',
    '你的一切都要完蛋了。'
  ])
  
  const emit = defineEmits(['doomsday-start', 'doomsday-end'])
  
  watch(isDoomed, (newVal) => {
    if (newVal) {
      emit('doomsday-start', true)
      const audio = null
      /** audio.play()*/
    } else {
      emit('doomsday-end')
    }
  })

  const showResult = ref(false)
  const resultText = ref('')
  
  const generateResult = () => {
    showResult.value = true
    const randomIndex = Math.floor(Math.random() * resultList.value.length)
    resultText.value = resultList.value[randomIndex]

    isDoomed.value = resultText.value === '你的一切都要完蛋了。'
  }
  
  const reset = () => {
    showResult.value = false
    resultText.value = ''
    isDoomed.value = false
  }
  
  defineExpose({ generateResult,isDoomed })
  </script>
  
  <style scoped>
  .cyber-card {
    border: 2px solid #00ff9d;
    padding: 2rem;
    margin: 2rem auto;
    max-width: 600px;
    background: rgba(0, 0, 0, 0.7);
    box-shadow: 0 0 20px rgba(0, 255, 157, 0.3);
  }
  
  .neon-effect {
    color: #00ff9d;
    text-shadow: 0 0 10px #00ff9d;
    margin-bottom: 1.5rem;
  }
  
  .glitch-text {
    color: #ff00ff;
    animation: glitch 1s infinite;
    font-size: 1.2rem;
    padding: 1rem;
    min-height: 60px;
  }
  
  @keyframes glitch {
    0% { 
      text-shadow: 2px 0 #00ff9d;
      transform: translateX(0);
    }
    50% { 
      text-shadow: -2px 0 #ff00ff;
      transform: translateX(2px);
    }
    100% { 
      text-shadow: 2px 0 #00ff9d;
      transform: translateX(0);
    }
  }
  
  .cyber-button {
    margin-top: 1rem;
  }
  </style>
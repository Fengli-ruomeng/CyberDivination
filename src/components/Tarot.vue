<template>
    <div class="tarot-card" v-if="isShow">
        <h2 class="tarotCard-title">以下是你的塔罗牌结果...</h2>

        <div class="three-cards">
            <div
              v-for="(card,index) in selectedCards":key="index"
              class="single-card":style="{ transform: `rotate(${card.rotation}deg)` }"
              >
              <h3 class="tarotCard-text-1">{{card.name}}</h3>
              <p class="tarotCard-text">{{card.isUpside?card.upside:card.downside}}</p>
              <p class="card-position">{{ card.isUpside ? '正位' : '逆位' }}</p>
            </div>   
        </div>

        <h3 class="tarotCard-title">感觉结果不准么?可能是心里想的东西不够准确哦。</h3>
        <h3 class="tarotCard-title">塔罗牌需要你虔诚的想着一件事情,然后再去获得占卜的结果。</h3>
        <h3 class="tarotCard-title">一次就好，不要太多。不如怀揣着这样的心态，再试试吧？</h3>

        <el-button
            color="lime"
            class="tarot-button"
        ><span class="buttonText" @click="generateResult">我要再来一次!</span>
        </el-button>

        <el-button
            color="red"
            class="tarot-button"
        ><span class="buttonText" @click="exitTarot">不玩了不玩了</span>
        </el-button>

        <el-button 
          color="purple"
          class="tarot-button"
          @click="showAIAnalysis = true"
        >
          <span class="buttonText">AI深度解析</span>
        </el-button>

    </div>

    <el-dialog 
      v-model="showAIAnalysis"
      title="量子灵媒解析中..."
      width="70%"
    >
      <AIAnalysis :cards="selectedCards" @close="showAIAnalysis = false" />
    </el-dialog>
</template>

<script setup>
    import { ref , defineExpose } from 'vue'
    import AIAnalysis from './AIAnalysis.vue'

    const tarotDeck = [
        {name: "愚者", upside: "事情的开始，行动的改变，熟练的技巧，贯彻自我。", downside: "意志力薄弱，起头难，走入错误的方向，知识不足，被骗和失败。"},
        {name: "魔术师", upside: "创造力，沟通能力，新计划开始，充满能量和自信。", downside: "意志力薄弱，计划失败，技能不足，欺骗和犹豫不决。"},
        {name: "女祭司", upside: "直觉敏锐，隐藏的智慧，神秘事物的探索，冷静思考。", downside: "冷漠无情，情绪化，知识封闭，神经质和秘密泄露。"},
        {name: "皇后", upside: "丰收富足，母性关怀，艺术创造力，幸福美满的生活。", downside: "奢侈浪费，情绪不安，财务问题，不孕或亲子关系紧张。"},
        {name: "皇帝", upside: "权威领导，组织能力，理性判断，物质成功。", downside: "独裁专制，缺乏温情，过于保守，权力斗争。"},
        {name: "教皇", upside: "传统价值，精神指引，道德规范，学校教育。", downside: "思想僵化，盲目追随，虚伪说教，打破传统。"},
        {name: "恋人", upside: "美好恋情，重要抉择，价值观契合，人际关系和谐。", downside: "情感纠纷，错误选择，背信弃义，价值观冲突。"},
        {name: "战车", upside: "胜利突破，自我控制，积极行动，旅行迁移。", downside: "鲁莽冲动，失去方向，交通事故，人际冲突。"},
        {name: "力量", upside: "内在力量，勇气耐心，以柔克刚，掌控欲望。", downside:  "失去信心，软弱无能，情绪失控，权力滥用。"},
        {name: "隐士", upside: "谨慎思考，心灵探索，寻求指引，独处自省。", downside: "过度保守，孤独自闭，错误建议，逃避现实。"},
        {name: "命运之轮", upside: "命运转折，新的机遇，形势变化，因果循环。", downside: "意外变故，抗拒改变，厄运循环，事与愿违。"},
        {name: "正义", upside: "公平裁决，理性分析，法律事务，道德平衡。", downside: "偏见不公，逃避责任，法律纠纷，道德失衡。"},
        {name: "倒吊人", upside:  "换位思考，自我牺牲，等待时机，精神觉醒。", downside: "无谓牺牲，钻牛角尖，逃避现实，精神压抑。"},
        {name: "死神", upside: "结束重生，彻底改变，放下过去，新陈代谢。", downside: "恐惧改变，顽固守旧，关系终结，意外灾祸。"},
        {name: "节制", upside:  "调和适应，循序渐进，自我控制，心灵成长。", downside: "失衡失调，沟通障碍，缺乏目标，能量耗散。"},
        {name: "恶魔", upside:  "物质欲望，沉迷上瘾，职场竞争，性吸引力。", downside: "摆脱束缚，破除心魔，欲望解放，道德觉醒。"},
        {name: "塔", upside:  "突发剧变，打破幻想，真相揭露，革命性改变。", downside:  "灾难打击，重大损失，信念崩溃，意外变故。"},
        {name: "星星", upside:  "希望重生，灵感涌现，心灵疗愈，美好愿景。", downside: "希望破灭，创意枯竭，情绪低落，方向迷失。"},
        {name: "月亮", upside:  "潜意识活动，直觉感应，潜在危机，情感困惑。", downside: "精神错乱，欺骗隐瞒，自我欺骗，莫名恐惧。"},
        {name: "太阳", upside:  "成功喜悦，活力充沛，纯真快乐，健康成长。", downside: "过度天真，盲目乐观，幼稚行为，发展停滞。"},
        {name: "审判", upside:  "灵魂觉醒，复活新生，重大决定，因果清算。", downside: "优柔寡断，自我否定，无法重生，旧事重演。"},
        {name: "世界", upside:  "圆满达成，旅程结束，完美成果，宇宙和谐。", downside: "未完成态，计划延迟，过度完美主义，缺乏成就感。"}
    ]

    const isShow = ref(false)
    const selectedCards = ref([])
    const showAIAnalysis = ref(false)

    const generateResult = () => {
        selectedCards.value = []

        while(selectedCards.value.length < 3){
            const randomIndex = Math.floor(Math.random() * tarotDeck.length)
            const newCard = {
                ...tarotDeck[randomIndex],
                isUpside: Math.random() > 0.5,
                rotation: Math.random() * 9 - 5
            }

            if(!selectedCards.value.some(c => c.name === newCard.name)) {
            selectedCards.value.push(newCard)
            }
        }
    }
    
    const exitTarot = () => {
        isShow.value = false 
    }

    defineExpose({generateResult,isShow})

</script>


<style scoped>
.three-cards {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 2rem 0;
}

.single-card {
  width: 25%;
  min-height: 300px;
  border: 3px solid #0ff;
  padding: 1rem;
  margin: 0 1%;
  background: rgba(24, 24, 24, 0.9);
  box-shadow: 0 0 30px rgba(0, 255, 157, 0.3);
  transition: transform 0.3s ease;
}

.card-position {
  color: #888;
  font-style: italic;
  margin-top: 1rem;
}

.tarot-card {
    border: 4px solid #0ff;
    padding: 2rem;
    margin: 7rem auto;
    max-width: 55%;
    background-color: black;
    box-shadow: 0 0 70px rgba(0, 255, 157, 0.3);
}

.tarotCard-title {
    color: white;
    text-shadow: 0 0 20px #0ff;
}

.tarotCard-text-1 {
    color: rgb(197, 0, 0);
    text-shadow: 0 0 20px rgb(197, 0, 0);
}

.tarotCard-text {
    color: white;
}

.tarot-button {
    color: black;
}

</style>
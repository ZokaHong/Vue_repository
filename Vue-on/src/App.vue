<script setup >
import { ref } from 'vue'
const count = ref(0)


const msg = ref('')
const handleBlur = () => {
  showMsg.value = true
};
const showMsg = ref(false);

const fontSize = ref(16)

const changeFontSize = () => {
  fontSize.value = 100
}

const text = ref('aaa')
const changeFontSize2 = () => {
  text.value = 'bbb'
}

const bgWidth = ref(100)
const keydownA = ()=>{
  console.log('按下a')
  bgWidth.value = 10
}
const keydownS = ()=>{
  console.log('按下s')
  bgWidth.value = 100
}


</script>


<template>
  <div id="app">
    <p>Count: {{ count }}</p>
    <button v-on:click="count++">點擊</button>
    <br />
    
    
    <p :style="{ fontSize: fontSize + 'px' }" @click="changeFontSize">測試字體大小</p>
    
    <p :id="text" @click="changeFontSize2">測試字體大小2</p>
    
    
    <input type="text" placeholder="123" v-model="msg" @blur="handleBlur">
    <p v-if="showMsg">{{ msg }}</p>
    
    <img src="./assets/wallhaven-8omyej.png" alt="" :style="{width: bgWidth + 'rem'}">
    <textarea  @keydown.a="keydownA" @keydown.s="keydownS"></textarea>
    
  </div>
</template>

<style>
#aaa{
  font-size: 10px;
}
#bbb{
  font-size: 30px;
}
</style>

<script setup>
import { ref, reactive, computed } from 'vue'

const msg = ref('Hello World') // 原始資料

const isReaverse = ref(false)
const displayMsg = computed(() => {
  // if(isReaverse.value){
  //   return msg.value.split('').reverse().join('') 
  // }else{
  //   return msg.value
  // }
  return isReaverse.value ? msg.value.split('').reverse().join('') : msg.value
}) // 顯示資料

const reverseHandler = () => {
  isReaverse.value = !isReaverse.value

}

const appendHandler = () => {
  msg.value += '!'
}

const clickHandler = () => {
  alert('click A tag')
}



</script>

<template>
  <h1>{{ displayMsg }}</h1>
  <button @click="reverseHandler">Reverse</button>
  <button @click="appendHandler">Append!</button>
  <a href="https://medibangpaint.com/zh_TW/" target="_blank" @click.prevent="clickHandler">A link with
    preventDefault()</a>
</template>

<style></style>

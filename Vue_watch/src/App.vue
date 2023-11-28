<script setup>
import { ref, reactive, watch, watchEffect} from 'vue';

const text = ref('')
watch(text, (newData, oldData)=>{
  console.log(newData,oldData)
})

const object = reactive({
  levels:{
    text:''
  },
  label:''
})
watch([()=> object.levels.text, ()=> object.label],(newData, oldData)=>{
  console.log(newData,oldData)
})

watchEffect(()=>{
  console.log(object.levels.text)
})
const stop = watchEffect(()=>{
  console.log(object.label)
  if(object.label === 'stop') stop()
})


const dynamicStyle = reactive({
  color:'red',
  fontSize:'16px'
})
watch(text,(newData)=>{
if(newData.length%3===0){
  dynamicStyle.color='blue'
  dynamicStyle.fontSize='30px'
}else{
  dynamicStyle.color='red'
  dynamicStyle.fontSize='16px'
}
})


</script>

<template>
<h1>watch</h1>
<input type="text" v-model="text" :style="dynamicStyle" placeholder="text">
<input type="text" v-model="object.levels.text" placeholder="object.levels.text">
<input type="text" v-model="object.label" placeholder="object.label">
<br>
<h1>watchEffect</h1>


</template>

<style>

</style>

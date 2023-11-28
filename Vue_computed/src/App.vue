<script setup>
import { ref, computed } from 'vue';
const num = ref(0.9565)
const numFormat = computed(()=>{
  console.log('change')
  if(Number.isNaN(num.value*100)) return num
  return `${num.value*100}%`
})

const firstName = ref("John")
const lastName = ref("Doe")
const fullName = computed({
  get(){
    return `${firstName.value} ${lastName.value}`
  },
  set(newName){
    const [newFirstName, newLastName] = newName.split(' ')
    firstName.value = newFirstName
    lastName.value = newLastName
  }

})
</script>

<template>
<h1>Computed 計算屬性</h1>
<h3>computed</h3>
<input type="number" v-model="num">
<h3>{{ numFormat }}</h3>

<h3>人名</h3>
<input type="text" v-model="fullName">
<p>{{ firstName }}</p>
<p>{{ lastName }}</p>

</template>

<style>

</style>

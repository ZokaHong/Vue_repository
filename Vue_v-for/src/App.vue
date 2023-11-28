<script setup>
import { ref } from 'vue';
const test = ref('test')
const dataList = {
  key1: "a",
  key2: "b",
  key3: "c",
  key4: "d",
  key5: "123",
}
setTimeout(()=>{
  test.value = "apple!"
}, 2000)

</script>

<template>
  <p class="test-s" :key="test">{{ test }}</p>

<!-- 
  <p v-for="(data, key, index) in dataList">
    <span v-show="key !== 'key1'">
      {{ index }}- {{ key }}: {{ data }}
    </span>
  </p> -->
</template>

<style>
.test-s{
  font-size: 40px;
  animation: openIn 1s ease-in-out;
}

@keyframes openIn{
  0%{
    opacity: 0;
    transform: translateY(50px);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

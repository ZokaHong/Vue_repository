<script setup>
import { ref, computed } from 'vue'
const list = ref([1, 2, 3])

const show = ref(true)
const showhideHandler = () => {
  show.value = !show.value
}

const pushHandler = () => {
  list.value.push(list.value.length + 1)
}
const popHandler = () => {
  list.value.pop()
}

const isReverse = ref(false)

const reversedList = computed(() => {
  return isReverse.value ? list.value.slice().reverse() : list.value
});

const reverseHandler = () => {
  isReverse.value = !isReverse.value
}



</script>

<template>
  <p>
    <button @click="showhideHandler">show/hide</button>
    <button @click="pushHandler">push</button>
    <button @click="popHandler">pop</button>
    <button @click="reverseHandler">reverse</button>
  </p>
  <ul v-if="show && list.length > 0">
    <li v-for="value of reversedList">
      {{ value }}
    </li>

  </ul>
  <p v-else>hidden</p>
</template>
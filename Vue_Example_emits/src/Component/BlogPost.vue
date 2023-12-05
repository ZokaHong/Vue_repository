<script setup>
defineProps(['title'])
defineEmits(['enlarge-text', 'reduce-text'])
</script>

<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Enlarge text</button>
    <button @click="$emit('reduce-text')">Reduce text</button>
  </div>
</template>
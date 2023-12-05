<script setup>
defineProps(['title', 'description' , 'www'])
</script>

<template>
  <h4>{{ title }}</h4>
  <p>內容:{{ description }}</p>
  <p>{{ www }}</p>
</template>
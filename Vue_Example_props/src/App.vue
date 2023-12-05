<script setup>
import { ref } from 'vue'
import BlogPost from './Component/BlogPost.vue'

const posts = ref([
	{ id: 1, title: 'My journey with Vue', description: 'chapter1' },
	{ id: 2, title: 'Blogging with Vue' },
	{ id: 3, title: 'Why Vue is so fun' }
])
</script>

<template>
	<BlogPost v-for="post in posts" :key="post.id" :title="post.title" :description="post.description"></BlogPost>
	<!-- :key="post.id" 是作為 v-for 辨識的標準 作用域是在當前 v-for 循環內 -->
	<BlogPost www="123456"></BlogPost>
	<!-- 靜態資料可以使用attribute來給值 動態資料則需要用v-bind -->
</template>

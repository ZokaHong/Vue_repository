
<!-- 瀏覽器遇到組件 => setup(Composition API)、beforeCreate => Options API => created => 有沒有預編譯template(如果沒有就動態編譯) => beforeMount => 初始化瀏覽器、創建插入DOM節點 => mounted => 資料變動 進行更新重新渲染 => 如果組件用不到了 => beforeUnmount => unmounted -->
        


<script setup>
//沒有template 可以使用h function 用程式碼渲染出html結構
// import {h} from 'vue'
// h(`<div>hello</div>`)
import componentA from './components/ComponentA.vue'

import{
    ref,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated
} from'vue'



const count = ref(0)
const showComponentA = ref(true)

onBeforeMount(()=>{
    console.log('app:beforeMount')
})
onMounted(()=>{
    console.log('app:Mounted')
})
onBeforeUpdate(()=>{
    console.log('app:BeforeUpdate')
})
onUpdated(()=>{
    console.log('app:Updated')
})


</script>

<template>

<!-- <button @click="count++">add num</button>
{{ count }} -->
<button @click="showComponentA = !showComponentA">x</button>
<br />
<componentA v-if="showComponentA"/>

</template>


<style>

</style>

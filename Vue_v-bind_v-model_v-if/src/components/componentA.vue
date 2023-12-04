<script setup>
import { ref } from 'vue';

const data = "Hello Vue"
const text = ref("")
const view = ref(0)

const changeView = (index)=>{
    view.value = index
}


</script>

<template>
    <button @click="changeView(1)">顯示單向綁定</button>
    <button @click="changeView(2)">顯示雙向綁定</button>
    <button @click="changeView(10000)">沒畫面</button>


    <div class="container-1" v-if="view === 1">
        <p>資料單向綁定</p>
        {{ data }}
    </div>

    <div class="container-2"  v-else-if="view === 2">
        <p>資料雙向綁定</p>
        <input type="text" placeholder="請輸入..." v-model="text">
        <p>{{ text }}</p>
    </div>
    
    <div v-else>沒畫面</div>
</template>
    
<style>
.container-1 {
    border: 2px red solid;
}

.container-2 {
    border: 2px blue solid;
}
</style>
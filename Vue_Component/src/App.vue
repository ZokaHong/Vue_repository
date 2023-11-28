<script setup>
import { ref, reactive} from 'vue';
import Child from './components/Child.vue'

const msg = ref('')

const updateHandler = (newValue)=>{
    console.log(newValue)
}

</script>

<template>

<input type="text" v-model="msg">
<br/>
<Child :data="msg" @update="updateHandler"/>


</template>

<style>

</style>

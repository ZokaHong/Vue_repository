<script setup>
import { computed, watch } from 'vue';

const emit = defineEmits(['update'])

// defineProps(['data'])
const props = defineProps({
    data: {
        type:String,
        default:'',
    }
})

const count = computed(()=>{
    return props.data.length
})

watch( count,(newValue)=>{
    emit('update', `from child: ${newValue}`)
})

</script>

<template>

<div>
    字數: {{count}}
    <!-- data: {{ data }} -->
</div>


</template>

<style>

</style>

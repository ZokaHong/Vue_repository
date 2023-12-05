<script setup>
import AlertBox from './Component/AlertBox.vue'
import AlertBoxSlot from './Component/AlertBoxSlot.vue'
</script>

<template>
	<AlertBox message="<b>Something bad happened.</b>">
	</AlertBox>

	<AlertBoxSlot> <b>Something bad happened.</b></AlertBoxSlot>
</template>
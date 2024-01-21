<script setup>

</script>

<template>
    <aside>
        <div class="asideImg">
            <img src="../assets/10.png" alt="">
        </div>
    </aside>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
aside{
    position: fixed;
    top: 50%;
    left: 0;
}
.asideImg{
    width: 20vh;
    height: 20vh;
    overflow: hidden;
}
.asideImg img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left center;
    transition: 1.5s;
}
.asideImg img:hover{
    object-position: right center;
    scale: 1.1;
}
</style>
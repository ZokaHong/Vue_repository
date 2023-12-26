<script setup>

</script>

<template>
  <div class="shell">
    <div class="images img1">
      <img src="../assets/1.png">
    </div>
    <div class="images img2">
      <img src="../assets/2.png">
    </div>
    <div class="images img3">
      <img src="../assets/3.png">
    </div>
    <div class="images img4">
      <img src="../assets/4.png">
    </div>
    <div class="images img5">
      <img src="../assets/5.png">
    </div>
    <div class="images img6">
      <img src="../assets/6.png">
    </div>
    <div class="images img7">
      <img src="../assets/7.png">
    </div>
    <div class="images img8">
      <img src="../assets/8.png">
    </div>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 5px;
  height: 0px;
}

::-webkit-scrollbar-track-piece {
  background: rgba(248, 251, 253, 0.5);
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(114, 188, 248, 0.9);
  border: 1px solid #000;
}



.images img {
  border: #fff solid 5px;
  max-width: 20vh;
  max-height: 20vh;
  transition: .5s;
}

/* hover 圖片放大 陰影 */
.images:hover img {
  box-shadow: 0 0 25px #f0a777;
  transform: scale(1.05);
}

.shell {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vh;
  transform: rotate(-90deg) translate3d(0, -100vh, 0);
  transform-origin: right top;
  overflow-x: hidden;
  height: 100vh;
  perspective: 3px;
}

.images {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 25vh;
  transform-origin: 50% 50%;
  transform: rotateZ(90deg) scale(1) translate3d(0, 0, 0);
  transition: 1s;
  transform-style: preserve-3d;
}
.img1{
  transform: rotateZ(88deg) scale(1.5) translate3d(8vh, -6vh, 0.05vh);
}
.img2{
  transform: rotateZ(85deg) scale(1.15) translate3d(1vh, -1vh, -0.05vh);
}
.img3{
  transform: rotateZ(90deg) scale(1.5) translate3d(0, 2vh, 0.05vh);
}
.img4{
  transform: rotateZ(89deg) scale(1.4) translate3d(2vh, 0vh, 0.05vh);
}
.img5{
  transform: rotateZ(90deg) scale(1.1) translate3d(-2vh, 12vh, 0.05vh);
}
.img6{
  transform: rotateZ(89deg) scale(1.1) translate3d(-4vh, 0vh, 0.13vh);
}
.img7{
  transform: rotateZ(87deg) scale(1.1) translate3d(-7vh, 10vh, 0.05vh);
}
.img8{
  transform: rotateZ(92deg) scale(1.3) translate3d(-8vh, 3vh, 0.05vh);
}

</style>
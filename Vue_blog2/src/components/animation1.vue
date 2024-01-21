<script setup>
import { reactive, ref } from 'vue'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// import Swiper core and required modules
import { EffectCube, EffectFlip, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';


const photos = [
  "0363.png",
  "0135.png",
  "0172.png",
  "0872.png",
  "0961.png"
]

const activeTab = ref('全部');

const onActive = (tab) => {
  activeTab.value = tab;
}

</script>

<template>
  <header id="header" class="header">
    <div class="header-content left">
      <div class="header-logo">
        <a href="/">
          <img src="../assets/vue.svg" alt="">
          <span>Logo</span>
        </a>
      </div>
    </div>
    <div class="header-content right">
      <a class="header-button" href="">
        <span>登入</span>
      </a>
      <span>
        <a id="headerMenuButton">
          <font-awesome-icon :icon="['fas', 'bars']" size="2xl" style="color: #fff;" />
        </a>
      </span>
    </div>
  </header>


  <div class="container my-4">
    <div class="row g-2 mb-4 border border-4 border-success rounded-2">
      <div class="col-12 col-md-7">
        <div class="p-3 border bg-light top-banner">
          <!-- <swiper>
         <SwiperSlide>
         </SwiperSlide>
         </swiper> 
          :modules="[模組]", effect="轉場特效", :loop="true"輪播循環-->
          <swiper :modules="[EffectFlip, Autoplay]" effect="flip" :loop="true"
            :autoplay="{ autoplay: true, delay: 3000, pauseOnMouseEnter: true }" grab-cursor>
            <!-- pauseOnMouseEnter滑鼠移入暫停撥放 -->
            <SwiperSlide v-for="photo in photos" :key="photo">
              <img :src="`src/assets/${photo}`" alt="">
            </SwiperSlide>
          </swiper>
        </div>
      </div>
      <div class="col-12 col-md-5">
        <div class="p-3 border bg-light top-news">
          <div class="schedule">
            <div class="schedule-header">
              <span class="schedule-header-title">schedule</span>
              <div class="schedule-header-search">
                <input class="schedule-header-input" type="text" placeholder="Search">
                <a class="schedule-header-button" href="">
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="xl" />
                </a>
              </div>
            </div>
            <div class="schedule-content">
              <ul class="schedule-tab">
                <li class="schedule-tab-item" :class="{ 'active': activeTab === '全部' }" @click="onActive('全部')">全部</li>
                <li class="schedule-tab-item" :class="{ 'active': activeTab === '活動公告' }" @click="onActive('活動公告')">活動公告
                </li>
                <li class="schedule-tab-item" :class="{ 'active': activeTab === '系統公告' }" @click="onActive('系統公告')">系統公告
                </li>
                <li class="schedule-tab-item" :class="{ 'active': activeTab === '其他公告' }" @click="onActive('其他公告')">其他公告
                </li>
              </ul>
              <div class="schedule-list">
                <div class="schedule-list-item">
                  <a class="schedule-list-link" href="">
                    <div class="schedule-list-icon">
                      <img src="../assets/vue.svg" alt="">
                    </div>
                    <div class="schedule-list-detail">
                      <div class="schedule-list-type">音樂</div>
                      <div class="schedule-list-date">01.19[fri]</div>
                      <div class="schedule-list-title">音樂發售中</div>
                    </div>
                  </a>
                </div>
                <div class="schedule-list-item">
                  <a class="schedule-list-link" href="">
                    <div class="schedule-list-icon">
                      <img src="../assets/vue.svg" alt="">
                    </div>
                    <div class="schedule-list-detail">
                      <div class="schedule-list-type">音樂</div>
                      <div class="schedule-list-date">01.19[fri]</div>
                      <div class="schedule-list-title">音樂發售中</div>
                    </div>
                  </a>
                </div>
                <div class="schedule-list-item">
                  <a class="schedule-list-link" href="">
                    <div class="schedule-list-icon">
                      <img src="../assets/vue.svg" alt="">
                    </div>
                    <div class="schedule-list-detail">
                      <div class="schedule-list-type">音樂</div>
                      <div class="schedule-list-date">01.19[fri]</div>
                      <div class="schedule-list-title">音樂發售中</div>
                    </div>
                  </a>
                </div>
                <div class="schedule-list-item">
                  <a class="schedule-list-link" href="">
                    <div class="schedule-list-icon">
                      <img src="../assets/vue.svg" alt="">
                    </div>
                    <div class="schedule-list-detail">
                      <div class="schedule-list-type">音樂</div>
                      <div class="schedule-list-date">01.19[fri]</div>
                      <div class="schedule-list-title">音樂發售中</div>
                    </div>
                  </a>
                </div>
                <div class="schedule-list-item">
                  <a class="schedule-list-link" href="">
                    <div class="schedule-list-icon">
                      <img src="../assets/vue.svg" alt="">
                    </div>
                    <div class="schedule-list-detail">
                      <div class="schedule-list-type">音樂</div>
                      <div class="schedule-list-date">01.19[fri]</div>
                      <div class="schedule-list-title">音樂發售中</div>
                    </div>
                  </a>
                </div>

              </div>


            </div>
          </div>

        </div>
      </div>
    </div>


    <div class="row">
      <div class="col"></div>
      <div class="col"></div>
    </div>
  </div>


  <article>
    <button class="button">spheal</button>
    <p>
      Spheal is much faster rolling than walking to get around. When groups of this Pokémon eat, they all clap at once to
      show their pleasure. Because of this, their mealtimes are noisy.
    </p>
  </article>
</template>

<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}



.header {
  height: 10vh;
  display: flex;
  background-color: rgba(45, 45, 45, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.6);
  position: sticky;
  top: 0;
  z-index: 99;
}

.header-content {
  height: 100%;
  display: flex;
  align-items: center;
}

.left {
  margin-left: 0;
  margin-right: auto;
}

.header-logo {
  margin: auto;
}

.header-logo img,
.header-logo span {
  width: 3rem;
  height: auto;
  vertical-align: middle;
}


.right {
  margin-left: auto;
  margin-right: 0;
}

.header-button {
  text-decoration: none;
  display: inline-block;
  height: 2.8rem;
  width: 5.6rem;
  position: relative;
  z-index: 0;
  font: 700 18px '';
  color: #ffffff;
}

.header-button span {
  text-align: center;
  line-height: 2.8rem;
}

.header-button::before {
  content: '';
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(39, 170, 221);
  transform: skew(-20deg);
}

.header-button::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 4px;
  left: 5px;
  z-index: -2;
  background-color: rgb(255, 255, 255);
  transform: skew(-20deg);
  border-right: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
}

#headerMenuButton {
  display: inline-block;
  width: 6rem;
  line-height: 10vh;
  margin: 0 0 0 2rem;
  background-color: #000;
  clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
  color: #ffffff;
}

.top-banner,
.top-news {
  height: 28rem;
}

.schedule {
  height: 100%;
}

.schedule-header {
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 0.6rem;
}

.schedule-header-title {
  display: flex;
  font: 700 1.2rem '';
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 5vh;
}

.schedule-header-title::before {
  content: '';
  width: 5px;
  height: 2rem;
  background-color: #3be219;
  margin: 0 0.6rem 0 0;
}

.schedule-header-search {
  margin: 0 0 0 auto;
}
.schedule-header-button{
  margin: 0 0.5rem 0 1rem;
}

.schedule-tab {
  display: flex;
  background-color: #1a1a1a;
  border-top: 1px solid #333;
  color: #fff;
  list-style: none;
  position: sticky;
  top: 0;
  margin: 0;
}

.schedule-tab .schedule-tab-item {
  user-select: none;
  font: 700 1.1rem '';
  padding: 1.5rem 0.5rem;
  cursor: pointer;
}

.schedule-tab .schedule-tab-item:hover {
  color: #fb6d00;
}

.schedule-tab .active {
  border-bottom: 3px solid #fb6d00;
}

.schedule-list {
  width: 100%;
  height: 18rem;
  overflow-y: scroll;
}

.schedule-list-item {
  border-bottom: #000 solid 1px;
}

.schedule-list-link {
  display: flex;
  padding: 1rem;
}

.schedule-list-item .schedule-list-icon {
  width: 3rem;
  height: 3rem;
}

.schedule-list-item .schedule-list-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.schedule-list-detail {
  display: flex;
  flex-wrap: wrap;
  margin-left: 2rem;
  padding-right: 1.5rem;
  text-align: start;
}

.schedule-list-detail:hover {
  color: #000;
}
.schedule-list-type{
  border: #3be219 solid 1px;
  color: #3be219;
}

.schedule-list-title {
  width: 100%;
  text-decoration: underline;
}



.button {
  --color: rgba(223, 43, 223, 0.8);
  cursor: auto;
  border: var(--color) solid 2px;
  color: #000;
  padding: 3rem;
  font: 500 2rem '';
  border-radius: .5rem;
  position: relative;
  isolation: isolate;
}

.button::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  /* background-color: var(--color); */
  background-image: url(../assets/0363Spheal.png);
  background-position: center;
  background-size: cover;
  transition: 0.5s;
  transform: scale(0);
  transform-origin: left;
}

.button:hover::after {
  transform-origin: right;
  transform: scale(1);
}
</style>

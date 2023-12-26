<script setup>
import { ref, reactive, watch, watchEffect } from 'vue';
import axios from 'axios';
const inputText = ref('');

const dynamicStyle = reactive({
    color: '#000',
    fontSize: '16px'
})
// 監聽 inputText 字數 改變 {{inputText}} 顏色
watch(inputText, (newdata) => {
    if (newdata.length % 2 === 0) {
        dynamicStyle.color = 'blue'
    } else {
        dynamicStyle.color = 'red'

    }
})
// watchEffect(()=>{
//     if (inputText.value.length % 2 === 0) {
//         dynamicStyle.color = 'blue'
//     } else {
//         dynamicStyle.color = 'red'

//     }
// })


const changeBg = (event) => {
    event.currentTarget.style.backgroundColor = '#85a5e1';
}
const restoreBg = (event) => {
    event.currentTarget.style.backgroundColor = '';
}
const getData = () => {
    const axiosResponse = document.querySelector('.axiosResponse')
    axios.get('http://localhost:3000/stus').then(response => {
        // 解構函數 從 result{} 中獲取 data
        const { data } = response;
        console.log(data);
        // 取得最新輸入的 id
        const lastItemId = data.length;
        // [] 中要取得最新資料 lastItemId-1
        axiosResponse.innerHTML = `<table><th style="color:#9935d7;">取得最新資料:</th><td>${response.data[lastItemId - 1].name}</td></table>`;
    }).catch(err => {
        console.log(err);
    })
}

const postData = () => {
    const axiosResponse = document.querySelector('.axiosResponse')
    // post 第二個參數來傳遞 inputText 是 ref() 要用 .value 取值  
    axios.post('http://localhost:3000/stus', { name: inputText.value }).then(response => {
        const { data } = response;
        console.log(data);
        axiosResponse.innerHTML = `<table><th style="color:#3fbdac;">傳遞最新資料:</th><td>${data.name}</td></table>`;
    }).catch(err => {
        console.log(err);
    })
}
const deleteData = () => {
    axios.get('http://localhost:3000/stus').then(response => {
        if (response.data.length > 0) {
            const deletedData = response.data[response.data.length - 1]
            console.log(deletedData);
            const axiosResponse = document.querySelector('.axiosResponse')
            const lastDataId = response.data.length;
            console.log(lastDataId)
            axios.delete(`http://localhost:3000/stus/${lastDataId}`).then(response => {
                //被刪除的資料是物件 [Object Object] 要用 .name 或 .id 來取得對應的值
                axiosResponse.innerHTML = `<table><th style="color:#e44228;">刪除成功 被刪除的資料:</th><td>${deletedData.name}</td></table>`;
            }).catch(err => {
                console.log('刪除失敗');
            })
        } else {
            console.log('沒有數據可刪除');
        }

    }).catch(error => {
        console.error('獲取數據失敗', error);
    });
}


</script>

<template>
    <div class="body">

        <div class="inputText">
            <input type="text" v-model="inputText" style="background-color: aliceblue; color: black;" placeholder="請在此處輸入資料">
            <div class="outputText">
                <h3>您輸入的資料:</h3>
                <span :style="dynamicStyle">{{ inputText }}</span>
            </div>
        </div>

        <div class="nav">
            <ul>
                <li><a href="#" @click.prevent class="Alpha" @mouseover="changeBg" @mouseleave="restoreBg"
                        @click="getData">GET</a></li>
                <li><a href="#" @click.prevent class="Beta" @mouseover="changeBg" @mouseleave="restoreBg"
                        @click="postData">POST</a></li>
                <li><a href="#" @click.prevent class="Gamma" @mouseover="changeBg" @mouseleave="restoreBg"
                        @click="deleteData">DELETE</a></li>
                <li><a href="#" @click.prevent class="Delta" @mouseover="changeBg" @mouseleave="restoreBg">PUT</a></li>
                <li><a href="#" @click.prevent class="Epslion" @mouseover="changeBg" @mouseleave="restoreBg">PATCH</a>
                </li>
            </ul>
        </div>
        <div class="axiosResponse" style="display: flex; justify-content: center; align-items: center; height: 30vh;"></div>
        <div class="slidebox">
            <img src="../assets/9.png" alt="caption">
            <div class="caption">
                <h2>caption</h2>
                <p>something is written here</p>
            </div>
        </div>
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.body {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vh;
    height: 95vh;
    background: url(../assets/bg.png) no-repeat center center fixed;
    background-size: cover;
    border: 2px #fff solid;
    color: #000;
}

.inputText {
    width: 100vh;
    min-height: 20vh;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.inputText input,
h3,
span {
    width: 30vh;
    height: 3vh;
}

.nav {
    position: relative;
    border: none;
    border-radius: 1em;
    display: flex;
    background-color: #fff;
    box-shadow: 20px 20px 40px #000;
    overflow: hidden;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
}

.nav li a {
    display: inline-block;
    position: relative;
    color: #0c89e1;
    text-decoration: none;
    font-weight: 600;
    padding: 8px 16px;
    z-index: 3;

}

.axiosResponse {
    height: 10vh;
}

.slidebox {
    height: 30vh;
    width: 30vh;
    overflow: hidden;
    position: relative;
}

.slidebox img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: 0.5s;
}

.caption h2 {
    text-transform: uppercase;
}

.caption p {
    font-size: 16px;
    text-transform: capitalize;
}

.caption {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: #0e77aa;
    transform: translateX(-100%);
    transition: 0.5s;
}

.slidebox:hover .caption {
    transform: translateX(0);
}

.slidebox:hover img {
    transform: translateX(100%);
}</style>
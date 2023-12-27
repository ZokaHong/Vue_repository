<script setup>
import { ref, reactive, watch, watchEffect } from 'vue';
import axios from 'axios';
const inputName = ref('');
const inputType = ref('')

const dynamicStyle = reactive({
    color: '#000',
    fontSize: '16px'
})
// 監聽 inputName 字數 改變 {{inputName}} 顏色
watch(inputName, (newdata) => {
    if (newdata.length % 2 === 0) {
        dynamicStyle.color = 'blue'
    } else {
        dynamicStyle.color = 'red'

    }
})
// watchEffect(()=>{
//     if (inputName.value.length % 2 === 0) {
//         dynamicStyle.color = 'blue'
//     } else {
//         dynamicStyle.color = 'red'

//     }
// })




const changeBg = (event) => {
    event.currentTarget.style.backgroundColor = 'rgba(248,199,145,0.8)';
}
const restoreBg = (event) => {
    event.currentTarget.style.backgroundColor = '';
}
const getData = () => {
    const axiosResponse = document.querySelector('.axiosResponse')
    axios.get('http://localhost:3000/stus').then(response => {
        // 解構函數 從 response{} 中獲取 data === response.data
        const { data } = response;
        console.log(data);
        // 取得最新輸入的 id
        const lastItemId = data.length;
        // [] 中要取得最新資料 lastItemId-1
        axiosResponse.innerHTML = `<table><tr><th>取得最新資料</th></tr> <tr><th>名稱</th><td>${response.data[lastItemId - 1].name}</td></tr> <tr><th>類別</th><td>${response.data[lastItemId - 1].type}</td></tr></table>`;
    }).catch(err => {
        console.log(err);
    })
}

const postData = () => {
    const axiosResponse = document.querySelector('.axiosResponse');
    // post 第二個參數來傳遞 inputName 是 ref() 要用 .value 取值  
    axios.post('http://localhost:3000/stus', { name: inputName.value, type: inputType.value }).then(response => {
        const { data } = response;
        console.log(data);
        axiosResponse.innerHTML = `<table><tr><th>傳遞最新資料</th></tr> <tr><th>品名</th><td>${data.name}</td></tr> <tr><th>類別</th><td>${data.type}</td></tr></table>`;
    }).catch(err => {
        console.log(err);
    })
}
const deleteData = () => {
    axios.get('http://localhost:3000/stus').then(response => {
        if (response.data.length > 0) {
            const deletedData = response.data[response.data.length - 1]
            console.log(deletedData);
            const axiosResponse = document.querySelector('.axiosResponse');
            const lastDataId = response.data.length;
            axios.delete(`http://localhost:3000/stus/${lastDataId}`).then(response => {
                //被刪除的資料是物件 [Object Object] 要用 .name 或 .id 來取得對應的值
                axiosResponse.innerHTML = `<table><tr><th>被刪除的資料</th></tr> <tr><th>品名</th><td>${deletedData.name}</td></tr> <tr><th>類別</th><td>${deletedData.type}</td></tr></table>`;
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
const putData = () => {
    axios.get('http://localhost:3000/stus').then(response => {
        if (response.data.length > 0) {
            // 修改前最新資料
            const modifiedData = response.data[response.data.length - 1]
            const axiosResponse = document.querySelector('.axiosResponse');
            const lastModifieId = response.data.length;
            axios.put(`http://localhost:3000/stus/${lastModifieId}`, { name: inputName.value, type: inputType.value }).then(response => {
                if (modifiedData.name === inputName.value && modifiedData.type === inputType.value) {
                    console.log("未修改")
                    axiosResponse.innerHTML = `<table><tr><th>未修改</th></tr></table>`
                } else if (modifiedData.name !== inputName.value && modifiedData.type === inputType.value) {
                    console.log("品名修改")
                    axiosResponse.innerHTML = `<table><tr><th>品名修改</th></tr> <tr><th>修改前品名</th><td>${modifiedData.name}</td></tr> <tr><th>修改後品名</th><td>${inputName.value}</td></tr></table>`
                } else if (modifiedData.name === inputName.value && modifiedData.type !== inputType.value) {
                    console.log("類別修改")
                    axiosResponse.innerHTML = `<table><tr><th>類別修改</th></tr> <tr><th>修改前類別</th><td>${modifiedData.type}</td></tr> <tr><th>修改後類別</th><td>${inputType.value}</td></tr></table>`
                } else {
                    console.log("品名類別修改")
                    axiosResponse.innerHTML = `<table><tr><th>品名類別皆修改</th></tr> <tr><th>修改前品名</th><td>${modifiedData.name}</td></tr> <tr><th>修改後品名</th><td>${inputName.value}</td></tr> <tr><th>修改前類別</th><td>${modifiedData.type}</td></tr> <tr><th>修改後類別</th><td>${inputType.value}</td></tr></table>`
                }
            }).catch(err => {
                console.log('修改失敗');
            })


        } else {
            console.log('沒有數據可修改');
        }
    })
}
const patchData1 = () => {
    axios.get('http://localhost:3000/stus').then(response => {
        if (response.data.length > 0) {
            const modifiedData = response.data[response.data.length - 1]
            console.log(modifiedData);
            const axiosResponse = document.querySelector('.axiosResponse');
            const lastModifieId = response.data.length;

            axios.patch(`http://localhost:3000/stus/${lastModifieId}`, { name: inputName.value }).then(response => {
                axiosResponse.innerHTML = `<table><tr><th">修改成功</th></tr> <tr><th>被修改:</th><td>${modifiedData.name}</td></tr> <tr><th>修改成:</th><td>${inputName.value}</td></tr></table>`
            }).catch(err => {
                console.log('修改失敗');
            })

        } else {
            console.log('沒有數據可修改');
        }
    })
}
const patchData2 = () => {
    axios.get('http://localhost:3000/stus').then(response => {
        if (response.data.length > 0) {
            const modifiedData = response.data[response.data.length - 1]
            console.log(modifiedData);
            const axiosResponse = document.querySelector('.axiosResponse');
            const lastModifieId = response.data.length;

            axios.patch(`http://localhost:3000/stus/${lastModifieId}`, { type: inputType.value }).then(response => {
                axiosResponse.innerHTML = `<table><tr><th">修改成功</th></tr> <tr><th>被修改:</th><td>${modifiedData.type}</td></tr> <tr><th>修改成:</th><td>${inputType.value}</td></tr></table>`
            }).catch(err => {
                console.log('修改失敗');
            })

        } else {
            console.log('沒有數據可修改');
        }
    })
}







</script>

<template>
    <div class="body">

        <div class="inputText">
            <div class="nameBox">
                <input type="text" v-model="inputName" style="background-color: aliceblue; color: black;"
                    placeholder="請輸入品名">
                <div>
                    <h3>品名</h3>
                    <span :style="dynamicStyle">{{ inputName }}</span>
                </div>

            </div>
            <div class="typeBox">
                <input type="text" v-model="inputType" style="background-color: aliceblue; color: black;"
                    placeholder="請輸入類別">
                <div>
                    <h3>類別</h3>
                    <span :style="dynamicStyle">{{ inputType }}</span>
                </div>
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
                <li><a href="#" @click.prevent class="Delta" @mouseover="changeBg" @mouseleave="restoreBg"
                        @click="putData">PUT</a></li>
                <li><a href="#" @click.prevent class="Epslion" @mouseover="changeBg" @mouseleave="restoreBg"
                        @click="patchData1">PATCH name</a>
                </li>
                <li><a href="#" @click.prevent class="Zeta" @mouseover="changeBg" @mouseleave="restoreBg"
                        @click="patchData2">PATCH Type</a>
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
    justify-content: space-evenly;
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
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}

.inputText .nameBox,
.inputText .typeBox {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.inputText .nameBox input,
.inputText .typeBox input {
    height: 3vh;
}

.inputText .nameBox input,
.inputText .typeBox input {
    width: 25%
}

.inputText .nameBox div,
.inputText .typeBox div {
    width: 25%;
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
}
</style>
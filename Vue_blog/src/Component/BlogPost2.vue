<script setup>
import { ref, reactive, watch, watchEffect } from 'vue';
import axios from 'axios';
const inputName = ref('');
const inputType = ref('');
const inputNum = ref('');

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

const defaultTableArea = ref(false);
const viewTableArea = () => {
    defaultTableArea.value = true;
}

// GET POST DELETE PUT Patch
const httpType = ref('');
const changeOldData = ref('');
const changeNewData = ref('');
const dataList = ref([]);
const oldDataList = ref([]);
const newDataList = ref([]);
const getData = () => {
    axios.get('http://localhost:3000/stus').then(response => {
        // 解構函數 從 response{} 中獲取 data === response.data
        httpType.value = "檢視資料";
        const { data } = response;
        dataList.value = data;
    }).catch(err => {
        console.log(err);
    })
}

const postData = () => {
    axios.post('http://localhost:3000/stus', { name: inputName.value, type: inputType.value }).then(response => {
        dataList.value = [];
        httpType.value = "新增資料";
        const { data } = response;
        dataList.value.push(data);
    }).catch(err => {
        console.log(err);
    })
}

const deleteData = () => {
    axios.get('http://localhost:3000/stus').then(response => {
        if (response.data.length > 0) {
            const deletedData = response.data[response.data.length - 1]
            console.log(deletedData)
            httpType.value = "刪除資料";
            changeOldData.value = "被刪除資料"
            const lastDataId = response.data.length;

            axios.delete(`http://localhost:3000/stus/${lastDataId}`).then(response => {
                console.log('刪除成功')
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
            // 修改前資料
            const modifiedData = response.data[response.data.length - 1]
            console.log(modifiedData);
            httpType.value = "修改資料";
            changeOldData.value = "修改前資料"
            changeNewData.value = "修改後資料"
            const { data } = response;
            oldDataList.value.push(data);
            axios.put(`http://localhost:3000/stus/${inputNum.value}`, { name: inputName.value, type: inputType.value }).then(response => {
                //修改後資料
                const newData = response.data;
                console.log(newData)
            }).catch(err => {
                console.log('修改失敗');
            })


        } else {
            console.log('沒有數據可修改');
        }
    })
}
const patchDataName = () => {
    axios.get('http://localhost:3000/stus').then(response => {
        if (response.data.length > 0) {
            const modifiedData = response.data[response.data.length - 1]
            console.log(modifiedData);
            const axiosResponse = document.querySelector('.axiosResponse');

            axios.patch(`http://localhost:3000/stus/${inputNum.value}`, { name: inputName.value }).then(response => {

            }).catch(err => {
                console.log('修改失敗');
            })
        } else {
            console.log('沒有數據可修改');
        }
    })
}
const patchDataType = () => {
    axios.get('http://localhost:3000/stus').then(response => {
        if (response.data.length > 0) {
            const modifiedData = response.data[response.data.length - 1]
            console.log(modifiedData);
            const axiosResponse = document.querySelector('.axiosResponse');

            axios.patch(`http://localhost:3000/stus/${inputNum.value}`, { type: inputType.value }).then(response => {

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
            <div class="numBox">
                <input type="number" v-model="inputNum" style="background-color: aliceblue; color: black;"
                    placeholder="請輸入編號">
            </div>

        </div>

        <div class="nav" @click="viewTableArea">
            <ul>
                <li><a href="#" @click.prevent class="httpGet" @mouseover="changeBg" @mouseleave="restoreBg"
                        @click="getData">檢視</a></li>
                <li><a href="#" @click.prevent class="httpPost" @mouseover="changeBg" @mouseleave="restoreBg"
                        @click="postData">新增</a></li>
                <li><a href="#" @click.prevent class="httpDelete" @mouseover="changeBg" @mouseleave="restoreBg"
                        @click="deleteData">刪除</a></li>
                <li><a href="#" @click.prevent class="httpPut" @mouseover="changeBg" @mouseleave="restoreBg"
                        @click="putData">修改</a></li>
                <li><a href="#" @click.prevent class="httpPatchName" @mouseover="changeBg" @mouseleave="restoreBg"
                        @click="patchDataName">修改名稱</a>
                </li>
                <li><a href="#" @click.prevent class="httpPatchType" @mouseover="changeBg" @mouseleave="restoreBg"
                        @click="patchDataType">修改類別</a>
                </li>
            </ul>
        </div>

        <div class="axiosResponse">
            <table class="alphaTable">
                <thead>
                    <h2 :class="httpType">{{ httpType }}</h2>
                    <tr v-show="defaultTableArea">
                        <th></th>
                        <th>品名</th>
                        <th>類別</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, index) in dataList" :key="index">
                        <th class="tableIndex">{{ data.id }}</th>
                        <td>{{ data.name }}</td>
                        <td>{{ data.type }}</td>
                    </tr>
                </tbody>
            </table>

        </div>

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
    color: #0c68e1e2;
    text-decoration: none;
    font-weight: 600;
    padding: 8px 16px;
    z-index: 3;

}

.axiosResponse {
    margin: 3vh 0;
    max-height: 25vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: 30vh;
}

.axiosResponse table {
    width: 70vh;
}

table {
    width: 50vh;
    border-collapse: collapse;
    /* border: 1px solid #312d23; */
    text-align: left;
}


table thead tr {
    background-color: #1ca88cd8;
    color: #210538;
}


table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

table .tableIndex {
    text-align: center;
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
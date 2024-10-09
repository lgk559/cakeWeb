<template>
    <div>
        <div class="page-inner">
            <h3 class="text-center mt-5 mb-3">門市據點</h3>
            <div class="input-group mb-3">
                <button class="col-md  btn " type="button" id="button-addon1"
                    @click="fillter_storInDistance" :class="{'btn-brown': userSelect.is_useDistance,'btn-outline-brown':!userSelect.is_useDistance}">
                    <i class="fa-solid fa-location-dot"></i>
                    離我最近
                </button>

                <button id="countyBtn" type="button" class="col-md btn btn-outline-brown dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    {{ userSelect.county || "選擇縣市" }}
                </button>
                <ul id="countyUl" class="dropdown-menu p-2">
                    <li v-for="(item,i) in address_tw" :key="item.name" 
                        @click="userSelect.county = item.name,userSelect.countyIndex = i" class="py-1"> 
                            {{ item.name }}
                    </li>
                </ul>
                <select id="countyUl" class="dropdown-menu p-2">
                    <option v-for="(item,i) in address_tw" :key="item.name" 
                        @click="userSelect.county = item.name,userSelect.countyIndex = i" class="py-1"> 
                            {{ item.name }}
                    </option>
                </select>

                <button id="zip_nameBtn" type="button" class="col-md btn btn-outline-brown dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    {{ userSelect.zip_name || "選擇區域" }}
                </button>
                <ul id="zip_nameUl" class="dropdown-menu p-2">
                    <template v-if="userSelect.countyIndex !==''">
                        <li  v-for="item in address_tw[userSelect.countyIndex].districts" :key="item" :data-value="item"
                            @click="userSelect.zip_name = item.name" class="py-1">
                                {{ item.name }}
                        </li>
                    </template>
                </ul>

                <input type="text" class="form-control border-brown" aria-label="Text input with segmented dropdown button"
                    placeholder="關鍵字" @change="filter_storInKeyWord" v-model="userSelect.keyWord">

                <button class="btn btn-outline-brown d-block-md d-none" type="button" id="button-addon1">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>

            <ul class="storeList p-3">
                <li class="d-md-flex d-none bg-brown text-white">
                    <div class="col-2 text-center border p-2">店名</div>
                    <div class="col text-center border p-2">地址</div>
                    <div class="col-2 text-center border p-2">電話</div>
                    <div v-if="userSelect.is_useDistance" class="col-2 text-center border p-2">距離</div>
                    <div class="col-2 text-center border p-2">位置</div>
                </li>
                <template v-if="filterStoreList.length > 0">
                    <li class="d-flex flex-wrap bg-white mb-md-0 mb-3" v-for="(item,i) in filterStoreList">
                        <div class="col-md-2 col-12 border p-2" title="店名">{{ item.name }}</div>
                        <div class="col-md col-12 border p-md-2 p-0" title="地址">{{ item.address }}</div>
                        <div class="col-md-2 col-12 border p-md-2 p-0" title="電話">{{ item.tel }}</div>
                        <div v-if="userSelect.is_useDistance" class="col-md-2 col-12 border p-md-2 p-0" title="距離">{{ item.distanceValue }}</div>
                        <div class="col-md-2 col-12 border p-md-2 p-0" title="位置">
                            <a class="nav-link text-brown d-inline" :href="`https://www.google.com.tw/maps/place/${item.address}`" target="_blank">
                                <i class="fa-solid fa-location-dot"></i>
                                Google map
                            </a>
                        </div>
                    </li>
                </template>
                <template v-else>
                    <li>
                        <div class="col-12 border p-2 text-center">
                            查無資料
                        </div>
                    </li>
                </template>
                
            </ul>
        </div>
    </div>
</template>
<script setup>
import { ref,watch } from 'vue'
import emitter from '*/EventBus.js'
import address_tw from '*/assets/js/_areaMapping.js'
import storesData from '*/assets/js/stores.js'

let storeList = storesData.data;
let filterStoreList = ref([])
let userSelect = ref({
    county:'',
    countyIndex:'',
    zip_name: '',
    is_useDistance: false,
    keyWord: ''
});


function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "M") { dist = dist * 1.609344 * 1000}
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}

watch(() => userSelect.value.zip_name, filter_storInZip_name)
filter_storInZip_name();

function filter_storInZip_name(){
    userSelect.value.is_useDistance = false;
    userSelect.value.keyWord = '';
    let newArr = [];
    if(userSelect.value.zip_name ==''){
        newArr = Object.assign([],storeList)
    }
    else{
        storeList.forEach(item => {
            let is_hasKeywords = item.address.search(userSelect.value.zip_name);
            if(is_hasKeywords != -1){newArr.push(item)}
        });
    }
    filterStoreList.value = newArr
}

function filter_storInKeyWord(){
    userSelect.value.is_useDistance = false;
    userSelect.value.county = '';
    userSelect.value.zip_name = '';
    let newArr = [];
    storeList.forEach(item => {
        let is_hasKeywords = item.address.search(userSelect.value.keyWord);
        if(is_hasKeywords != -1){newArr.push(item)}
    });
    filterStoreList.value = newArr
    console.log(newArr)
}

async function fillter_storInDistance(){
    userSelect.value.county = '';
    userSelect.value.zip_name = '';
    userSelect.value.keyWord = '';
    let newArr = [];
    var position = await getPosition();
    let userLatitude = position.coords.latitude;
    let userLongitude = position.coords.longitude;
    userSelect.value.is_useDistance = true;
    storeList.forEach(item => {
        let distanceValue = distance(userLatitude,userLongitude,item.lat,item.lon)
        if(distanceValue < 3){
            item.distanceValue = distanceValue.toFixed(2)
            newArr.push(item)
        }
    })
    newArr.sort(function (a, b) {
        var a = a.distanceValue, b = b.distanceValue;
        // 如果是空值，一律排序在最後
        if (a === null) {return 1;}
        if (b === null) {return -1;}
        return (a === b ? 0 : a > b  ? 1 : -1) * (1); // 由小到大排序
    })
    filterStoreList.value = newArr
}


function getPosition() {
    return new Promise((successCallback, errorCallback) => {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    });
}

const successCallback = (position) => {
    return position
};

const errorCallback = (error) => {
    emitter.emit('message:push', '無法取得定位', 'danger');
};

</script>
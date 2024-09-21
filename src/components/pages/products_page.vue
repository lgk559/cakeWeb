<template>
  <loading v-model:active="isLoading" />
  <div class="container position-relative">
    <div v-if="productdData" class="row justify-content-center pt-lg-5 pt-3">
      <div class="col-md-5 col-md-5 col-8">
        <img :src="productdData.imageUrl" class="img-fluid">
      </div>
      <div class="col-lg-4 col-md-7 col-12 p-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item text-brown px-1"><router-link to="/">Home</router-link></li>
            <li class="breadcrumb-item text-brown px-1"><router-link to="/shopping">產品資訊</router-link></li>
            <li class="breadcrumb-item text-brown px-1 active" aria-current="page">{{productdData.title}}</li>
          </ol>
         
        </nav>
        <h3 class="d-flex align-items-center">{{ productdData.title }} <span
            class="h5 m-0 ms-3 badge text-gold bg-brown py-1 px-2">{{ productdData.category }}</span></h3>
        <p>{{ productdData.content }}</p>
        <p>{{ productdData.description }}</p>
        <hr>
        <div class="d-flex my-2">
          <div class="col-auto text-danger h4 me-3 fw-bold">NT${{ $currency.currencyUSD(productdData.price) }}</div>
          <div class="col-auto text-decoration-line-through text-secondary">NT${{ $currency.currencyUSD(productdData.origin_price) }}</div>
        </div>
        <div class="d-flex flex-wrap justify-content-round mb-4">
          <div class="col-12 p">
            數量
          </div>
          <div scope="" class="col-12 d-flex">
            <button type="button" class="btn btn-outline-brown rounded-0 rounded-start" :disabled="addtoCartQty<=1" @click=addtoCartQty-- >-</button>
            <input type="txt" class="form-control rounded-0 text-center border-brown" v-model="addtoCartQty">
            <button type="button" class="btn btn-outline-brown rounded-0 rounded-end" @click=addtoCartQty++>+</button>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <div class="col-6 px-1">
            <button type="button" class="btn btn-gold btn-sm ml-auto w-100 p-2"
              :disabled="status.productChangeToCart || status.productLoading == productdData.id" @click=addtoCart(productdData.id)>
              <i class="fas fa-spinner fa-spin" v-if="status.productChangeToCart == productdData.id"></i>
              <!-- 加到購物車 -->
              <i class="fa-solid fa-cart-shopping"></i> 加入購物車
            </button>
          </div>
          <div class="col-6 px-1">
            <router-link to="/check/cart" type="button" class="btn btn-danger btn-sm ml-auto w-100 p-2"
              :disabled="status.productChangeToCart || status.productLoading == productdData.id" @click=addtoCart(productdData.id)>
              <i class="fas fa-spinner fa-spin" v-if="status.productChangeToCart == productdData.id"></i>
              <!-- 直接購買 -->
              <i class="fa-solid fa-cart-shopping"></i> 直接購買
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row justify-content-center align-items-center text-center py-5">
      <h1>404</h1>
      <p>頁面不存在，5秒後自動跳轉回首頁</p>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import axios from 'axios'
import emitter from '*/EventBus.js'

const route = useRoute()
const router = useRouter()
const productdData = ref({})

let isLoading = ref(false);
let status = ref({
    productLoading: '',
    productChangeToCart: '',
});
let addtoCartQty = ref(1)

function addtoCart(id) {
  status.value.productChangeToCart = id;
  emitter.emit('cart:change',[id,addtoCartQty.value]);
}

function initPage(){
  isLoading.value = true;
  const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/product/${route.params.id}`;
  axios.get(api).then((response) => {
    if (response.data.success) {
      productdData.value = response.data.product;
      isLoading.value = false;
    }else{
      // console.log('不存在的動態路由')
      isLoading.value = false;
      productdData.value = null;
      setTimeout(function () { router.replace({ path: '/' }) }, 5000);
    }
  })
}

onMounted((e) => {
  initPage();
  emitter.on('cart:success',(value) => {
    if(value){
      status.value.productChangeToCart = '';
    }
  })
})

watch(() => route.path,(newPath, oldPath) => {
   initPage();
});


</script>

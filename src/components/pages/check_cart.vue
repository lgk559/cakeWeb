<template v-if="typeof carts.carts == Array">
    <loading v-model:active="isLoading" />

    <div v-if="cartsLength != 0" class="check_cart">
        <ul>
            <li class="border-0">
                <div class="check_cart-header py-2 border-bottom bg-brown text-gold">
                    訂單名細
                </div>
            </li>
            <li v-for="item in carts.carts" key="item.id" class="d-flex align-items-center flex-wrap p-md-3 p-2">
                <div v-if="status.productChangeToCart != item.id" style="z-index: 1;"
                    class="position-absolute top-0 end-0 d-md-none d-block text-secondary border-0 py-2 px-3"
                    @click="status.productChangeToCart = item.id">
                    管理
                </div>
                <div v-if="status.productChangeToCart == item.id" style="z-index: 1;"
                    class="position-absolute top-0 end-0 d-md-none d-block text-secondary border-0 py-2 px-3"
                    @click="status.productChangeToCart = ''">
                    取消
                </div>
                <div class="col-auto img">
                    <img class="img-fluid" :src="item.product.imageUrl" alt="">
                </div>
                <div class="col d-flex flex-wrap side-right"
                    :class="{ 'active': item.id == status.productChangeToCart }">
                    <div class="col-12 p omit-1 w-100 px-md-5 px-3 py-md-3 py-2">
                        <router-link class="text-brown" :to="`/page/${item.product.id}`">
                            {{ item.product.title }}
                        </router-link>
                    </div>
                    <ul class="info d-flex align-items-center flex-wrap px-md-5 px-md-0 px-2">
                        <li class="col-md-auto col-6">
                            <div class="col d-flex">
                                <button type="button" class="btn btn-brown rounded-0 rounded-start py-1 px-2"
                                    :disabled="item.qty <= 1" @click="addtoCart(item.product.id,item.qty, parseInt(-1))">-</button>
                                <input type="txt" class="form-control rounded-0 addCartNum text-center p-1"
                                    :value="item.qty" @change="addtoCart(item.product.id,item.qty, $event)">
                                <button type="button" class="btn btn-brown rounded-0 rounded-end py-1 px-2"
                                    @click="addtoCart(item.product.id, item.qty,parseInt(1))">+</button>
                            </div>
                        </li>
                        <li class="col-md-auto col-6 ps-md-3 ps-0">
                            單價：{{ $currency.currencyUSD(item.product.price) }}
                        </li>
                        <li class="col-md-auto col-6 ms-md-0 ms-auto ps-md-3 ps-0">
                            小計：{{ $currency.currencyUSD(item.total) }}
                        </li>
                    </ul>
                </div>
                <div class="control" :class="{ 'active': item.id == status.productChangeToCart }">
                    <div class="h-100 me-md-3 me-0 d-flex align-items-center justify-content-center"
                        @click="deleteCart(item.id), status.productChangeToCart = item.product.id">
                        <i v-if="status.productChangeToCart == item.product.id" class="fas fa-spinner fa-spin"></i>
                        <div v-else class="p py-1 px-2">X</div>
                    </div>
                </div>
            </li>
        </ul>

        <div id="coupon" class="d-flex flex-wrap justify-content-center p-2 bg-brown text-gold">
            <div class="col-md-7 col-12 d-flex align-items-center ">
                <span class="col-auto me-3">優惠券</span>
                <div class="openDiscountBtn" @click="openDiscount">{{ coupon.title ||'選擇優惠券或輸入優惠代碼' }}</div>
            </div>

            <div class="col-md-7 col-12 d-flex py-2">
                <div class="col-6 d-flex flex-wrap">
                    <div class="col-md-6 col-12">
                        折扣：- {{ $currency.currencyUSD(carts.total - carts.final_total) }}
                    </div>
                    <div class="col-md-6 col-12">
                        需付金額： {{ $currency.currencyUSD(carts.final_total) }}
                    </div>
                </div>
                <div class="col-md-auto col-6 flex-grow-1">
                    <router-link to="/check/order_check" type="button" class="btn btn-gold btn-sm ml-auto w-100">
                        結帳
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="row justify-content-center align-items-center text-center p-5">
        <h1>空</h1>
        <p>您的購物車內尚無商品哦！</p>
        <router-link to="/shopping" class="btn btn-outline-brown w-auto">去逛逛</router-link>

    </div>



    <!-- Modal -->
    <div ref="modalEle_discount" class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog w-md-auto w-100 mx-sm-auto mx-0" role="document">
            <div class="modal-content border-0">
                <div class="modal-header">
                    <h5 class="m-0 modal-title" id="exampleModalLabel">
                        選擇優惠券或輸入優惠代碼
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="請輸入優惠代碼" aria-label="Recipient's username"
                            aria-describedby="button-addon2">
                        <button class="btn btn-brown" type="button" id="button-addon2">送出</button>
                    </div>

                    <hr>
                    <p class="fw-bold">選擇優惠券</p>
                    <ul class="mb-0 me-auto">
                        <li class="d-flex mb-3">
                            <div class="col-1 d-flex justify-content-center align-item-center">
                                <input type="radio" name="" id="" value="520" v-model="coupon.code" @click="coupon.title = '年終感恩祭'">
                            </div>
                            <div class="col-11 d-flex border">
                                <div
                                    class="col-2 d-flex align-items-center justify-content-center bg-brown text-gold text-center h5 p-1 h-100 me-2">
                                    15% off
                                </div>
                                <div class="col-10 d-flex flex-wrap align-item-center p-2">
                                    <p class="col-12 m-0">年終感恩祭</p>
                                    <div class="col-8 p">
                                        使用期限：<span>10/01~2/28</span>
                                    </div>
                                    <div class="col-4 p">
                                        使用規則
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="d-flex mb-3">
                            <div class="col-1 d-flex justify-content-center align-item-center">
                                <input type="radio" name="" id="" value="999" v-model="coupon.code" @click="coupon.title = '金牌會員'">
                            </div>
                            <div class="col-11 d-flex border">
                                <div
                                    class="col-2 d-flex align-items-center justify-content-center bg-brown text-gold text-center h5 p-1 h-100 me-2">
                                    10% off
                                </div>
                                <div class="col-10 d-flex flex-wrap align-item-center p-2">
                                    <p class="col-12 m-0">金牌會員</p>
                                    <div class="col-8 p">
                                        使用期限：<span>永久</span>
                                    </div>
                                    <div class="col-4 p">
                                        使用規則
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-brown w-100" data-bs-dismiss="modal" @click="useCoupon">確認選取</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import emitter from '*/EventBus';
import axios from 'axios';
import { useRoute } from 'vue-router'
const route = useRoute()
import { Modal } from "bootstrap";
import $ from "jquery";
window.$ = $;
const carts = ref({});
let cartsLength = ref(0);
const modalEle_discount = ref(null);
let thisModalObj_cart = null;

let isLoading = ref(false);
let status = ref({
    productLoading: '',
    productChangeToCart: '',
});

//折扣
let coupon = ref({
    'code' : null,
    'title' : ''
}); 

function getCartData(isUseCoupon = false) {
    // 執行cart.vue元件的函式
    emitter.emit('cart:init',isUseCoupon);
}

function addtoCart(id,qty, addQty) {
    let newQty;
    if(typeof addQty != 'number'){
        newQty = addQty.target.value - qty; // 要增加的差額
    }else{
        newQty = addQty 
    }
      emitter.emit('cart:change',[id,newQty]);
}

function deleteCart(id) {
    emitter.emit('cart:delete',id)
}

function openDiscount() {
    thisModalObj_cart.show();
}

// function closeDiscount(){
//     thisModalObj_cart.hide();
// }

function useCoupon() {
    isLoading.value = true;
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/coupon`;
    axios.post(api, { data: { code: coupon.value.code } }).then((response) => {
        // console.log(response.data)
        if (response.data.success) {
            getCartData(true);
            isLoading.value = false;
        } else {
            isLoading.value = false;
            emitter.emit('message:push', response.data.message, 'warning');
        }
    })
}

onMounted(() => {
    thisModalObj_cart = new Modal(modalEle_discount.value);
    emitter.on('cart:change', (data) => {
        let id = data[0];
        let qty = data[1]
        // changeCart(null, id, qty)
    })

    emitter.on('cart:returndata', (data) => {
        // 接收來自cart.vue的資料
        carts.value = data;
        cartsLength.value = data.carts.length;
    });

    getCartData()
})


</script>
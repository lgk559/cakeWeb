<template>
    <div class="check_order_check d-flex flex-wrap">
        <div class="col-12 px-md-5 px-3">
            <ul class="check_orderCart">
                <li class="border-0">
                    <div class="check_orderCart-header py-2 border-bottom bg-brown text-gold">
                        訂購確認
                    </div>
                </li>
                <li v-for="item in carts.carts" key="item.id" class="d-flex align-items-center flex-wrap p-md-3 p-2">
                    <div class="col-auto img">
                        <img class="img-fluid" :src="item.product.imageUrl" alt="">
                    </div>
                    <div class="col d-flex flex-wrap side-right"
                        :class="{ 'active': item.id == status.productChangeToCart }">
                        <div class="col-12 p omit-1 w-100 px-md-5 px-3 py-md-3 py-2">
                            <router-link class="text-brown" :to="`/page/${item.product.id}`" @click="closeCart">
                                {{ item.product.title }}
                            </router-link>
                        </div>
                        <ul class="info d-flex align-items-center flex-wrap px-md-5 px-md-0 ps-2">
                            <li class="col-md-auto col-5">
                                數量：{{ item.qty }}
                            </li>
                            <li class="col-md-auto col-7 ps-md-3 ps-0">
                                單價：{{ $currency.currencyUSD(item.product.price) }}
                            </li>
                            <li class="col-md-auto col-7 ms-md-0 ms-auto ps-md-3 ps-0">
                                小計：{{ $currency.currencyUSD(item.total) }}
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div class="d-flex flex-wrap justify-content-center p-2 bg-brown text-gold">
                        <div class="col-md-7 col-12 d-flex align-items-center ">
                            <span class="col-auto me-3">優惠券</span>

                        </div>

                        <div class="col-md-7 col-12 d-flex py-2">
                            <div class="col-6 d-flex flex-wrap flex-grow-1">
                                <div class="col-md-6 col-12">
                                    折扣：- {{ $currency.currencyUSD(carts.total - carts.final_total) }}
                                </div>
                                <div class="col-md-6 col-12">
                                    需付金額： {{ $currency.currencyUSD(carts.final_total) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="col-12 px-md-5 px-2">
            <div class="check_orderCart-header py-2 border-bottom bg-brown text-gold">
                填寫資料&付款方式
            </div>
            <p class="fw-bold mt-3 mb-2">聯絡資料</p>
            <VForm ref="form_payOrder" @submit="payOrder">
                <div class="check_order-form d-flex justify-content-center">
                    <div class="col-12 p-3">
                        <div class="form-group mb-3">
                            <label for="useremail">Email</label>
                            <VField type="email" class="form-control mt-1" name="Email" id="useremail"
                                v-model="form.user.email" placeholder="請輸入 Email" rules="required|email" />
                            <ErrorMessage name="Email" class="text-danger" />
                        </div>

                        <div class="form-group mb-3">
                            <label for="username">收件人姓名</label>
                            <VField type="text" class="form-control mt-1" name="姓名" id="username"
                                v-model="form.user.name" placeholder="輸入姓名" rules="required" />
                            <ErrorMessage name="姓名" class="text-danger" />
                        </div>

                        <div class="form-group mb-3">
                            <label for="usertel">收件人電話</label>
                            <VField type="tel" class="form-control mt-1" name="電話" id="usertel" v-model="form.user.tel"
                                placeholder="請輸入電話" :rules="{ regex: /^[0-9]+$/, required: true, min: 10 }" />
                            <ErrorMessage name="電話" class="text-danger" />
                        </div>

                        <div class="form-group">
                            <label for="useraddress">收件人地址</label>
                            <VField type="text" class="form-control mt-1 mb-3" name="地址" id="useraddress"
                                v-model="form.user.address" placeholder="請輸入地址" rules="required" />
                            <ErrorMessage name="地址" class="text-danger" />
                        </div>
                    </div>





                </div>

                <p class="fw-bold mt-3 mb-2">付款方式</p>
                <div class="check_order-pay d-flex justify-content-center p-3">
                    <div class="d-flex flex-wrap flex-grow-1 justify-content-start mb-3">
                        <button class="col-auto btn btn-outline-secondary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">{{ pay || '選擇付款方式' }}
                        </button>
                        <ul class="dropdown-menu p-3">
                            <li class="dropdown-item my-1">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="credit" id="'credit'" value="信用卡"
                                        v-model="pay">
                                    <label class="form-check-label w-100" for="'credit'">信用卡</label>
                                </div>
                            </li>
                            <li class="dropdown-item my-1">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="bank" id="'bank'" value="銀行轉帳"
                                        v-model="pay">
                                    <label class="form-check-label w-100" for="'bank'">銀行轉帳</label>
                                </div>
                            </li>
                            <li class="dropdown-item my-1">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="cashOnDelivery"
                                        id="'cashOnDelivery'" value="貨到付款" v-model="pay">
                                    <label class="form-check-label w-100" for="'cashOnDelivery'">貨到付款</label>
                                </div>
                            </li>
                        </ul>
                        <div v-if="pay == '信用卡'" class="col-md col-12 flex-grow-1">
                            <!-- <button class="col-auto btn btn-outline-secondary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">選擇支付的信用卡
                        </button> -->
                            <ul class="p-md-0 pt-3">
                                <li class="d-flex mb-3" data-bs-toggle="tooltip" data-bs-placement="top"
                                    title="此為範例示意，還未串接金流">
                                    <div class="col-1 d-flex justify-content-center align-items-center">
                                        <input class="form-check-input" type="radio" name="" id="card1" value="520" checked>
                                    </div>
                                    <div class="col-11 d-flex border">
                                        <label class="col-12 d-flex flex-wrap align-item-center p-1" for="card1">
                                            卡號： <span>4311-9511-1111-1111</span>
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div v-if="pay == '銀行轉帳'" class="col-md col-12 flex-grow-1 ms-3">
                            <div class="col-11 d-flex border">
                                <div class="col-12 d-flex flex-wrap align-item-center p-1">
                                    <div class="bankName me-3">台灣銀行</div>
                                    <div class="bankAccout">111000222255888</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p class="fw-bold mt-3 mb-2">配送方式</p>
                <div class="check_order-deliver d-flex justify-content-center p-3">
                    <div class="input-group mb-3">
                        <button class="btn btn-outline-secondary dropdown-toggle rounded" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">{{ deliver || '選擇配送方式' }}</button>
                        <ul class="dropdown-menu p-3">
                            <li>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="home" id="'home'" value="宅配"
                                        v-model="deliver">
                                    <label class="form-check-label w-100" for="'home'">宅配</label>
                                </div>
                            </li>
                        </ul>
                        <div v-if="deliver == '宅配'" class="col-md col-12 flex-grow-1 ms-3" data-bs-toggle="tooltip"
                            data-bs-placement="top" title="此為範例示意，還未串接物流">
                            <div class="col-11 d-flex border">
                                <div class="col-12 d-flex flex-wrap align-item-center p-1">
                                    <div class="bankName me-3">黑貓宅急便</div>
                                    <div class="bankAccout">低溫配送</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p class="fw-bold mt-3 mb-2">備註</p>
                <div class="check_order-deliver d-flex justify-content-center p-3">
                    <div class="col-12 p-1">
                        <!-- <label for="comment">留言</label> -->
                        <textarea name="" id="comment" class="form-control" cols="30" rows="2"
                            v-model="form.message"></textarea>
                    </div>
                </div>

                <div class="d-flex justify-content-around mt-4">
                    <router-link to="/check/order_cart" class="col-5 btn btn-outline-secondary me-md-5 me-0">修改訂單</router-link>
                    <button class="col-5 btn btn-brown text-gold" type="submit">送出訂單</button>
                </div>
            </VForm>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import emitter from '*/EventBus';
import axios from 'axios';
import { Tooltip } from 'bootstrap'
import { useRouter } from 'vue-router'
const router = useRouter()
const carts = ref({});
let cartsLength = ref(0);

const form = ref({
    "user": {
        "name": "",
        "email": "",
        "tel": "",
        "address": ""
    },
    "message": "",
})
let pay = ref('信用卡');
let deliver = ref('宅配');

let isLoading = ref(false);
let status = ref({
    productLoading: '',
    productChangeToCart: '',
});

function getCartData() {
    // 執行cart.vue元件的函式
    emitter.emit('cart:init');
}

function payOrder(values) {
    // 使用 Vee Validate 的 validate 函式來驗證表單
    console.log('payOrder')
    if (values) {
        // console.log(JSON.stringify(values, null, 2));
        const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/order`;
        let temOrder = Object.assign({}, form.value)
        console.log(temOrder)
        axios.post(api, { 'data': form.value }).then((response) => {
            console.log(response.data)
            if (response.data.success) {
                getCartData()
                form.value = {}
                router.replace({ path: '/check/order_finish' })
                // 如果是信用卡付款，會再執行付款的動作，訂單顯示付款。
                // 如果是銀行轉帳、貨到付款則不會執行付款，訂單顯示未付款。
            
            }
        })
    } else {
        console.log('this field is required')
    }

}

onMounted(() => {

    // bootstrap5的Tooltips元件
    new Tooltip(document.body, {
        selector: "[data-bs-toggle='tooltip']",
    })

    emitter.on('cart:returndata', (data) => {
        // 接收來自cart.vue的資料
        carts.value = data;
        cartsLength.value = data.carts.length;
    });
    getCartData()
})


</script>
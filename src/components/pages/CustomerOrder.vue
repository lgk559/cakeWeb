<template>
    <div>
        <!-- 模擬訂單 -->
        <loading v-model:active="isLoading" />
        <div class="row m-4">
            <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
                <div class="card border-1 shadow-sm">
                    <div class="rounded-top" style="height: 150px; background-size: cover; background-position: center"
                        :style="{ 'background-image': `url(${item.imageUrl})` }">
                    </div>
                    <div class="card-body">
                        <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                        <h5 class="card-title">
                            <a href="#" class="text-dark">{{ item.title }}</a>
                        </h5>
                        <p class="card-text">{{ item.content }}</p>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <!-- <div class="h5">2,800 元</div> -->
                            <del class="h6">原價 {{ item.origin_price }} 元</del>
                            <div class="h5">現在只要 {{ item.price }} 元</div>
                        </div>
                    </div>
                    <div class="card-footer d-flex">
                        <button type="button" class="btn btn-outline-secondary btn-sm me-3" @click="getProduct(item.id)"
                            :disabled="status.productChangeToCart || status.productLoading == item.id">
                            <i class="fas fa-spinner fa-spin" v-if="status.productLoading == item.id"></i>
                            查看更多
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
                            :disabled="status.productChangeToCart || status.productLoading == item.id"
                            @click=addtoCart(item.id)>
                            <i class="fas fa-spinner fa-spin" v-if="status.productChangeToCart == item.id"></i>
                            加到購物車
                        </button>
                    </div>
                </div>
            </div>
            <Pagination />
            <!-- 已加購物車清單 -->
            <div class="row">
                <div class="col-12">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">管理</th>
                                <th scope="col">#</th>
                                <th scope="col flex-grow-1">品名</th>
                                <th scope="col">數量</th>
                                <th scope="col">單價</th>
                                <th scope="col">小計</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in carts.carts" :key="item.id" :id="item.id">
                                <th scope="col">
                                    <button type="button" class="btn btn-danger btn-sm me-3" @click="delCartItem(item)">
                                        <i class="fas fa-spinner fa-spin"
                                            v-if="status.productChangeToCart == item.id"></i>
                                        刪除
                                    </button>
                                </th>
                                <th scope="col">{{ index + 1 }}</th>
                                <th scope="col flex-grow-1">{{ item.product.title }}</th>
                                <th scope="col">{{ item.qty }}</th>
                                <th scope="col">{{ item.product.price }}</th>
                                <th scope="col">{{ item.total }}</th>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="4" class="text-right"></td>
                                <td class="text-left">總計</td>
                                <td class="text-left">{{ carts.total }}</td>
                            </tr>
                            <tr v-if="carts.total !== carts.final_total">
                                <td colspan="4" class="text-right"></td>
                                <td class="text-left text-success">折扣價</td>
                                <td class="text-left text-success">{{ carts.final_total }}</td>
                            </tr>
                        </tfoot>
                    </table>

                </div>
            </div>
            <div class="row">
                <div class="col-8 m-auto d-flex mb-3">
                    <span class="input-group-text rounded-0 rounded-start" id="basic-addon3">使用優換券</span>
                    <input type="text" class="form-control rounded-0" id="basic-url" aria-describedby="basic-addon3"
                        v-model="couponCode">
                    <button type="button" class="btn btn-success rounded-0 rounded-end text-nowrap"
                        @click="useCoupon">送出</button>
                </div>
            </div>
            <div class="my-5 row justify-content-center">
                <VForm ref="form_payOrder" class="col-md-6" @submit="payOrder">
                    <div class="form-group">
                        <label for="useremail">Email</label>
                        <VField type="email" class="form-control" name="email" id="useremail" v-model="form.user.email"
                            placeholder="請輸入 Email" rules="required|email" />
                        <ErrorMessage name="email" class="text-danger" />
                    </div>

                    <div class="form-group">
                        <label for="username">收件人姓名</label>
                        <VField type="text" class="form-control" name="姓名" id="username" v-model="form.user.name"
                            placeholder="輸入姓名" rules="required" />
                        <ErrorMessage name="姓名" class="text-danger" />
                    </div>

                    <div class="form-group">
                        <label for="usertel">收件人電話</label>
                        <VField type="tel" class="form-control" name="電話" id="usertel" v-model="form.user.tel"
                            placeholder="請輸入電話" :rules="{ regex: /^[0-9]+$/, required: true, min: 10 }" />
                        <ErrorMessage name="電話" class="text-danger" />
                    </div>

                    <div class="form-group">
                        <label for="useraddress">收件人地址</label>
                        <VField type="text" class="form-control" name="地址" id="useraddress" v-model="form.user.address"
                            placeholder="請輸入地址" rules="required" />
                        <ErrorMessage name="地址" class="text-danger" />
                    </div>

                    <div class="form-group">
                        <label for="comment">留言</label>
                        <textarea name="" id="comment" class="form-control" cols="30" rows="10"
                            v-model="form.message"></textarea>
                    </div>
                    <div class="text-right">
                        <button class="btn btn-danger">送出訂單</button>
                    </div>
                </VForm>
            </div>
        </div>

    </div>

    <!-- Modal -->
    <div ref="modalEle_product" class="modal fade" id="productModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title fs-5" id="exampleModalLabel">
                        <span>{{ product.title }}</span>
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close">
                        <!-- <span aria-hidden="true">&times;</span> -->
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12  mb-3">
                            <img :src="product.imageUrl" class="img-fluid" alt="">
                        </div>
                        <div class="col-12 mb-3 text-break">
                            <p>商品描述：</p>
                            {{ product.description }}
                        </div>
                        <hr>
                        <div class="col-12 mb-3 text-break">
                            <p>商品內容：</p>
                            {{ product.content }}
                        </div>
                        <hr>
                        <div class="col-6 mb-3 text-decoration-line-through text-secondary">
                            <span>原價：</span>
                            <span class="text-decoration-line-through">{{ $currency.currencyUSD(product.origin_price)
                                }}</span>
                        </div>
                        <div class="col-6 mb-3 text-danger">
                            <span>特價：</span>
                            <span class="fs-5">{{ $currency.currencyUSD(product.price) }}</span>
                        </div>
                        <div class="col-12 mb-3">
                            <div class="form-row">
                                <div class="form-group col-12">
                                    <label for="select-num" class="form-label mb-1">購買數量：</label>
                                    <select id="select-num" class="form-select" aria-label="Default select example"
                                        v-model.number="select_num">
                                        <option value=0 selected disabled>請選擇</option>
                                        <option :value=num v-for="num in 10" :key="num">{{ num }} {{ product.unit }}
                                        </option>

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
                            <div class="col-auto d-flex align-items-center text-break">
                                <div class="me-3">
                                    <span>小計：</span>
                                    {{ $currency.currencyUSD(product.price * select_num) }}
                                </div>

                                <button id="productModal_btn" type="button" class="btn btn-primary"
                                    @click="addtoCart(product.id, select_num)">
                                    <i class="fas fa-spinner fa-spin"
                                        v-if="status.productChangeToCart == product.id"></i>
                                    加到購物車
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import emitter from '*/EventBus.js'
import { Modal } from "bootstrap";
import $ from "jquery";

import Pagination from '*/components/pages/shared/Pagination.vue';

window.$ = $;

const router = useRouter()
const products = ref([])
const product = ref({})
const pagination = ref()
const carts = ref([])
const select_num = ref(0)
const couponCode = ref('')
const form = ref({
    "user": {
        "name": "",
        "email": "",
        "tel": "",
        "address": ""
    },
    "message": "",
})

let isLoading = ref(false)
let status = ref({
    productLoading: '',
    productChangeToCart: '',

})
let modalEle_product = ref(null); // 連結到實際的 DOM 元素
let thisModalObj_product = null;
let form_payOrder = ref(null);
let thsForm_payOrder = null


function getProducts() {
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/products`;
    isLoading.value = true;
    axios.get(api).then((response) => {
        // console.log(response.data)
        if (response.data.success) {
            isLoading.value = false;
            products.value = response.data.products
            pagination.value = response.data.pagination
            emitter.emit('pagination:init', pagination.value);
        }
    })
}
function getProduct(id) {
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/product/${id}`;
    status.value.productLoading = id;
    axios.get(api).then((response) => {
        // console.log(response.data)
        if (response.data.success) {
            product.value = response.data.product
            thisModalObj_product.show();
            status.value.productLoading = '';
        }
    })
}
function addtoCart(id, qty = 1) {
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/cart`;
    status.value.productChangeToCart = id;
    console.log(id,qty)
    axios.post(api, { data: { "product_id": id, "qty": qty } }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
            status.value.productChangeToCart = '';
            thisModalObj_product.hide();
            getCart()
        }
    })
}
function getCart() {
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/cart`;
    axios.get(api).then((response) => {
        // console.log(response.data)
        if (response.data.success) {
            carts.value = response.data.data;
        }
    })
}
function useCoupon() {
    isLoading.value = true;
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/coupon`;
    axios.post(api, { data: { code: couponCode.value } }).then((response) => {
        // console.log(response.data)
        if (response.data.success) {
            getCart();
            isLoading.value = false;
            couponCode.value = "";
        } else {
            isLoading.value = false;
            couponCode.value = "";
            emitter.emit('message:push', [response.data.message, 'danger']);
        }
    })
}
function delCartItem(item) {
    product.value = item;
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/cart/${item.id}`;
    status.value.productChangeToCart = item.id;
    axios.delete(api).then((response) => {
        console.log(response.data)
        if (response.data.success) {
            status.value.productChangeToCart = "";
            getCart()
        }
    })
}
function payOrder(values) {
    // 使用 Vee Validate 的 validate 函式來驗證表單

        if (values) {
            // console.log(JSON.stringify(values, null, 2));
            const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/order`;
            // let temOrder = Object.assign({}, form.value)
            // console.log(temOrder)
            axios.post(api,{'data':form.value}).then((response) => {
                console.log(response.data)
                if (response.data.success) {
                    getCart()
                    form.value = {}
                }
            })
        } else {
            console.log('this field is required')
        }

}

onMounted(() => {
    thisModalObj_product = new Modal(modalEle_product.value);
    console.log(form_payOrder.value.validate)
});
onBeforeMount(() => {
    getProducts()
    getCart()
    emitter.on('pagination:chage', (page) => {
        getProducts(page)
    });
})

</script>
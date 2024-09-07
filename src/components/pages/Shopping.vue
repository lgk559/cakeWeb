<template>
    <loading v-model:active="isLoading" />
    <div class="container position-relative">
        <div class="row">
            <div class="col-12 border-start p-1">
                <div class="row mt-md-2 m-0 sticky-top SearchBox">
                    <div class="col-auto">
                        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                            <div class="btn-group" role="group">
                                <button id="btnGroupDrop1" type="button" class="btn btn-outline-primary dropdown-toggle"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    分類 <span v-if="visibility !== 'all'">：{{ visibility }}</span>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                    <li class="dropdown-item" @click="visibility = 'all'">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="'flexRadioDefault'">
                                            <label class="form-check-label" for="'flexRadioDefault'">全部</label>
                                        </div>
                                    </li>
                                    <li v-for="(item, index) in product_category" class="dropdown-item"
                                        @click="visibility = item">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault"
                                                :id="'flexRadioDefault' + index">
                                            <label class="form-check-label" :for="'flexRadioDefault' + index">{{ item
                                                }}</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <button type="button" class="btn btn-primary">
                                價格
                                <i class="fa-solid fa-arrow-down-wide-short"></i>
                                <!-- <i class="fa-solid fa-arrow-down-short-wide"></i> -->
                            </button>
                            <button type="button" class="btn btn-outline-primary">
                                價格
                                <i class="fa-solid fa-arrow-down-short-wide"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-auto m-md-0 m-auto">
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <div class="row align-items-stretch m-md-2 m-0">
                    <template v-if="filter_products.length > 0">
                        <div class="col-lg-3 col-md-3 col-sm-4 col-6 mb-4  p-1" v-for="item in products"
                            :key="item.id">
                            <div class="card border-1 shadow-sm height-100 ">
                                <div class="rounded-top hoverScale" style="height: 150px;">
                                    <a class="d-block hoverScale-img" href=""
                                        style="background-size: cover; background-position: center"
                                        :style="{ 'background-image': `url(${item.imageUrl})` }">
                                    </a>
                                </div>
                                <div class="card-body">
                                    <span class="badge border border-primary text-primary float-right mb-2 ">{{
                                        item.category }}</span>
                                    <p class="card-title omit-1 fs-6 fw-normal">
                                        <a href="" class="text-dark text-decoration-none">{{ item.title }}</a>
                                    </p>
                                    <p class="card-text omit-2">{{ item.content }}</p>
                                    <div class="d-flex">
                                        <div class="col-6 text-decoration-line-through text-secondary">
                                            <span>原價：</span>
                                            <span class="text-decoration-line-through">{{
                                                $currency.currencyUSD(item.origin_price)
                                            }}</span>
                                        </div>
                                        <div class="col-6 text-danger">
                                            <span>特價：</span>
                                            <span class="fs-5">{{ $currency.currencyUSD(item.price) }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer d-flex justify-content-center p-1">
                                    <button type="button" class="btn btn-outline-secondary btn-sm me-3"
                                        :disabled="status.productChangeToCart || status.productLoading == item.id">
                                        <i class="fas fa-spinner fa-spin" v-if="status.productLoading == item.id"></i>
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                        <!-- 查看更多 -->
                                    </button>
                                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
                                        :disabled="status.productChangeToCart || status.productLoading == item.id"
                                        @click=addtoCart(item.id)>
                                        <i class="fas fa-spinner fa-spin"
                                            v-if="status.productChangeToCart == item.id"></i>
                                        <!-- 加到購物車 -->
                                        <i class="fa-solid fa-cart-shopping"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div>
                            沒資料
                        </div>
                    </template>
                    <Pagination />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, watch, computed } from 'vue'
import axios from 'axios'
import emitter from '*/EventBus.js'
import $ from "jquery";
window.$ = $;
import { Modal } from "bootstrap";
import Pagination from '*/components/pages/shared/Pagination.vue';

let isLoading = ref(false)
let status = ref({
    productLoading: '',
    productChangeToCart: '',
})
const products_all = ref([])
const products = ref([])
const product = ref({})
const carts = ref([])



const pagination = ref({})
let page = ref(1)
let inPageNum = ref(8)

let visibility = ref('all')
let filter_products = computed(() => {
    // 篩選已啟用的商品
    return products_all.value.filter((t) => t.is_enabled)
})
function initProducts(){
    // 篩選所有已啟用的商品類別
}
const product_category = computed(() => {
    // 商品類別
    var mySet = new Set();
    filter_products.value.forEach((item) => {
        mySet.add(item.category)
    })
    return mySet
})
function filter_category_products() {
    // 篩選符合的商品類別
    let nowarr = []
    if (visibility.value == 'all') { nowarr = filter_products.value }
    else {
        filter_products.value.forEach((item) => {
            if(item.category == visibility.value){ nowarr.push(item)}
        })
    }
    pagination.value = {
        "total_pages":  Math.ceil(nowarr.length / inPageNum.value),
        "current_page": page.value,
        "has_pre": page.value >= Math.ceil(nowarr.length / inPageNum.value)  ? true:false ,
        "has_next": page.value < Math.ceil(nowarr.length / inPageNum.value)  ? true:false ,
        "category": null
    }
    changePage()
    return nowarr
}

function changePage(page=1){
    
    console.log(page)
    emitter.emit('pagination:init', pagination.value);
    // emitter.emit('pagination:chage', pagination.value);
    products.value = nowarr.slice((page - 1)*inPageNum.value, page*inPageNum.value)
}


function getProductsAll() {
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/products/all`;
    axios.get(api).then((response) => {
        if (response.data.success) {
            isLoading.value = false;
            products_all.value = response.data.products
            filter_category_products()
        }
    })
}
// function getProducts(page = 1) {
    
// }

// watch(visibility, filterData)

// function getProduct(id) {
//     const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/product/${id}`;
//     status.value.productLoading = id;
//     axios.get(api).then((response) => {
//         // console.log(response.data)
//         if (response.data.success) {
//             product.value = response.data.product
//             thisModalObj_product.show();
//             status.value.productLoading = '';
//         }
//     })
// }
function addtoCart(id, qty = 1) {
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/cart`;
    status.value.productChangeToCart = id;
    console.log(id, qty)
    axios.post(api, { data: { "product_id": id, "qty": qty } }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
            status.value.productChangeToCart = '';
            // thisModalObj_product.hide();
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
onBeforeMount(() => {
    // getProducts()
    getProductsAll()
    // filterData()
    getCart()
    emitter.on('pagination:chage', (page) => {
        // page的值是要前往的頁數
        console.log(page)
        changePage(page)
        // page.value = 2
    });
})

</script>
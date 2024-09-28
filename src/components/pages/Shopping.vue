<template>
    <loading v-model:active="isLoading" />
    <div class="container position-relative">
        <div class="row">
            <div class="col-12 border-start p-md-3 p-1">
                <div class="d-flex mt-md-3 m-0 sticky-top SearchBox">
                    <div class="col-auto ps-md-3 ps-1">
                        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                            <div class="btn-group" role="group">
                                <button id="btnGroupDrop1" type="button" class="btn dropdown-toggle" :class="{'btn-brown':isReverse_type !='price','text-white':isReverse_type !='price','btn-outline-brown':isReverse_type =='price'}"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    分類 <span>：{{ categoryItem }}</span>
                                </button>
                                <ul class="dropdown-menu py-2" aria-labelledby="btnGroupDrop1">
                                    <li class="dropdown-item px-3 py-1" @click="filter_product_in_category(item)">
                                        <div class="form-check">
                                            <input class="form-check-input text-brown" type="radio" name="flexRadioDefault" id="'flexRadioDefault'" value="全部" v-model="categoryItem">
                                            <label class="form-check-label" for="'flexRadioDefault'">全部</label>
                                        </div>
                                    </li>
                                    <li v-for="(item, index) in category" class="dropdown-item px-3 py-1"
                                        @click="filter_product_in_category(item)">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault"
                                                :id="'flexRadioDefault' + index"  :value='item' v-model="categoryItem">
                                            <label class="form-check-label" :for="'flexRadioDefault' + index">{{ item }}</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <button type="button" class="btn" @click="changeReverse('price')"  :class="{'btn-brown':isReverse_type =='price','btn-outline-brown':isReverse_type !='price'}">
                                價格
                                <i class="fa-solid fa-arrow-down-wide-short" :class= "{'fa-arrow-down-wide-short' : !isReverse.price, 'fa-arrow-down-short-wide' : isReverse.price}"></i>
                            </button>
                        </div>
                    </div>
                    <div class="search col-auto m-md-0 px-md-2 ps-1">
                        <form class="d-flex">
                            <input class="form-control border-brown" type="search" placeholder="輸入關鍵字" aria-label="Search" v-model="Keywords" @keyup.13="filter_product_in_Keywords">
                            <button class="btn btn-outline-brown d-md-block d-none ms-1" type="submit" @click.prevent="filter_product_in_Keywords">搜尋</button>
                        </form>
                    </div>
                </div>
                <div class="d-flex flex-wrap align-items-stretch my-md-3 mx-0 my-3">
                    <template v-if="product_in_page.length > 0">
                        <div class="col-lg-3 col-md-3 col-sm-4 col-12 px-3 pb-3" v-for="item in product_in_page"
                            :key="item.id">
                            <div class="card border-1 shadow-sm height-100">
                                <div class="rounded-top hoverScale" style="height: 150px;">
                                    <router-link class="d-block hoverScale-img" 
                                        :to="'/page/'+item.id"
                                        style="background-size: cover; background-position: center"
                                        :style="{ 'background-image': `url(${item.imageUrl})` }">

                                    </router-link>
                                </div>
                                <div class="card-body">
                                    <span class="badge border border-brown text-brown float-right mb-2 ">{{
                                        item.category }}</span>
                                    <p class="card-title omit-1 fs-6 fw-normal">
                                        <router-link :to="'/page/'+item.id" class="text-dark text-decoration-none">{{ item.title }}</router-link>
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
                                <div class="card-footer d-flex justify-content-center bg-brown p-1">
                                    <router-link :to="'/page/'+item.id" type="button" class="btn btn-outline-gold btn-sm me-3"
                                        :disabled="status.productChangeToCart || status.productLoading == item.id">
                                            <i class="fas fa-spinner fa-spin" v-if="status.productLoading == item.id"></i>
                                            <i class="fa-solid fa-magnifying-glass"></i>
                                        <!-- 查看更多 -->
                                    </router-link>
                                    <button type="button" class="btn btn-outline-gold btn-sm ml-auto"
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
                            沒有符合的產品
                        </div>
                    </template>
                    <Pagination />
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { ref,reactive, onMounted, onBeforeMount, watch, computed } from 'vue'
import axios from 'axios'
import emitter from '*/EventBus.js'
import $ from "jquery";
window.$ = $;
import { Modal } from "bootstrap";
import Pagination from '*/components/pages/shared/Pagination.vue';


let isLoading = ref(false);
let status = ref({
    productLoading: '',
    productChangeToCart: '',
});
const products_all = ref([]); // 篩選所有已啟用的商品
const product_in_filter = ref([]); // 將products_all進行篩選出符合"categoryItem || Keywords"的商品
const product_in_page = ref({}); // 將product_in_filter進行分頁，只印出此頁的商品
const category = ref({}); // 商品類別(底下沒商品的類別會先過濾)



let inPageNum = ref(8); // 一頁會有幾項商品，目前設定一頁最多8項
let categoryItem = ref('全部'); // 使用者選擇的類別，預設是all
let Keywords = ref(''); //使用者輸入關鍵字
let isReverse_type = ref('');
let isReverse = ref({
    price: false, // false為由大到小；true為由小到大
    date: false 
})

function initProducts(data){
    filter_products_is_enabled(data)
    category.value = filter_category_is_enabled()
    filter_product_in_category(); // 篩選符合類別的商品，例如所有類別為"蛋糕"的商品
    isLoading.value = false;
}

function filter_products_is_enabled(data) {
    data.filter((t) => {
        if(t.is_enabled){products_all.value.push(t)}
    })
}

function filter_category_is_enabled(){
    var mySet = new Set();
    products_all.value.forEach((item) => {
        mySet.add(item.category);
    })
    return mySet;
}

function filter_product_in_category(filterValue = '全部') {
    let nowarr = [];
    categoryItem.value = filterValue;
    if(filterValue =='全部'){
        nowarr = Object.assign([], products_all.value);
    }
    else { 
        products_all.value.forEach((item) => {
            if(item.category == categoryItem.value){ nowarr.push(item)}
        });
        isReverse_type.value = '';
    }
    product_in_filter.value = nowarr;
    changePage(1); // 印出此頁的商品
}

function filter_product_in_Keywords() {
    let nowarr = [];
    isReverse_type.value = '';
    products_all.value.forEach((item) => {
        let is_has = item.title.search(Keywords.value);
        if(is_has != -1){nowarr.push(item)}
    });
    product_in_filter.value = Object.assign([], nowarr);
    changePage(1); // 印出此頁的商品
    Keywords.value = "";
    categoryItem.value = ""
}

function changePage( chang = 1){
    let total_pages = Math.ceil(product_in_filter.value.length / inPageNum.value);
    let pagination = {
        "total_pages":  total_pages,
        "current_page": chang,
        "has_pre": chang !== 1  ? true:false ,
        "has_next": chang !== total_pages ? true:false ,
        "category": null
    }
    emitter.emit('pagination:init', pagination);
    product_in_page.value = product_in_filter.value.slice((chang - 1)*inPageNum.value, chang*inPageNum.value);
}

function changeReverse(type) {
    isReverse_type.value = type
    isReverse.value[type] = !isReverse.value[type]
    if(type == ''){
        // console.log('不用排序')
    }
    else{
        product_in_filter.value.sort(function (a, b) {
            var a = a[type], b = b[type];
            // 如果是空值，一律排序在最後
            if (a === null) {return 1;}
            if (b === null) {return -1;}
            return (a === b ? 0 : a > b  ? 1 : -1) * (isReverse.value.price ? (1) : -1);
        })
        changePage(1);
    }
}
function getProductsAll() {
    isLoading.value = true;
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/products/all`;
    axios.get(api).then((response) => {
        if (response.data.success) {
            let data = response.data.products;
            initProducts(data);
        }
    })
}

function addtoCart(id,qty=1){
    status.value.productChangeToCart = id
    emitter.emit('cart:change',[id,qty])
}


onBeforeMount(() => {
    getProductsAll();
    
    emitter.on('pagination:chage', (page) => {
        // 從pagination元件觸發。
        changePage(page); // page的值是要前往的頁數，它的值會是數字，例如1
    });

    emitter.on('cart:success', (value) => {
        if(value){
            status.value.productChangeToCart = '';
        }
    })
})

</script>
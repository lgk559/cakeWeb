<template>
    <loading v-model:active="isLoading" />
    <div class="container-fluid page-inner">
        <div class="row">
            <div class="col-12">
                <swiper :modules="modules" :slides-per-view="1" :space-between="50" :loop="true" navigation
                    :pagination="{ clickable: true }" :scrollbar="{ draggable: true }">
                    <swiper-slide>
                        <img src="/assets/images/banner1.jpg" alt="">
                    </swiper-slide>
                    <swiper-slide>
                        <router-link to="/store">
                            <img src="/assets/images/banner2.jpg" alt="">
                        </router-link>
                    </swiper-slide>
                </swiper>
            </div>
        </div>




        <div class="row flex-wrap justify-content-md-around justify-content-start mt-5">
            <router-link to="/brand" class="col-md-4 col-6">
                <img src="/assets/images/index_aboutBtn.jpg" class="img-thumbnail" alt="...">
            </router-link>
            <router-link to="/store" class="col-md-4 col-6">
                <img src="/assets/images/index_storpBtn.jpg" class="img-thumbnail" alt="...">
            </router-link>
            <router-link to="/large_quantity" class="col-md-4 col-6 mt-md-0 mt-3">
                <img src="/assets/images/index_activeBtn.jpg" class="img-thumbnail" alt="...">
            </router-link>
        </div>


        <div id="Customers" class="row my-3">
            <div class="col-12">
                <h2 class="section-title text-center mt-5">客戶評價</h2>
                <div class="decorate"></div>
            </div>
            <swiper class="Customers-swiper swiper" :modules="modules" navigation 
            :autoplay="{
                delay: 2500,
                disableOnInteraction: false
            }" 
            :loop="true">
                <swiper-slide class="item">
                    <div class="item-img col-4">
                        <img class="img-fluid" src="https://picsum.photos/150/150?random=1" alt="">
                    </div>
                    <div class="item-text col">
                        <p class="m-0">選用天然食材，堅持健康、環保的理念，太幸福了。
                        </p>
                        <div class="customer-name">
                            帥哥
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="item">
                    <div class="item-img col-4">
                        <img class="img-fluid" src="https://picsum.photos/150/150?random=1" alt="">
                    </div>
                    <div class="item-text col">
                        <p class="m-0">真材實料，吃的到的安心。
                        </p>
                        <div class="customer-name">
                            MIYA
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="item">
                    <div class="item-img col-4">
                        <img class="img-fluid" src="https://picsum.photos/150/150?random=1" alt="">
                    </div>
                    <div class="item-text col">
                        <p class="m-0">這次幫朋友慶生，朋友覺得太好吃啦!
                        </p>
                        <div class="customer-name">
                            阿寶
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>

        <div id="recommend" class="row mt-5">
            <div class="col-12">
                <h2 class="section-title text-center mt-5">推薦商品</h2>
                <div class="decorate"></div>
            </div>
            <div class="col-12 d-flex justify-content-between px-4 my-3">
                <span><i class="fa-solid fa-thumbs-up pe-1"></i>特色推薦商品</span>
                <router-link :to='"/shopping"' class="text-brown">查看更多</router-link>
            </div>
            <div class="mainBox col-12 d-flex flex-wrap flex-md-row flex-column">
                <swiper class="star-swiper swiper w-100" :modules="modules" navigation :loop="true" :breakpoints="swiperOptions.breakpoints">
                    <swiper-slide v-for="(item,index) in starArr" class="item" :key='index'>
                        <div class="card border-1 shadow-sm height-100">
                            <div class="rounded-top hoverScale" style="height: 150px;">
                                <router-link class="d-block hoverScale-img" :to="'/page/' + item.id"
                                    style="background-size: cover; background-position: center"
                                    :style="{ 'background-image': `url(${item.imageUrl})` }">
                                </router-link>
                            </div>
                            <div class="card-body">
                                <span class="badge border border-brown text-brown float-right mb-2 ">{{
                                    item.category }}</span>
                                <p class="card-title omit-1 fs-6 fw-normal">
                                    <router-link :to="'/page/' + item.id" class="text-dark text-decoration-none">{{
                                        item.title }}</router-link>
                                </p>
                                <p class="card-text omit-2">{{ item.content }}</p>
                            </div>

                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <section id="e-newsletter" class="row mt-md-3 mt-5 mx-1 py-md-3 py-3">
            <div class="infoBox d-flex flex-wrap">
                <div class="col-md-6 col-auto text-brown my-md-5 my-1">
                    <h3 class="fw-bold">訂閱我們的電子報</h3>
                    <p class="">獲取即時的優惠資訊</p>
                    <div class="input-group">
                        <input type="email" class="form-control" id="email" placeholder="name@example.com">
                        <button class="btn btn-brown" type="button">訂<br>閱</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import emitter from '*/EventBus.js'
import axios from 'axios';
import $ from "jquery";
window.$ = $;

import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const modules = [Autoplay, Pagination, Navigation, Scrollbar]
let starArr = ref([])
let isLoading = ref(false);


const swiperOptions = ref({
    breakpoints: {
        600:{ 
            slidesPerView: 3.5,
            spaceBetween: 20,
            centeredSlides: false
         }, 
        0: {
            slidesPerView: 1.5,
            spaceBetween: 10,
            centeredSlides: false
        }
    }
})

function getProductsAll() {
    isLoading.value = true;
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/products/all`;
    axios.get(api).then((response) => {
        if (response.data.success) {
            isLoading.value = false;
            let data = response.data.products;
            filter_products_is_start(data);
        }
    })
}

function filter_products_is_start(data) {
    let categoryArr = new Set();

    data.forEach((item) => {
        // 取類別第一個找到,符號前面的字串。,符號之後的是'start'推薦商品
        let KeywordIndex = item.category.indexOf('star');
        if (KeywordIndex > 0) {
            item.category = item.category.substring(0, KeywordIndex - 1)
            categoryArr.add(item);
        }
    })
    starArr.value = categoryArr;
}

onMounted(() => {
    getProductsAll();
    emitter.emit('message:push', ['感恩年終慶全館享9折', 'warning']);
    
    setTimeout(() => {
        emitter.emit('message:push', ['山陀兒颱風來襲宅配延遲', 'danger']);
    }, 5000);
})

</script>
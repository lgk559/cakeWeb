<template>
    <div class="container-fluid page-inner">
        <div class="row">
            <div class="col-12">
                <swiper :modules="modules" :slides-per-view="1" :space-between="50" :loop="true" navigation
                    :pagination="{ clickable: true }" :scrollbar="{ draggable: true }" @swiper="onSwiper"
                    @slideChange="onSlideChange">
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
            <div class="col-md-4 col-6">
                <img src="/assets/images/index_aboutBtn.jpg" class="img-thumbnail" alt="...">
            </div>
            <div class="col-md-4 col-6">
                <img src="/assets/images/index_storpBtn.jpg" class="img-thumbnail" alt="...">
            </div>
            <div class="col-md-4 col-6 mt-md-0 mt-3">
                <img src="/assets/images/index_activeBtn.jpg" class="img-thumbnail" alt="...">
            </div>
        </div>

        
        <div id="Customers" class="row my-3">
            <div class="col-12">
                <h2 class="section-title text-center mt-5">客戶評價</h2>
                <div class="decorate"></div>
            </div>
            <!-- :breakpoints="{
                    1200: {slidesPerView: 2.2,spaceBetween: 80,centeredSlides: true},
                    768: {slidesPerView: 1.5,spaceBetween: 80,centeredSlides: true},
                    0: {slidesPerView: 1,spaceBetween: 0,centeredSlides: false}
                }" -->
            <swiper class="Customers-swiper swiper" :modules="modules" navigation :autoplay="{
                delay: 2500,
                disableOnInteraction: false
            }" :loop="true">
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
            <div class="mainBox col-12 d-flex">
                <div class="col-lg-3 col-md-3 col-sm-4 col-12 px-3 pb-3">
                    <div class="card border-1 shadow-sm height-100">
                        <div class="rounded-top hoverScale" style="height: 150px;">
                            <router-link class="d-block hoverScale-img" :to="'/page/-O3g9ch5WylE4Vpi5leG'"
                                style="background-size: cover; background-position: center"
                                :style="{ 'background-image': `url(https://storage.googleapis.com/vue-course-api.appspot.com/ozeu/1724947382269.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=kYrKtJanTRzc3Re7hSFjydKxTONYGkU764TdABxpF9wNz0QBFJMQxvg6YLR41zNS5lv4%2FioGvbTbd35WxN%2BNatm21U%2BMTT5BDwCEMHIvyBKxZbvcZHqKO96NNKHSbqYBBaPlXU0MMvOq90vZ6gEHeKcDk065VRqemK46szAhBefMHdWma803Lpv6SYQPSriDdPYBC%2FXiw4Ya2Mvz9625lf0S5erp8jhz2DvVWajyQmpXdBssEdOJpjhPKENzbBjHvmnnE59EePHvIFYtYEyUkM4IjPgIRvuGisE4uWEi9X%2F4xRb5gHcHW67gcEPTRebjHaYjcJ74GPZ9UL8sNQI63g%3D%3D)` }">

                            </router-link>
                        </div>
                        <div class="card-body">
                            <span class="badge border border-brown text-brown float-right mb-2 ">杯子蛋糕</span>
                            <p class="card-title omit-1 fs-6 fw-normal">
                                <router-link :to="'/page/-O3g9ch5WylE4Vpi5leG'"
                                    class="text-dark text-decoration-none">莓果杯子蛋糕</router-link>
                            </p>
                            <div class="d-flex">
                                <div class="col-6 text-decoration-line-through text-secondary">
                                    <span>原價：</span>
                                    <span class="text-decoration-line-through">{{
                                        $currency.currencyUSD(50)
                                        }}</span>
                                </div>
                                <div class="col-6 text-danger">
                                    <span>特價：</span>
                                    <span class="fs-5">{{ $currency.currencyUSD(75) }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-center bg-brown p-1">
                            <router-link :to="'/page/-O3g9ch5WylE4Vpi5leG'" type="button"
                                class="btn btn-outline-gold btn-sm me-3">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </router-link>
                            <button type="button" class="btn btn-outline-gold btn-sm ml-auto" @click=addtoCart()>
                                <i class="fa-solid fa-cart-shopping"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-12 px-3 pb-3">
                    <div class="card border-1 shadow-sm height-100">
                        <div class="rounded-top hoverScale" style="height: 150px;">
                            <router-link class="d-block hoverScale-img" :to="'/page/-O3g9ch5WylE4Vpi5leG'"
                                style="background-size: cover; background-position: center"
                                :style="{ 'background-image': `url(https://storage.googleapis.com/vue-course-api.appspot.com/ozeu/1724947382269.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=kYrKtJanTRzc3Re7hSFjydKxTONYGkU764TdABxpF9wNz0QBFJMQxvg6YLR41zNS5lv4%2FioGvbTbd35WxN%2BNatm21U%2BMTT5BDwCEMHIvyBKxZbvcZHqKO96NNKHSbqYBBaPlXU0MMvOq90vZ6gEHeKcDk065VRqemK46szAhBefMHdWma803Lpv6SYQPSriDdPYBC%2FXiw4Ya2Mvz9625lf0S5erp8jhz2DvVWajyQmpXdBssEdOJpjhPKENzbBjHvmnnE59EePHvIFYtYEyUkM4IjPgIRvuGisE4uWEi9X%2F4xRb5gHcHW67gcEPTRebjHaYjcJ74GPZ9UL8sNQI63g%3D%3D)` }">

                            </router-link>
                        </div>
                        <div class="card-body">
                            <span class="badge border border-brown text-brown float-right mb-2 ">杯子蛋糕</span>
                            <p class="card-title omit-1 fs-6 fw-normal">
                                <router-link :to="'/page/-O3g9ch5WylE4Vpi5leG'"
                                    class="text-dark text-decoration-none">莓果杯子蛋糕</router-link>
                            </p>
                            <div class="d-flex">
                                <div class="col-6 text-decoration-line-through text-secondary">
                                    <span>原價：</span>
                                    <span class="text-decoration-line-through">{{
                                        $currency.currencyUSD(50)
                                        }}</span>
                                </div>
                                <div class="col-6 text-danger">
                                    <span>特價：</span>
                                    <span class="fs-5">{{ $currency.currencyUSD(75) }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-center bg-brown p-1">
                            <router-link :to="'/page/-O3g9ch5WylE4Vpi5leG'" type="button"
                                class="btn btn-outline-gold btn-sm me-3">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </router-link>
                            <button type="button" class="btn btn-outline-gold btn-sm ml-auto" @click=addtoCart()>
                                <i class="fa-solid fa-cart-shopping"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-12 px-3 pb-3">
                    <div class="card border-1 shadow-sm height-100">
                        <div class="rounded-top hoverScale" style="height: 150px;">
                            <router-link class="d-block hoverScale-img" :to="'/page/-O3g9ch5WylE4Vpi5leG'"
                                style="background-size: cover; background-position: center"
                                :style="{ 'background-image': `url(https://storage.googleapis.com/vue-course-api.appspot.com/ozeu/1724947382269.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=kYrKtJanTRzc3Re7hSFjydKxTONYGkU764TdABxpF9wNz0QBFJMQxvg6YLR41zNS5lv4%2FioGvbTbd35WxN%2BNatm21U%2BMTT5BDwCEMHIvyBKxZbvcZHqKO96NNKHSbqYBBaPlXU0MMvOq90vZ6gEHeKcDk065VRqemK46szAhBefMHdWma803Lpv6SYQPSriDdPYBC%2FXiw4Ya2Mvz9625lf0S5erp8jhz2DvVWajyQmpXdBssEdOJpjhPKENzbBjHvmnnE59EePHvIFYtYEyUkM4IjPgIRvuGisE4uWEi9X%2F4xRb5gHcHW67gcEPTRebjHaYjcJ74GPZ9UL8sNQI63g%3D%3D)` }">

                            </router-link>
                        </div>
                        <div class="card-body">
                            <span class="badge border border-brown text-brown float-right mb-2 ">杯子蛋糕</span>
                            <p class="card-title omit-1 fs-6 fw-normal">
                                <router-link :to="'/page/-O3g9ch5WylE4Vpi5leG'"
                                    class="text-dark text-decoration-none">莓果杯子蛋糕</router-link>
                            </p>
                            <div class="d-flex">
                                <div class="col-6 text-decoration-line-through text-secondary">
                                    <span>原價：</span>
                                    <span class="text-decoration-line-through">{{
                                        $currency.currencyUSD(50)
                                        }}</span>
                                </div>
                                <div class="col-6 text-danger">
                                    <span>特價：</span>
                                    <span class="fs-5">{{ $currency.currencyUSD(75) }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-center bg-brown p-1">
                            <router-link :to="'/page/-O3g9ch5WylE4Vpi5leG'" type="button"
                                class="btn btn-outline-gold btn-sm me-3">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </router-link>
                            <button type="button" class="btn btn-outline-gold btn-sm ml-auto" @click=addtoCart()>
                                <i class="fa-solid fa-cart-shopping"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-12 px-3 pb-3">
                    <div class="card border-1 shadow-sm height-100">
                        <div class="rounded-top hoverScale" style="height: 150px;">
                            <router-link class="d-block hoverScale-img" :to="'/page/-O3g9ch5WylE4Vpi5leG'"
                                style="background-size: cover; background-position: center"
                                :style="{ 'background-image': `url(https://storage.googleapis.com/vue-course-api.appspot.com/ozeu/1724947382269.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=kYrKtJanTRzc3Re7hSFjydKxTONYGkU764TdABxpF9wNz0QBFJMQxvg6YLR41zNS5lv4%2FioGvbTbd35WxN%2BNatm21U%2BMTT5BDwCEMHIvyBKxZbvcZHqKO96NNKHSbqYBBaPlXU0MMvOq90vZ6gEHeKcDk065VRqemK46szAhBefMHdWma803Lpv6SYQPSriDdPYBC%2FXiw4Ya2Mvz9625lf0S5erp8jhz2DvVWajyQmpXdBssEdOJpjhPKENzbBjHvmnnE59EePHvIFYtYEyUkM4IjPgIRvuGisE4uWEi9X%2F4xRb5gHcHW67gcEPTRebjHaYjcJ74GPZ9UL8sNQI63g%3D%3D)` }">

                            </router-link>
                        </div>
                        <div class="card-body">
                            <span class="badge border border-brown text-brown float-right mb-2 ">杯子蛋糕</span>
                            <p class="card-title omit-1 fs-6 fw-normal">
                                <router-link :to="'/page/-O3g9ch5WylE4Vpi5leG'"
                                    class="text-dark text-decoration-none">莓果杯子蛋糕</router-link>
                            </p>
                            <div class="d-flex">
                                <div class="col-6 text-decoration-line-through text-secondary">
                                    <span>原價：</span>
                                    <span class="text-decoration-line-through">{{
                                        $currency.currencyUSD(50)
                                        }}</span>
                                </div>
                                <div class="col-6 text-danger">
                                    <span>特價：</span>
                                    <span class="fs-5">{{ $currency.currencyUSD(75) }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-center bg-brown p-1">
                            <router-link :to="'/page/-O3g9ch5WylE4Vpi5leG'" type="button"
                                class="btn btn-outline-gold btn-sm me-3">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </router-link>
                            <button type="button" class="btn btn-outline-gold btn-sm ml-auto" @click=addtoCart()>
                                <i class="fa-solid fa-cart-shopping"></i>
                            </button>
                        </div>
                    </div>
                </div>
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
            <!-- <img src="https://fakeimg.pl/1900x200/ccc/" class="img-fluid p-0"> -->
            <!-- <div class="jarallax">
            </div> -->
        </section>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import emitter from '*/EventBus.js'
import $ from "jquery";
window.$ = $;
import { Modal } from "bootstrap";
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import Navbar from '*/components/pages/shared/Navbar_customer.vue';
const modules = [Autoplay, Pagination, Navigation, Scrollbar]

const swiperOptions = ref({
    breakpoints: {
        // 600:{ 
        //     slidesPerView:1.5,
        //     spaceBetween: 80,
        //     centeredSlides: true

        //  }, 
        0: {
            slidesPerView: 2.5,
            spaceBetween: 80,
            centeredSlides: true

        }
    }
})
function onSwiper(swiper) {
    console.log(swiper);
}
function onSlideChange() {
    console.log('slide change');
}

function addtoCart(id, qty = 1) {

    // status.value.productChangeToCart = id
    emitter.emit('cart:change', ["-O3g9ch5WylE4Vpi5leG", qty])
}
onMounted(() => {
    // const Customers_swiper = new Swiper('.Customers-swiper', {
    //         loop: true,
    //         slidesPerView: 1,
    //         freeMode: true,
    //         centeredSlides: true,
    //         // allowTouchMove: true,
    //         speed: 1200,
    //         spaceBetween: 0,
    //         autoplay: {
    //             delay: 2500
    //         },
    //         navigation: {
    //             nextEl: ".swiper_Customers-button-next",
    //             prevEl: ".swiper_Customers-button-prev",
    //         },
    //         breakpoints: {
    //             991: {
    //                 slidesPerView: 2.5,
    //                 spaceBetween: 80,
    //                 centeredSlides: true,
    //             },
    //             768: {
    //                 slidesPerView: 1.8,
    //                 spaceBetween: 80,
    //                 centeredSlides: true,
    //             },
    //         }
    //     })
})

onBeforeMount(() => {

    emitter.on('cart:success', (value) => {
        if (value) {
            // status.value.productChangeToCart = '';
        }
    })
})
</script>
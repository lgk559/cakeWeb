<template>
    <div class="container-fluid ">
        <div class="row">
            <div class="col-12" >
                <swiper :modules="modules" :slides-per-view="1" :space-between="50" navigation
                    :pagination="{ clickable: true }"
                    :scrollbar="{ draggable: true }" @swiper="onSwiper" @slideChange="onSlideChange" style="height: 500px;">
                    <swiper-slide>Slide 1</swiper-slide>
                    <swiper-slide>Slide 2</swiper-slide>
                    <swiper-slide>Slide 3</swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import $ from "jquery";
window.$ = $;
import { Modal } from "bootstrap";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import Navbar from '*/components/pages/shared/Navbar_customer.vue';
const modules = [Pagination, Navigation,Scrollbar]
function onSwiper(swiper){
    console.log(swiper);
}
function onSlideChange(){
    console.log('slide change');
}
</script>
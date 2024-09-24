<template>
    <div>
        <div class="row justify-content-center align-items-center text-center p-5">
            <h1>訂單成立</h1>
            <p>感謝您的購買，我們會盡快出貨，您可以再訂單查詢進度</p>
            <router-link to="/purchase" class="btn btn-outline-brown w-auto">查詢訂單</router-link>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import emitter from '*/EventBus';
const carts = ref({});
let cartsLength = ref(0);


function getCartData() {
    // 執行cart.vue元件的函式
    emitter.emit('cart:init');
}

onMounted(() => {

    emitter.on('cart:returndata', (data) => {
        // 接收來自cart.vue的資料
        carts.value = data;
        cartsLength.value = data.carts.length;
        console.log('updata')
    });
    getCartData()
})

</script>
<template>
    <div>
        <div class="vl-parent">
            <loading v-model:active="isLoading" />
        </div>
        <div class="page-inner">
            <div class="d-flex justify-content-center align-items-center text-center">
                <ul class="orderList p-3">
                    <li class="d-md-flex d-none bg-brown text-gold">
                        <!-- <div class="col-1 text-center border p-2">#</div> -->
                        <div class="col-2 text-center border p-2">購買時間</div>
                        <div class="col-2 text-center border p-2">Email</div>
                        <div class="col-4 text-center border p-2">購買款項</div>
                        <div class="col-2 text-center border p-2">應付金額</div>
                        <div class="col-2 text-center border p-2">是否付款</div>
                    </li>
                    <template v-if="orders.length > 0">
                        <li class="d-flex flex-wrap align-items-stretch mb-md-0 mb-3 text-left" v-for="(item,i) in orders">
                            <template v-if="item.user">
                                <!-- <div class="col-md-1 col-12 border p-2" title="#">{{ item.num }}</div> -->
                                <div class="col-md-2 col-12 d-flex border p-md-2 px-3 py-2" title="購買時間"><span class="align-items-center">{{ $mydata.getData(item.create_at) }}</span></div>
                                <div class="col-md-2 col-12 d-flex border p-md-2 p-0" title="Email"><span class="align-content-center">{{ item.user.email }}</span></div>
                                <div class="col-md-4 col-12 d-flex border p-md-2 p-0" title="購買款項">
                                    <ul class="d-inline-block align-content-center">
                                        <li v-for="products_item in item.products">
                                            {{ products_item.product.title }} x {{ products_item.qty }}
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-2 col-12 d-flex border p-md-2 p-0" title="應付金額">
                                    <span class="align-content-center">{{ item.total }}</span>
                                </div>
                                <div class="col-md-2 col-12 d-flex border p-md-2 p-0" title="是否付款">
                                    <span class="align-content-center">
                                        <span v-if="item.is_paid" class="text-success">已付款</span>
                                        <span v-else>未付</span>
                                    </span>
                                </div>
                            </template>
                        </li>
                    </template>
                    <template v-else>
                        <li>
                            <div class="col-12 d-flex flex-wrap justify-content-center align-items-center border p-3 text-center">
                                <h1 class="col-12">空</h1>
                                <p class="col-12">您尚未有訂單哦！</p>
                                <router-link to="/shopping" class="btn btn-outline-brown w-auto">去逛逛</router-link>
                            </div>
                        </li>
                    </template>
                    
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import emitter from '*/EventBus.js'
const router = useRouter()
let isLoading = ref(false)
const orders = ref([
    // {
    //     "create_at": 1523539834,
    //     "id": "-L9u2EUkQSoEmW7QzGLF",
    //     "is_paid": true,
    //     "message": "這是留言",
    //     "paid_date": 1523539924,
    //     "payment_method": "credit_card",
    //     "products": {
    //         "L8nBrq8Ym4ARI1Kog4t": {
    //             "id": "L8nBrq8Ym4ARI1Kog4t",
    //             "product_id": "-L8moRfPlDZZ2e-1ritQ",
    //             "qty": "3"
    //         }
    //     },
    //     "total": 100,
    //     "user": {
    //         "address": "kaohsiung",
    //         "email": "test@gmail.com",
    //         "name": "test",
    //         "tel": "0912346768"
    //     },
    //     "num": 1
    // }
])
const pagination = ref()
function getOrders() {
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/orders`
    isLoading.value = true;
    axios.get(api).then((response) => {
        console.log(response.data)
        if (response.data.success) {
            pagination.value = response.data.pagination
            // emitter.emit('pagination:init', pagination.value);
            isLoading.value = false;
            orders.value = response.data.orders
        } else {
            console.log('erro')
        }
    })
}
onMounted(() => {
    getOrders()
    // emitter.on('pagination:chage', (page) => {
    //     getOrders(page)
    // });

})

</script>
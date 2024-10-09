<template>
    <div>
        <div class="vl-parent">
            <loading v-model:active="isLoading" />
        </div>
        <template v-if="orders.length > 0">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">購買時間</th>
                        <th scope="col">Email</th>
                        <th scope="col">購買款項</th>
                        <th scope="col">應付金額</th>
                        <th scope="col">是否付款</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in orders" :key="item.id">
                        <template v-if="item.user">
                            <th scope="row">{{ item.num }}</th>
                            <td>{{ $mydata.getData(item.create_at) }}</td>
                            <td>{{ item.user.email }}</td>
                            <td>
                                <ul>
                                    <li v-for="products_item in item.products">
                                        {{ products_item.product.title }} 數量：{{ products_item.qty }}
                                    </li>
                                </ul>
                            </td>
                            <td>{{ item.total }}</td>
                            <td>
                                <span v-if="item.is_paid" class="text-success">已付款</span>
                                <span v-else>未付</span>
                            </td>
                        </template>

                    </tr>
                </tbody>
            </table>
        </template>
        <template v-else>
            <div class="container-fluid">
                <div class="row">
                    <div class="col">
                        <p class="fs-2">尚無訂單</p>
                    </div>
                </div>
            </div>

        </template>
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
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/admin/orders`
    isLoading.value = true;
    axios.get(api).then((response) => {
        console.log(response.data)
        if (response.data.success) {
            pagination.value = response.data.pagination
            emitter.emit('pagination:init', pagination.value);
            isLoading.value = false;
            orders.value = response.data.orders
        } else {
            emitter.emit('messagepush', ['需登入', 'danger']);
            router.replace('/')
        }
    })
}
onMounted(() => {
    getOrders()
    emitter.on('pagination:chage', (page) => {
        getOrders(page)
    });
})

</script>
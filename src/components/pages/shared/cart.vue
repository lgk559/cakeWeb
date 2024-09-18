<template>
    <div class="d-flex text-gold" id="cart" v-if="carts.carts">
        <div type="button" class="nav-iteme">
            <div class="nav-link" @click="openCart">
                <i class="fa-solid fa-cart-shopping"></i>
                <span class="position-absolute start-100 translate-middle badge rounded-pill bg-danger">
                    {{ carts.carts.length }}
                    <span class="visually-hidden">unread messages</span>
                </span>
            </div>
        </div>

    </div>


    <!-- Modal -->
    <div ref="modalEle_cart" class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog w-md-auto w-100 mx-md-auto mx-0" role="document">
            <div class="modal-content border-0">
                <div class="modal-header bg-custom text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                        <span>您目前的購物車品項</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <td class="col text-nowrap">管理</td>
                                <td class="col">品名</td>
                                <td class="col">數量</td>
                                <td class="col d-none">單價</td>
                                <td class="col d-none">小計</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in carts.carts">
                                <td class="col">
                                    <button type="button" class="btn btn-danger btn-sm me-md-3 me-0">
                                        <i v-if="status.productChangeToCart == item.product.id" class="fas fa-spinner fa-spin"></i>
                                        <div v-else class="p">X</div>
                                    </button>
                                </td>
                                <td class="col">
                                    <div class="p omit-1">
                                        <router-link :to="'/page/'+item.product.id">
                                            {{item.product.title}}
                                        </router-link>
                                    </div>
                                </td>
                                <td class="col d-flex">
                                    <button type="button" class="btn btn-primary rounded-0 rounded-start" :disabled="item.qty<=1" @click="changeQty($event,item.product.id,item.qty-1)">-</button>
                                    <input type="txt" class="form-control rounded-0 addCartNum text-center" :value="item.qty" @change="changeQty($event,item.product.id)">
                                    <button type="button" class="btn btn-primary rounded-0 rounded-end" @click="changeQty($event,item.product.id,item.qty+1)">+</button>
                                </td>
                                <td class="col d-none">{{ item.product.price }}</td>
                                <td class="col d-none">{{ item.total }}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">繼續購買</button>
                    <button type="button" class="btn btn-custom" @click="delProduct">前往結帳</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import emitter from '*/EventBus';
import axios from 'axios';
import { useRouter } from 'vue-router'
const router = useRouter()
import { Modal } from "bootstrap";
import $ from "jquery";
window.$ = $;
const carts = ref([]);
let qty = ref(1)
const modalEle_cart = ref(null);
let thisModalObj_cart = null;

let isLoading = ref(false);
let status = ref({
    productLoading: '',
    productChangeToCart: '',
});

function getCart() {
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/cart`;
    axios.get(api).then((response) => {
        // console.log(response.data)
        if (response.data.success) {
            carts.value = response.data.data;
            console.log(carts.value)
        }
    })
}
function openCart() {
    thisModalObj_cart.show();
}

function changeQty(e,id,value) {
    let qty = value ? value : e.target.value;
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/cart`;   
    axios.post(api, { data: { "product_id": id, "qty": qty } }).then((response) => {
        // console.log(response.data)
        if (response.data.success) {
            status.value.productChangeToCart = '';
            // thisModalObj_product.hide();
            getCart();
        }
    })

}

function addtoCart(id, qty = 1) {
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/cart`;
    status.value.productChangeToCart = id;
    // console.log(id, qty)
    axios.post(api, { data: { "product_id": id, "qty": qty } }).then((response) => {
        // console.log(response.data)
        if (response.data.success) {
            status.value.productChangeToCart = '';
            // thisModalObj_product.hide();
            getCart();
        }
    })
}

onMounted(() => {
    thisModalObj_cart = new Modal(modalEle_cart.value);
    emitter.on('cart:change',(id)=>{
        addtoCart(id)
    })
    getCart();

})


</script>
<style lang="scss">

</style>

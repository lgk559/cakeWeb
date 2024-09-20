<template>
    <loading v-model:active="isLoading" />
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
        <div class="modal-dialog w-md-auto w-100 mx-sm-auto mx-0" role="document">
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
                                <td class="col d-md-table-cell d-none">單價</td>
                                <td class="col d-md-table-cell d-none">小計</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in carts.carts" key="item.id">
                                <td class="col">
                                    <button type="button" class="btn btn-danger btn-sm me-md-3 me-0" @click="deleteCart(item.id),status.productChangeToCart = item.product.id">
                                        <i v-if="status.productChangeToCart == item.product.id" class="fas fa-spinner fa-spin"></i>
                                        <div v-else class="p">X</div>
                                    </button>
                                </td>
                                <td class="col">
                                    <div class="p omit-1">
                                        <router-link :to="`/page/${item.product.id}`" @click="closeCart">
                                            {{item.product.title}}
                                        </router-link>
                                    </div>
                                </td>
                                <td class="col d-flex">
                                    <button type="button" class="btn btn-primary rounded-0 rounded-start" :disabled="item.qty<=1" @click="changeCart($event,item.product.id,item.qty-1)">-</button>
                                    <input type="txt" class="form-control rounded-0 addCartNum text-center" :value="item.qty" @change="changeCart($event,item.product.id)">
                                    <button type="button" class="btn btn-primary rounded-0 rounded-end" @click="changeCart($event,item.product.id,item.qty+1)">+</button>
                                </td>
                                <td class="col d-md-table-cell d-none">{{ item.product.price }}</td>
                                <td class="col d-md-table-cell d-none">{{ item.total }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr>
                    <div class="row justify-content-end pe-3">
                        <div class="col-auto"> 總計：{{ carts.final_total }}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">繼續購買</button>
                    <router-link to="/check/cart" type="button" class="btn btn-danger" @click="closeCart">前往結帳</router-link>
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
            status.value.productChangeToCart = '';
        }
    })
}
function openCart() {
    thisModalObj_cart.show();
}
function closeCart(){
    thisModalObj_cart.hide();
}

function changeCart(e,id,value) {
    console.log('changeCart')
    let qty = value ? value : e.target.value;
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/cart`;   

    // 檢查是否有重複
    let careArr = carts.value.carts
    isLoading.value = true
    careArr.filter( item => { 
        console.log(item.product.id,id)
        if(item.product.id == id){
            deleteCart(item.id)
            if(!e){
                qty = parseInt(item.qty) + parseInt(qty)
            }
        }
    })
    
    
    axios.post(api, { data: { "product_id": id, "qty": qty } }).then((response) => {
        // console.log(response.data)
        if (response.data.success) {
            // thisModalObj_product.hide();
            getCart();
        }
        if(!e){
            // 如果從其它子元件送過來的不會有e，用此特性來判斷是否回傳"成功"給子元件消除loading狀態
            emitter.emit('cart:success',true)
        }
        isLoading.value = false
    })
}

function deleteCart(id) {
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/cart/${id}`;   
    axios.delete(api).then((response)=>{
        if (response.data.success) {
            getCart();
        }
    })
}



onMounted(() => {
    thisModalObj_cart = new Modal(modalEle_cart.value);
    emitter.on('cart:change',(data)=>{
        let id = data[0];
        let qty = data[1]
        changeCart(null,id,qty)
    })
    getCart();
})


</script>
<style lang="scss">

</style>

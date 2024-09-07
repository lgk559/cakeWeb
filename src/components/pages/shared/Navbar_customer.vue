<template>
    <nav class="sticky-top navbar navbar-expand-lg navbar-light bg-brown text-gold">
        <div class="container-fluid justify-content-lg-center justify-content-md-between">
            <a class="navbar-brand text-gold" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto ps-3 mb-2 mb-lg-0">
                    <slot></slot>
                    <!-- <form class="d-flex" style="margin-left: auto; padding-right: 5%;">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form> -->
                </ul>
                
                <div class="d-flex position-absolute" id="cart">
                    <div type="button" class="nav-item position-relative">
                        <div class="nav-link" @click="openCart">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <span class="position-absolute start-100 translate-middle badge rounded-pill bg-danger">
                                1
                                <span class="visually-hidden">unread messages</span>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </nav>

    <!-- Modal -->
    <div ref="modalEle_cart" class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
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
                                    <th scope="col">
                                        <button type="button" class="btn btn-danger btn-sm me-3">
                                            <i class="fas fa-spinner fa-spin"></i>
                                            刪除
                                        </button>
                                    </th>
                                    <th scope="col">
                                        <img src="" alt="">
                                    </th>
                                    <th scope="col flex-grow-1">品名</th>
                                    <th scope="col" class="d-flex">
                                        <button type="button" class="btn btn-primary rounded-0 rounded-start">+</button>
                                        <input type="txt" class="form-control rounded-0 cartNum">
                                        <button type="button" class="btn btn-primary rounded-0 rounded-end">-</button>
                                    </th>
                                    <th scope="col">單價</th>
                                    <th scope="col">小計</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="col">管理</th>
                                    <th scope="col flex-grow-1">品名</th>
                                    <th scope="col">數量</th>
                                    <th scope="col">單價</th>
                                    <th scope="col">小計</th>
                                </tr>
                                <!-- <tr v-for="(item, index) in carts.carts" :key="item.id" :id="item.id">
                                    <th scope="col">
                                        <button type="button" class="btn btn-danger btn-sm me-3" @click="delCartItem(item)">
                                            <i class="fas fa-spinner fa-spin"
                                                v-if="status.productChangeToCart == item.id"></i>
                                            刪除
                                        </button>
                                    </th>
                                    <th scope="col">{{ index + 1 }}</th>
                                    <th scope="col flex-grow-1">{{ item.product.title }}</th>
                                    <th scope="col">{{ item.qty }}</th>
                                    <th scope="col">{{ item.product.price }}</th>
                                    <th scope="col">{{ item.total }}</th>
                                </tr> -->
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
import axios from 'axios';
import { useRouter } from 'vue-router'
const router = useRouter()
import { Modal } from "bootstrap";
import $ from "jquery";
window.$ = $;

const modalEle_cart = ref(null);
let thisModalObj_cart = null;

function openCart(){
    thisModalObj_cart.show();
}

onMounted(() => {
    thisModalObj_cart = new Modal(modalEle_cart.value);



})


</script>

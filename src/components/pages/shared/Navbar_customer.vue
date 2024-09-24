<template>
    <nav class="fixed-top navbar navbar-dark navbar-expand-lg  bg-brown text-gold">
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
                
            </div>
        </div>
        <!-- <Cart></Cart> -->
    </nav>

    
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router'
const router = useRouter()
import { Modal } from "bootstrap";
import $ from "jquery";
window.$ = $;
// import Cart from '*/components/pages/shared/cart.vue'

//const modalEle_cart = ref(null);
//let thisModalObj_cart = null;

// function openCart() {
//     thisModalObj_cart.show();
// }

onMounted(() => {
    //thisModalObj_cart = new Modal(modalEle_cart.value);



})


</script>

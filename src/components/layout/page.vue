<template>
    <div class="main">
        <Alert />
        <Navbar>
            <li class="nav-item  mx-2">
                <router-link class="nav-link text-gold" to="/shopping" @click="closeNav">
                    商品資訊
                </router-link>
            </li>     
            <li class="nav-item mx-2">
                <router-link class="nav-link text-gold" to="/brand" @click="closeNav">
                    品牌介紹
                </router-link>
            </li>
            <li class="nav-item mx-2">
                <router-link class="nav-link text-gold" to="/qa" @click="closeNav">
                    購物需知
                </router-link>
            </li>
            <li class="nav-item mx-2">
                <router-link class="nav-link text-gold" to="/store" @click="closeNav">
                    門市據點
                </router-link>
            </li>
            <li class="nav-item mx-2">
                <router-link class="nav-link text-gold" to="/purchase" @click="closeNav">
                    訂單查詢
                </router-link>
            </li>
            <li class="nav-item mx-2">
                <router-link class="nav-link text-gold"  to="/login" @click="closeNav">
                    後台登入
                </router-link>
            </li>
    
        </Navbar>
        <Cart></Cart>
        <router-view></router-view>
    </div>
    <Footer></Footer>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import emitter from '*/EventBus';
import { useRouter } from 'vue-router'
const router = useRouter()
import axios from 'axios'
import Navbar from '*/components/pages/shared/Navbar_customer.vue'
import Cart from '*/components/pages/shared/cart.vue'
import Alert from '*/components/pages/shared/AlertMessage2.vue';
import Footer from '*/components/pages/shared/footer.vue'

function closeNav(){
    emitter.emit('nav:close')
}

onBeforeMount(() => {
    var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common.Authorization = myCookie
})

</script>
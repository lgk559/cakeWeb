<template>
    <Alert />
    <Navbar>
        <li class="nav-item  mx-2">
            <a class="nav-link text-gold" href="#" @click.prevent="goto('/shopping')">
                商品資訊
            </a>
        </li>
        <!-- <li class="nav-item mx-2">
            <a class="nav-link text-gold" href="#">
                最新消息
            </a>
        </li> -->
        <li class="nav-item mx-2">
            <a class="nav-link text-gold" href="#">
                品牌介紹
            </a>
        </li>
        <li class="nav-item mx-2">
            <a class="nav-link text-gold" href="#">
                購物需知
            </a>
        </li>
        <li class="nav-item mx-2">
            <a class="nav-link text-gold" href="#">
                門市據點
            </a>
        </li>
        <li class="nav-item mx-2">
            <a class="nav-link text-gold"  href="#" @click.prevent="goto('/login')">
                後台登入
            </a>
        </li>

    </Navbar>
    <router-view></router-view>
    <Footer></Footer>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import axios from 'axios'
import Navbar from '*/components/pages/shared/Navbar_customer.vue'
import Alert from '*/components/pages/shared/AlertMessage2.vue';
import Footer from '*/components/pages/shared/footer.vue'

function goto(path){
    router.replace({ path: path })
}

onBeforeMount(() => {
    var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common.Authorization = myCookie
})

</script>
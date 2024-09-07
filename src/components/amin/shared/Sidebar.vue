<template>
    <div class="sidebar position-relative col-2 text-white bg-dark">
        <div class="sidebar-info col-2 fixed-top d-flex flex-column h-100 p-2">
            <div class="navbar-brand fs-1 mb-3">
                茶庫方
            </div>
            <ul class="nav nav-pills flex-column mb-auto ">
                <router-link  class="nav-item d-flex flex-row align-items-center mb-2 active" to="/admin/products">
                    <span class="material-symbols-outlined me-2">category</span>
                    產品管理
                </router-link>
                <router-link  class="nav-item d-flex flex-row align-items-center mb-2" to="/admin/order">
                    <span class="material-symbols-outlined me-2">inventory_2</span>
                    訂單列表
                </router-link>
                <router-link class="nav-item d-flex flex-row align-items-center mb-2" to="/admin/offer">
                    <span class="material-symbols-outlined me-2">list_alt</span>
                    優惠券管理
                </router-link>
            </ul>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <router-link  class="nav-item d-flex flex-row align-items-center mb-2 active" to="/customer_order">
                    <span class="material-symbols-outlined me-2">category</span>
                    模擬訂單
                </router-link>
            </ul>
            <div class="dropdown">
                <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
                    <strong><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">多維</font></font></strong>
                </a>
                <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <!-- <li><a class="dropdown-item" href="#"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">新項目...</font></font></a></li>
                    <li><a class="dropdown-item" href="#"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">設定</font></font></a></li>
                    <li><a class="dropdown-item" href="#"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">輪廓</font></font></a></li>
                    <li><hr class="dropdown-divider"></li> -->
                    <li><a class="dropdown-item" href="#" @click.prevent="logout"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">登出</font></font></a></li>
                </ul>
            </div>
        </div>
        
    </div>
    

</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router'
const router = useRouter()

onBeforeMount(() => {




})
function logout() {
    console.log('click')
    const api = `${import.meta.env.VITE_APIPATH}/logout`
    axios.post(api).then((response) => {
        if (response.data.success) {
            router.push({ path: '/login', replace: true })
            console.log(response.data)
            console.log("登出成功")
        }
    })
}

</script>
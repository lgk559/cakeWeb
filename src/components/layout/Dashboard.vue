<template>
    <Alert/>   
    <div class="page d-flex align-items-stretch row">
        <Sidebar />
        <div class="pageRight col-10">
            
            <router-view></router-view>
            
        </div>
    </div>
</template>

<script setup>
import { ref,reactive, onMounted,onBeforeMount } from 'vue'
import axios from 'axios'
import Navbar from '*/components/amin/shared/Navbar.vue'
import Sidebar from '*/components/amin/shared/Sidebar.vue'
import  Alert from '*/components/pages/shared/AlertMessage2.vue';


onBeforeMount(()=>{
    var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common.Authorization = myCookie
})

</script>
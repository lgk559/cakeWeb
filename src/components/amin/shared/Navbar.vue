<template>
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
                aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button> -->
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <div class="collapse navbar-collapse position-absolute end-0" id="navbarScroll">
                <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
                    <slot></slot>
                    <li class="nav-item">
                        <a class="nav-link" @click.prevent="logout">登出</a>
                    </li>
                </ul>
                
            </div>
        </div>
    </nav>
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

<template>
    <nav id="header" class="fixed-top navbar navbar-dark navbar-expand-lg  bg-brown text-gold">
        <div class="container-fluid justify-content-lg-center justify-content-md-between">
            <a class="navbar-brand text-gold" href="#">
                <i class="fa-solid fa-cake-candles"></i> Cake
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#pageTopNav" aria-controls="pageTopNav" :aria-expanded="isNavShow"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse flex-grow-0" id="pageTopNav" :class="{'show' : isNavShow}">
                <ul class="navbar-nav me-auto ps-3 mb-2 mb-lg-0">
                    <slot ></slot>
                </ul>
                
            </div>
        </div>
    </nav>

    
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import emitter from '*/EventBus';

const router = useRouter()

let isNavShow = ref(false)


function closeNav() {
    document.querySelector("#pageTopNav").classList.remove("show")
}



onMounted(() => {

    emitter.on('nav:close',()=>{
        closeNav()
    })

})


</script>

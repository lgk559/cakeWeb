<template>
    <div class="goTopBtn" @click="goTop">
        <img src="/assets/images/gotopBtn.png" alt="">
    </div>
</template>

<script setup>
import $ from "jquery";
window.$ = $;
    function goTop(){
        $("html, body").animate({ scrollTop: 0 }, 600);
    }
</script>
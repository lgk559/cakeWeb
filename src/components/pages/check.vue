<template>
    <div>
        <Order_process />
        <router-view></router-view>
    </div>
</template>
<script setup>
    import { useRouter } from 'vue-router'
    import Order_process from '*/components/pages/shared/Order_process.vue'
    const router = useRouter()

</script>
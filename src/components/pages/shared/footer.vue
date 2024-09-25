<template>
    <footer class="secCont footer">
        <p class="p-0 m-0">非官方網站僅作練習使用，無任何商業用途</p>
        <p class="p-0 m-0">建議使用edge或Chrome瀏覽器，以達最佳瀏覽效果。<br>
            Copyright © {{ year }} {{ companyName }} All Rights Reserved.</p>
    </footer>
</template>

<script setup>
    import { ref } from 'vue'
    let year = ref(2024)
    let companyName = ref(import.meta.env.VITE_company)
</script>
<template>
    <footer class="secCont footer">
        <p>建議使用edge或Chrome瀏覽器，以達最佳瀏覽效果。<br>
            Copyright © {{ year }} {{ companyName }} All Rights Reserved.</p>
    </footer>
</template>

<script setup>
    import { ref } from 'vue'
    let year = ref(2024)
    let companyName = ref(import.meta.env.VITE_company)
</script>
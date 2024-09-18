<template>
    <div class="timelineBox">
        <ul class="timeline">
            <li class="dialog_wrapper" v-for="item in logs">
                <div class="dialog">
                    <div class="imgBOx"><img src="../../assets/images/vue.svg" alt=""></div>
                    <p class="infoBox">
                        <h3 class="year">{{ item.year }}/{{ item.month }}</h3>
                        <div class="infoItem">{{ item.tag }}</div>
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

let logs = ref([
    {
        year: 2014,
        month: '3',
        tag: "成立xxx品牌"
    },
    {
        year: 2014,
        month: '6',
        tag: "成立xxx品牌"
    },
    {
        year: 2014,
        month: '8',
        tag: "成立xxx品牌"
    },
    {
        year: 2014,
        month: '9',
        tag: "成立xxx品牌"
    },
])

</script>
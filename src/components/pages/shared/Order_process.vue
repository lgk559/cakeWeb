<template>
    <div>
        <!-- 訂單流程提示 -->
        <div class="step my-md-4 my-3">
            <div class="item d-flex" :class="{'active':(route.path == '/check/order_cart'),'finish':(route.path == '/check/order_check' || route.path == '/check/order_finish')}" >
                <div class="d-flex flex-column align-items-center">
                    <div class="num">1</div>
                    <div class="txt mt-1">確認商品</div>
                </div>
            </div>
            <div class="item d-flex" :class="{'active':route.path == '/check/order_check','finish':(route.path == '/check/order_finish')}">
                <div class="line"></div>
                <div class="d-flex flex-column align-items-center">
                    <div class="num">2</div>
                    <div class="txt mt-1">填寫資料&付款方式</div>
                </div>
            </div>
            <div class="item d-flex" :class="{'active':route.path == '/check/order_finish'}">
                <div class="line"></div>
                <div class="d-flex flex-column align-items-center">
                    <div class="num">3</div>
                    <div class="txt mt-1">訂單成立</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

</script>
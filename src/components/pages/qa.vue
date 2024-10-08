<template>
    <div class="page-inner">
        <h3 class="text-center mt-5 mb-3">購物需知</h3>
        <div class="accordion p-3" id="qaBox">
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne">
                        保存方式、賞味期限?
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-headingOne" data-bs-parent="#qaBox">
                    <div class="accordion-body">
                        包裝上印有製造日期，建議您拿到餐點後盡快食用完畢。商品皆需冷藏保守，或是冷凍可加長保守期限。<br>
                        詳細保存參考:<br>
                        <ul>
                            <li>冷藏可保存 3 天。</li>
                            <li>冷凍可保存 5 天。</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree">
                        食用方式?
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingThree" data-bs-parent="#qaBox">
                    <div class="accordion-body">
                        <ul>
                            <li>冷藏商品取出即可食用。</li>
                            <li>冷凍取出後，室溫退冰 5-10 分鐘後可直接食用。</li>
                            <li>為保食物最佳賞味期，建議拆封後請盡速食用完畢。</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo">
                        配送方式?
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingTwo" data-bs-parent="#qaBox">
                    <div class="accordion-body">
                        目前僅提供門市取貨 & 宅配。
                        <ul>
                            <li>如果要門市取貨，請到貨時會電話通知您，請參考我們的<router-link class="text-brown" to="/store">門市據點</router-link>選擇取貨。</li>
                            <li>如果為宅配，出貨後約等候1~3工作天(不含假日)物流期間到貨唷！</li>
                        </ul>
                        <br>
                        <br>
                        
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue'
</script>
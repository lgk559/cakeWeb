<template>
    <Navbar>
        <li class="nav-item"  >
            <a class="nav-link text-success" href="#" @click.prevent="openModal(true)">
                建立優惠券
            </a>
        </li>
    </Navbar>
    <div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">優惠券名稱</th>
                    <th scope="col">優惠折數</th>
                    <th scope="col">優惠碼</th>
                    <th scope="col">是否啟用</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in coupons" :key="item.due_date">
                    <td>{{ item.title }}</td>
                    <td>{{ item.percent }}</td>
                    <td>{{item.code }}</td>
                    <td>
                        <span v-if="item.is_enabled">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td><button @click="openModal(false, item)">修改或刪除</button></td>
                </tr>
            </tbody>
        </table>
        <!-- Modal -->
        <div ref="modalEle_coupon" class="modal fade" id="couponModal" tabindex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>{{ isNew ? '新增優惠券' : '編輯優惠券' }}</span>
                        </h5>
                        <button type="button" class="btn-close text-light" data-bs-dismiss="modal" aria-label="Close">
                            <!-- <span aria-hidden="true">&times;</span> -->
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="title">標題</label>
                                    <input type="text" class="form-control" id="title" v-model="coupon.title"
                                        placeholder="請輸入標題">
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="percent">優惠折數</label>
                                        <input type="text" class="form-control" id="percent"
                                            v-model.number="coupon.percent" placeholder="請輸入優惠折數">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="code">優惠碼</label>
                                        <input type="unit" class="form-control" id="code" v-model="coupon.code"
                                            placeholder="請輸入優惠碼">
                                    </div>
                                </div>                                              
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" v-model="coupon.is_enabled"
                                            :true-value="1" :false-value="0" id="is_enabled">
                                        <label class="form-check-label" for="is_enabled">
                                            是否啟用
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger me-auto" data-bs-toggle="modal"
                            data-bs-target="#delProductModal">
                            刪除
                        </button>
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
                        <button id="couponModal_btn" type="button" class="btn btn-primary"
                            @click="updateCoupon">
                            <i class="fas fa-spinner fa-spin" v-if="status.dataUploading"></i>
                            確認
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div ref="modalEle_del" class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>刪除產品</span>
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <!-- <span aria-hidden="true">&times;</span> -->
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除
                        <strong class="text-danger">{{ coupon.title }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-danger" @click="delProduct">
                            <i class="fas fa-spinner fa-spin" v-if="status.dataUploading"></i>
                            確認刪除
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,reactive, onMounted,onBeforeMount } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import axios from 'axios'
import emitter from '*/EventBus.js'
import { Modal } from "bootstrap";
import Navbar from '*/components/amin/shared/Navbar.vue'
const router = useRouter()
const coupons = ref([])
const coupon = ref({})
const pagination = ref()
const isNew = ref(false)

const modalEle_coupon = ref(null); // 連結到實際的 DOM 元素
const modalEle_del = ref(null); // 連結到實際的 DOM 元素
let thisModalObj_coupon = null; // 存放boostrap的new Modal(modalEle_product.value);
let thisModalObj_del = null; // 存放boostrap的new Modal(modalEle_del.value);

let status = ref({
    dataUploading: false,
})

function getOffers(){
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/admin/coupons`
    axios.get(api).then((response) => {
        console.log(response.data)
        if(response.data.success){
            coupons.value = response.data.coupons
            pagination.value = response.data.pagination
            emitter.emit('pagination:init',pagination.value);
        }else {
            console.log("未登入")
            router.replace('/')
        }
    })
}
function openModal(isNew_value, item) {
    if (isNew_value) {
        coupon.value = {}
        isNew.value = true
    } else {
        //
        // coupon.value = item; // 會有傳參考的特性
        coupon.value = Object.assign({}, item)  //ES6的方法，將item存到空的{}裡。
        isNew.value = false;
    }
    thisModalObj_coupon.show();
}
function updateCoupon(){
    status.value.dataUploading = true;
    let api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/admin/coupon`;
    let httpMethod = "post"

    if (!isNew.value) {
        api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/admin/coupon/${coupon.value.id}`
        httpMethod = "put"
    }
    axios[httpMethod](api, { data: coupon.value }).then((response) => {
        if (response.data.success) {
            status.value.dataUploading = false;
            thisModalObj_coupon.hide();
            getOffers()
        } else {
            status.value.dataUploading = false;
            thisModalObj_coupon.hide();
            getOffers()
            emitter.emit('messagepush', '新增優惠券失敗', 'warning');
        }
    })
}
function delProduct() {
    status.value.dataUploading = true;
    let api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/admin/coupon/${coupon.value.id}`
    let httpMethod = "delete"
    axios[httpMethod](api).then((response) => {
        if (response.data.success) {
            status.value.dataUploading = false;
            thisModalObj_del.hide();
            getOffers()
        } else {
            status.value.dataUploading = false;
            thisModalObj_del.hide();
            getOffers()
            emitter.emit('messagepush', '刪除優惠券失敗', 'warning');
        }
    })
}
onMounted(() => {
    thisModalObj_coupon = new Modal(modalEle_coupon.value);
    thisModalObj_del = new Modal(modalEle_del.value);

});
onBeforeMount(()=>{
    getOffers()
    emitter.on('pagination:chage', (page) => {
        getOffers(page)
    });
})

</script>
<template>
    <Navbar>
        <li class="nav-item"  >
            <a class="nav-link text-success" href="#" @click.prevent="openModal(true)">
                建立新產品
            </a>
        </li>
    </Navbar>
    <loading v-model:active="isLoading" />

    <div class="p-3 pt-0">
        <!-- <button class="p-r-right">建立新產品</button> -->
        
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">分類</th>
                    <th scope="col">商品名</th>
                    <th scope="col">庫存</th>
                    <th scope="col">單位</th>
                    <th scope="col">原價</th>
                    <th scope="col">活動價</th>
                    <th scope="col">狀態</th>
                    <th scope="col">管理</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in products" :key="item.id">
                    <th scope="row">{{ item.category }}</th>
                    <td>{{ item.title }}</td>
                    <td>{{ item.num }}</td>
                    <td>{{ item.unit }}</td>
                    <td>{{ $currency.currencyUSD(item.origin_price) }}</td>
                    <td>{{ $currency.currencyUSD(item.price) }}</td>
                    <td>
                        <span v-if="item.is_enabled">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td><button @click="openModal(false, item)">修改或刪除</button></td>
                </tr>
            </tbody>
        </table>
        <Pagination/>

        <!-- Modal -->
        <div ref="modalEle_product" class="modal fade" id="productModal" tabindex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>{{ isNew ? '新增產品' : '編輯產品' }}</span>
                        </h5>
                        <button type="button" class="btn-close text-light" data-bs-dismiss="modal" aria-label="Close">
                            <!-- <span aria-hidden="true">&times;</span> -->
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="image">輸入圖片網址</label>
                                    <input type="text" class="form-control" id="image" v-model="tempProduct.imageUrl"
                                        placeholder="請輸入圖片連結">
                                </div>
                                <div class="form-group">
                                    <label for="customFile">或 上傳圖片
                                        <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                                        <i class="fa-solid fa-triangle-exclamation" v-if="status.fileUploadError"></i>
                                    </label>
                                    <input type="file" id="customFile" class="form-control"
                                        @change="uploadFile($event)">
                                </div>
                                <img :src="tempProduct.imageUrl" class="img-fluid" alt="">
                            </div>
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="title">標題</label>
                                    <input type="text" class="form-control" id="title" v-model="tempProduct.title"
                                        placeholder="請輸入標題">
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="category">分類</label>
                                        <input type="text" class="form-control" id="category"
                                            v-model="tempProduct.category" placeholder="請輸入分類">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">單位</label>
                                        <input type="unit" class="form-control" id="unit" v-model="tempProduct.unit"
                                            placeholder="請輸入單位">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="origin_price">原價</label>
                                        <input type="number" class="form-control" id="origin_price"
                                            v-model="tempProduct.origin_price" placeholder="請輸入原價">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">售價</label>
                                        <input type="number" class="form-control" id="price" v-model="tempProduct.price"
                                            placeholder="請輸入售價">
                                    </div>
                                </div>
                                <hr>

                                <div class="form-group">
                                    <label for="description">產品描述</label>
                                    <textarea type="text" class="form-control" id="description"
                                        v-model="tempProduct.description" placeholder="請輸入產品描述"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="content">說明內容</label>
                                    <textarea type="text" class="form-control" id="content"
                                        v-model="tempProduct.content" placeholder="請輸入產品說明內容"></textarea>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" v-model="tempProduct.is_enabled"
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
                        <button id="productModal_btn" type="button" class="btn btn-primary"
                            @click="updateProduct">確認</button>
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
                        <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-danger" @click="delProduct">確認刪除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount, getCurrentInstance } from 'vue';
import Navbar from '*/components/amin/shared/Navbar.vue'
import  Pagination from '*/components/amin/shared/Pagination.vue';

import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { Modal } from "bootstrap";
import $ from "jquery";


window.$ = $;
// const { ctx } = getCurrentInstance()
// const vm = ctx
import emitter from '*/EventBus.js'

const router = useRouter()
const isNew = ref(false)
const products = ref([])
const pagination = ref()
const tempProduct = ref({})
const modalEle_product = ref(null); // 連結到實際的 DOM 元素
const modalEle_del = ref(null); // 連結到實際的 DOM 元素
let thisModalObj_product = null; // 存放boostrap的new Modal(modalEle_product.value);
let thisModalObj_del = null; // 存放boostrap的new Modal(modalEle_del.value);
let isLoading = ref(false)
let status = ref({
    fileUploading: false,
    fileUploadError: false
})

function getProducts(page = 1) {
    isLoading.value = true;
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/products?page=${page}`
    axios.get(api).then((response) => {
        if (response.data.success) {
            isLoading.value = false;
            products.value = response.data.products
            pagination.value = response.data.pagination
            emitter.emit('pagination:init', pagination.value);
        } else {
            emitter.emit('messagepush', ['需登入', 'danger']);
            router.replace('/')
        }
    })
}

function updateProduct() {
    let api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/admin/product`;
    let httpMethod = "post"

    if (!isNew.value) {
        api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/admin/product/${tempProduct.value.id}`
        httpMethod = "put"
    }
    axios[httpMethod](api, { data: tempProduct.value }).then((response) => {
        if (response.data.success) {
            thisModalObj_product.hide();
            getProducts()
        } else {
            thisModalObj_product.hide();
            getProducts()
            emitter.emit('messagepush', ['新增產品失敗', 'danger']);
        }
    })
}
function openModal(isNew_value, item) {
    if (status.value.fileUploadError) { status.value.fileUploadError = false; }
    if (isNew_value) {
        tempProduct.value = {}
        isNew.value = true
    } else {
        //
        // tempProduct.value = item; // 會有傳參考的特性
        tempProduct.value = Object.assign({}, item)  //ES6的方法，將item存到空的{}裡。
        isNew.value = false
    }
    thisModalObj_product.show();
}
function delProduct() {
    let api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/admin/product/${tempProduct.value.id}`
    let httpMethod = "delete"
    axios[httpMethod](api).then((response) => {
        if (response.data.success) {
            thisModalObj_del.hide();
            getProducts()
        } else {
            thisModalObj_del.hide();
            getProducts()
            emitter.emit('messagepush', ['刪除產品失敗', 'danger']);
        }
    })
}
function uploadFile($event) {
    const target = $event.target
    const uploadedFile = target.files[0]
    if (target && target.files) {
        status.value.fileUploading = true;
        const formData = new FormData();
        formData.append('file-to-upload', uploadedFile)
        const url = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/admin/upload`
        let httpMethod = "post"
        axios[httpMethod](url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.data.success) {
                status.value.fileUploading = false;
                tempProduct.value.imageUrl = response.data.imageUrl
            } else {
                status.value.fileUploading = false;
                status.value.fileUploadError = true;
                emitter.emit('message:push', [response.data.message, 'danger']);
            }
        })
    }

}
onMounted(() => {
    thisModalObj_product = new Modal(modalEle_product.value);
    thisModalObj_del = new Modal(modalEle_del.value);

});
onBeforeMount(() => {
    getProducts()
    emitter.on('pagination:chage', (page) => {
        getProducts(page)
    });
})
</script>
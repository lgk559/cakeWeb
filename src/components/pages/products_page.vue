<template>
  <loading v-model:active="isLoading" />
  <div class="container position-relative">
    <div class="row">
      <div class="col-5">
        <img :src="productdData.imageUrl" class="img-fluid">
      </div>
      <div class="col-7 py-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
            <li class="breadcrumb-item"><router-link to="/shopping">產品資訊</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">{{productdData.title}}</li>
          </ol>
         
        </nav>
        <h3 class="d-flex align-items-center">{{ productdData.title }} <span
            class="h5 m-0 ms-3 badge text-gold bg-brown">{{ productdData.category }}</span></h3>
        <p>{{ productdData.content }}</p>
        <p>{{ productdData.description }}</p>
        <hr>
        <div class="d-flex">
          <div class="col-auto">售價：{{ productdData.price }}</div>
          <div scope="col-auto" class="d-flex">
            <button type="button" class="btn btn-primary rounded-0 rounded-start">+</button>
            <input type="txt" class="form-control rounded-0 text-center" value="1">
            <button type="button" class="btn btn-primary rounded-0 rounded-end">-</button>
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
              :disabled="status.productChangeToCart || status.productLoading == productdData.id" @click=addtoCart(productdData.id)>
              <i class="fas fa-spinner fa-spin" v-if="status.productChangeToCart == productdData.id"></i>
              <!-- 加到購物車 -->
              <i class="fa-solid fa-cart-shopping"></i> 加入購物車
            </button>
          </div>
        </div>
      </div>

      <!-- <div class="row">
        <div class="col-md-6 my-auto">
          <div class="product-details-pic">
            <img
              :src="productdData.imageUrl"
              class="img-fluid"></div>
        </div>
        <div class="col-md-6">
          <div class="product-details-content"><span class="py-3 text-primary"><a href="#/products" class="text-primary">
                產品專區</a>/熱門</span>
            <div class="text-left my-5">
              <h1> 冰咖啡 </h1>
            </div>
            <p>冰咖啡是許多冰冷咖啡的總稱，冰摩卡咖啡與冰拿鐵是最常見的兩種。</p>
          </div>
          <div class="product-details-function mb-5">
            <div class="product-details-price mt-5"><span class="mr-5">售價： 50 </span>
              <div class="d-flex"><button class="btn btn-sm btn-right disabled" control-id="ControlID-1"> -
                </button><input maxlength="3" type="text" class="text-center btn-input" control-id="ControlID-2"><button
                  class="btn btn-sm btn-left" control-id="ControlID-3"> + </button></div>
            </div>
            <div class="product-details-cart text-left mt-5"><button class="btn" control-id="ControlID-4"> 加到購物車 </button>
            </div>
          </div>
        </div>
        <div class="text-center w-100 py-5">
          <img
          :src="productdData.imageUrl"
          class="img-fluid">
        </div>
      </div> -->

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const productdData = ref({})
const carts = ref([]);

let isLoading = ref(false);
let status = ref({
    productLoading: '',
    productChangeToCart: '',
});

function addtoCart(id, qty = 1) {
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/cart`;
    status.value.productChangeToCart = id;
    // console.log(id, qty)
    axios.post(api, { data: { "product_id": id, "qty": qty } }).then((response) => {
        // console.log(response.data)
        if (response.data.success) {
            status.value.productChangeToCart = '';
            // thisModalObj_product.hide();
            getCart();
        }
    })
}

function getCart() {
    const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/cart`;
    axios.get(api).then((response) => {
        // console.log(response.data)
        if (response.data.success) {
            carts.value = response.data.data;
        }
    })
}

onMounted((e) => {
  isLoading.value = true;
  const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/product/${route.params.id}`;
  axios.get(api).then((response) => {
    if (response.data.success) {
      productdData.value = response.data.product;
      isLoading.value = false;
    }
  })
})

</script>

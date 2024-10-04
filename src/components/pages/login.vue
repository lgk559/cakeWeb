<template>

    <div id="login" class="loginBox">
        <div class="login">
            <h1 class="t-center">廠商登入</h1>
            <div class="main t-center">
                <div class="item_account">
                    <span class="input_title">帳號</span>
                    <input id="account" type="text" class="form-control" placeholder="請輸入電子信箱"
                        :class="{ 'failure': !RegExpInfo.account }" v-model="accountData.username"
                        @blur="RegExp_account">
                    <span class="failureInfo" v-if="!RegExpInfo.account">請輸入正確</span>
                </div>
                <div class="item_password">
                    <span class="input_title">密碼</span>
                    <input id="password" class="form-control" placeholder="請輸入6~15英數組成的密碼" size="33" maxlength="15"
                        :class="{ 'failure': !RegExpInfo.password }" :type="passwordType ? 'password' : 'text'"
                        v-model="accountData.password" @blur="RegExp_passwordt" @keyup.enter="loginConfirm">
                    <span class="eye" @click="passwordType = !passwordType">
                        <img :src="passwordType ? eyeImg.password : eyeImg.txt" alt="">
                    </span>
                    <span class="failureInfo" v-if="!RegExpInfo.password">不可包含符號、長度需6字元以上</span>
                </div>
            </div>
            <button class="p-r-center" @click="loginConfirm">登入</button>
            <button class="close" @click="isShowLogin">
                X
            </button>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'


import axios from 'axios'

// const route = useRoute()

const emits = defineEmits(['change'])
const router = useRouter()
const isShowRegister = ref(false)
const accountData = ref({
    username: '',
    password: ''
})
const RegExpInfo = ref({
    account: true,
    password: true,
})
const passwordType = ref(true)
const eyeImg = ref({
    'password': '/assets/images/visibility_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg',
    'txt': '/assets/images/visibility_off_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg'
})

function RegExp_account() {
    if (accountData.value.account == '') {
        return true
    } else {
        let regex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
        RegExpInfo.value.account = regex.test(accountData.value.username) ? true : false
    }
}
function RegExp_passwordt() {
    ///^([a-zA-Z0-9][^@\s][^@\u4e00-\u9fa5]|0\d+)$/
    // 可輸入符號、數字、英文
    let regex = new RegExp(/^([a-zA-Z0-9]{6,15}|0\d+)$/)
    RegExpInfo.value.password = regex.test(accountData.value.password) ? true : false
}

function loginConfirm() {
    const vm = this;
    const api = `${import.meta.env.VITE_APIPATH}/admin/signin`
    const plainObject = { ...accountData.value };
    axios.post(api, plainObject).then((response) => {
        const token = response.data.token;
        const expired = response.data.expired;
        // console.log(response.data)
        // console.log(token)
        // console.log(new Date(expired))
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
        router.push('/admin/products')
    })
    

}
function isShowLogin(){
    emits('change', false)
}



onBeforeMount(() => {

})

onMounted((e) => {

})



</script>

import { createApp } from 'vue'
import './style.scss'

// 載入 vue-axios
import axios from 'axios';
import VueAxios from 'vue-axios';
axios.defaults.withCredentials = true; // 解決CORS 跨域問題

// 使用 vue-loading-overlay
import loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import App from './App.vue'
import router from './router/index.js'

// filters
import currencyFilter from './filters/currency.js'
import dataFilter from './filters/data.js'

// 引入 VeeValidate 元件跟功能
import {Field, Form, ErrorMessage, defineRule, configure,} from 'vee-validate';

import { all } from '@vee-validate/rules';
Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule);
});

// 引入 VeeValidate 的 i18n 功能
import { localize, setLocale } from '@vee-validate/i18n';
// 引入 VeeValidate 的繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
  
// 將當前 VeeValidate 的語系設定為繁體中文
configure({
generateMessage: localize({ zh_TW: zhTW }),
validateOnInput: true,
});
setLocale('zh_TW');
const app = createApp(App)
app.use(router).use(VueAxios, axios)
app.component('Loading', loading)

// 掛載 Global 的 VeeValidate 元件
app.component('VField', Field);
app.component('VForm', Form);
app.component('ErrorMessage', ErrorMessage);

app.config.globalProperties.$currency =  currencyFilter
app.config.globalProperties.$mydata =  dataFilter

app.mount('#app')

router.beforeEach((to, from, next) => {
    // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    // else next()
    if (to.meta.requiresAuth) {
        // console.log("這裡需驗證")
        const api = `${import.meta.env.VITE_APIPATH}/api/user/check`
        axios.post(api).then((response) => {
            if(response.data.success){
                // console.log("登入成功")
                next()
            }else{
                // console.log("!登入")
                next({
                    path: "/login"
                })
            }

        })
    } else {
        next()
    }
})
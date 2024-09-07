// import { createRouter, createWebHistory } from 'vue-router' // 需配合後端將路由指向index.html
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // {
  //   path: "/:pathMatch(.*)",
  //   redirect: 'login'
  // },
  {
    path: "/:pathMatch(.*)",
    redirect: 'index'
  },
  {
    // 首頁
    // path: "/",
    // name: "home",
    // component: () => import("*/components/layout/Dashboard.vue"),
    // redirect:'customer_order',
  },
  {
    // 顧客頁面
    path: "/",
    name: "home",
    component: () => import("*/components/layout/page.vue"),
    // component: () => import("*/components/pages/test.vue"),
    children: [
      {
        path: "/",
        name: "index",
        component: () => import("*/components/pages/Home.vue"),
      },
      {
        path: "/shopping",
        name: "shopping",
        component: () => import("*/components/pages/Shopping.vue"),
      }
    ]
  },
  {
    name: 'Dashboard',
    path: '/admin',
    component: () => import("*/components/layout/Dashboard.vue"),
    children: [
      {
        path: "products",
        name: "products",
        component: () => import("*/components/amin/Products.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "order",
        name: "order",
        component: () => import("*/components/amin/Order.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "offer",
        name: "offer",
        component: () => import("*/components/amin/Offer.vue"),
        meta: { requiresAuth: true },
      },
    ]
  },
  
  {
    path: "/page/:id",
    name: "page",
    component: () => import("*/components/pages/page.vue")
  },
  {
    // 企業登入
    path: "/login",
    name: "login",
    component: () => import("*/components/pages/login.vue")
  },
  {
    // 模擬訂單(可以用相同Dashboard模版，但路徑不是掛在admin下)
    name: 'Dashboard_Custome',
    path: '/',
    component: () => import("*/components/layout/Dashboard.vue"),
    children: [
      {
        path: "customer_order",
        name: "CustomerOrder",
        component: () => import("*/components/pages/CustomerOrder.vue"),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
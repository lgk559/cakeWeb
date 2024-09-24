// import { createRouter, createWebHistory } from 'vue-router' // 需配合後端將路由指向index.html
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [

  {
    path: "/:pathMatch(.*)",
    redirect: 'index'
  },
  {
    // 顧客頁面
    path: "/",
    name: "home",
    component: () => import("*/components/layout/page.vue"),
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
      },
      {
        path: "/page/:id",
        name: "page",
        component: () => import("*/components/pages/products_page.vue"),
      },
      {
        path: "/brand",
        name: "brand",
        component: () => import("*/components/pages/brand.vue"),
      },
      {
        path: "/purchase",
        name: "purchase",
        component: () => import("*/components/pages/purchase.vue"),
      },
      {
        path: "/check",
        name: "check",
        component: () => import("*/components/pages/check.vue"),
        children: [
          {
            path: "order_cart",
            name: "order_cart",
            component: () => import("*/components/pages/check_cart.vue"),
          },
          {
            path: "order_check",
            name: "order_check",
            component: () => import("*/components/pages/check_order_check.vue"),
          },
          {
            path: "order_finish",
            name: "order_finish",
            component: () => import("*/components/pages/check_order_finish.vue"),
          }
        ]
      },
      
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
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/user',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue'),
      },
      {
        path: 'carts',
        component: () => import('../views/CartsView.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/AdminProducts.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/AdminOrders.vue'),
      },
      {
        path: 'coupouns',
        component: () => import('../views/AdminCoupouns.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('../views/SigninView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
});

export default router;

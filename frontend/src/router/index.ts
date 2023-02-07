import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:collection_detail',
      name: 'collection_detail',
      component: () => import('@/views/CollectionDetail.vue')
    },
  ]
})

export default router

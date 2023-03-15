import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  { path: '/index', component: () => import('@/components/index/index.vue') },
  { path: '/archives', component: () => import('@/components/guide/archives.vue') },
  { path: '/categories', component: () => import('@/components/guide/categories.vue') },
  {
    path: '/tags', component: () => import('@/components/guide/tags.vue')
  },
  {
    path: '/tags/:id',
    component: () => import('@/components/guide/tagsbaseGuide.vue'),
    props: true
  },
  {
    path: '/categories/:id',
    component: () => import('@/components/guide/tagsbaseGuide.vue'),
    props: true
  },
  {
    path: '/articles/:id',
    component: () => import('@/components/articleDetails/articleDetails.vue'),
    props: true
  },
  { path: '/404', component: () => import('@/components/404/404.vue') },
  { path: '/friends', component: () => import('@/components/friends/friends.vue') },
  { path: '/albums', component: () => import('@/components/albums/albums.vue') },
  { path: '/links', component: () => import('@/components/index/index.vue') },
  { path: '/resources', component: () => import('@/components/resources/resources.vue') },
  { path: '/about', component: () => import('@/components/about/about.vue') },
  { path: '/messages', component: () => import('@/components/messages/messages.vue') },
  { path: '/login', component: () => import('@/components/login/login.vue') },
  { path: '/forget', component: () => import('@/components/login/forget.vue') },
  { path: '/center', component: () => import('@/components/center/center.vue') }
]
const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  let token = $cookies.get('token')
  if (to.path === '/center' && token===null) {
    next('/login')
  } else {
    next()
  }
})
// router.beforeResolve((to, from, next) => {

// })
export default router

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [{
        path: '/one',
        name: 'one',
        component: () => import('@/components/correspond/one/section.vue')
      }, {
        path: '/3',
        name: '3',
        component: () => import('@/components/correspond/3/A.vue')
      }, {
        path: '/C',
        name: 'C',
        component: () => import('@/components/correspond/3/C.vue')
      }, {
        path: '/eventBus',
        name: 'eventBus',
        component: () => import('@/components/correspond/eventBus/index.vue')
      }, {
        path: '/8',
        name: '8',
        component: () => import('@/components/correspond/8/app.vue')
      }]
    }
  ]
})

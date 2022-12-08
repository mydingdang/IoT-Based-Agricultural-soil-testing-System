import {createRouter, RouteRecordRaw, createWebHashHistory} from 'vue-router'
import HomeView from './views/Home.vue'
import { routerTargetName } from './reactiveConsts'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/intro',
        name: 'intro',
        component: () => import('./views/intro.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('./views/dashboard.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from) => {
    routerTargetName.value = to.name as string
})

export default router

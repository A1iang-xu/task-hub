import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: {title: '登录', requiresAuth: false}
    },
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: {title: '仪表盘', requiresAuth: true,breadcrumb: '首页'}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true'
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
    }
    else if (to.path === '/login' && isAuthenticated) {
        next('/')
    }
    else {
        next()
    }  
})

export default router
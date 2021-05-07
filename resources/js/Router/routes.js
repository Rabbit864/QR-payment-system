const ifNotAuthenticated = (to, from, next) => {
    const vuex = localStorage.getItem('vuex');
    if (!JSON.parse(vuex).token) {
        next();
        return;
    }
    next('/dashboard');
}


const routes = [
    {
        path: '/',
        component: () => import('../Pages/Login.vue'),
        name: 'login',
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/auth/:provider/callback',
        redirect: 'dashboard'

    },
    {
        path: '/dashboard',
        component: () => import('../Pages/Dashboard.vue'),
        name: 'dashboard'
    },
    {
        path: '/showcase',
        component: () => import('../Pages/Showcase.vue'),
        name: 'showcase'
    },
    {
        path: '/products/:id',
        component: () => import('../Pages/CardProduct.vue'),
        name: 'cardProduct'
    }
];

export default routes;

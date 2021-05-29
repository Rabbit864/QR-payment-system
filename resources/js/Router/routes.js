import store from '../Store/index';

const ifNotAuthenticated = (to, from, next) => {
    if (!store.state.token) {
        next();
        return;
    }
    next('/dashboard');
}

const ifAuthenticated = (to, from, next) => {
    if (store.state.token) {
        next();
        return;
    }
    next('/');
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
        name: 'dashboard',
        beforeEnter: ifAuthenticated
    },
    {
        path: '/showcase',
        component: () => import('../Pages/Showcase.vue'),
        name: 'showcase',
        beforeEnter: ifAuthenticated
    }
];

export default routes;

const routes = [
    {
        path: '/',
        component: () => import('../Pages/Login.vue'),
        name: 'login'
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
];

export default routes;

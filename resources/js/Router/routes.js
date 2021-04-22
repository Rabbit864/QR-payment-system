

const ifNotAuthenticated = (to, from, next) => {
    if (!localStorage.getItem('token')) {
      next()
      return
    }
    next('/dashboard')
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
];

export default routes;

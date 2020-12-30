import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Template from '../components/Template/Template.vue';
import Index from '../views/Index.vue';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        component: Template,
        children: [
            {
                path: '/index',
                name: 'index',
                title: '首页',
                component: Index
            },
            {
                path: '/cw',
                title: '财务管理',
                children: [
                    {
                        path: '/category',
                        name: 'category',
                        title: '收支项',
                        component: Index
                    },
                    {
                        path: '/record',
                        name: 'record',
                        title: '收支记录',
                        component: Index
                    }
                ]
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Template from '../components/Template/Template.vue';
import Index from '../views/Index.vue';
import CWCategory from '../views/finance/CWCategory.vue';
import CWRecord from '../views/finance/CWRecord.vue';
import JSRecord from '../views/bodybuilding/JSRecord.vue';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        hidden: true,
        component: Login
    },
    {
        path: '/',
        component: Template,
        children: [
            {
                path: '/index',
                name: 'index',
                title: '首页',
                component: Index
            }
        ]
    },
    {
        path: '/',
        title: '财务管理',
        component: Template,
        children: [
            {
                path: '/cwcategory',
                name: 'cwcategory',
                title: '收支项',
                component: CWCategory
            },
            {
                path: '/cwrecord',
                name: 'cwrecord',
                title: '收支记录',
                component: CWRecord
            },
            {
                path: '/jsrecord',
                name: 'jsrecord',
                title: '身材记录',
                component: JSRecord
            }
        ]
    },
    {
        path: '*',
        name: 'error',
        hidden: true,
        component: Index
    }
];

const router = new VueRouter({
    routes
});

export default router;

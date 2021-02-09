import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Template from '../components/Template/Template.vue';
import Index from '../views/Index.vue';

import User from '../views/system/User.vue';

import CWCategory from '../views/finance/CWCategory.vue';
import CWRecord from '../views/finance/CWRecord.vue';
import CWtotalAssets from '../views/finance/CWtotalAssets.vue';
import CWFund from '../views/finance/CWFund.vue';
import CWMonthlySummary from '../views/finance/CWMonthlySummary.vue';
import CWQuarterlySummary from '../views/finance/CWQuarterlySummary.vue';
import CWAnnualSummary from '../views/finance/CWAnnualSummary.vue';

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
        component: Template,
        children: [
            {
                path: '/user',
                name: 'user',
                title: '用户管理',
                component: User
            }
        ]
    },
    {
        path: '/',
        title: '财务管理',
        component: Template,
        children: [
            {
                path: '/cwtotalAssets',
                name: 'cwtotalAssets',
                title: '总资产',
                component: CWtotalAssets
            },
            {
                path: '/cwfund',
                name: 'cwfund',
                title: '理财基金',
                component: CWFund
            },
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
                path: '/cwmonthlySummary',
                name: 'cwmonthlySummary',
                title: '月度总结',
                component: CWMonthlySummary
            },
            {
                path: '/cwquarterlySummary',
                name: 'cwquarterlySummary',
                title: '季度总结',
                component: CWQuarterlySummary
            },
            {
                path: '/cwannualSummary',
                name: 'cwannualSummary',
                title: '年度总结',
                component: CWAnnualSummary
            }
        ]
    },
    {
        path: '/',
        title: '健身管理',
        component: Template,
        children: [
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

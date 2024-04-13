import { createRouter, createWebHistory } from "vue-router";

import Login from '@/pages/User/LoginPage.vue'
import UserMain from '@/pages/User/MainPage.vue'
import MsgList from '@/pages/Msg/MsgListPage.vue'
import MsgAdd from '@/pages/Msg/MsgAddPage.vue'
import MsgView from '@/pages/Msg/MsgViewPage.vue'
import PatientMain from '@/pages/Patient/PatientMain.vue'
import HealthList from '@/pages/Patient/HealthListPage.vue'
import HealthView from '@/pages/Patient/HealthViewPage.vue'
import HealthAdd from '@/pages/Patient/HealthAddPage.vue'

const router = createRouter( {
    history: createWebHistory(),
    routes: [
        {
            path : '/',
            name : 'Login',
            component : Login
        },
        {
            path : '/user/main',
            name : 'UserMain',
            component : UserMain
        },
        {
            path : '/msg/list',
            name : 'MsgList',
            component : MsgList
        },
        {
            path : '/msg/add',
            name : 'MsgAdd',
            component : MsgAdd
        },
        {
            path : '/msg/view/:id',
            name : 'MsgView',
            component : MsgView
        },
        {
            path : '/patient/main',
            name : 'PatientMain',
            component : PatientMain
        },   
        {
            path : '/patient/health/list',
            name : 'HealthList',
            component : HealthList

        },
        {
            path : '/patient/health/view/:id',
            name : 'HealthView',
            component : HealthView
        },
        {
            path : '/patient/health/add',
            name : 'HealthAdd',
            component : HealthAdd
        }
    ]
})


export default router;
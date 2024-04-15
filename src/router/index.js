import { createRouter, createWebHistory } from "vue-router";

import Login from "@/pages/User/LoginPage.vue";
import UserMain from "@/pages/User/MainPage.vue";
import MsgList from "@/pages/Msg/MsgListPage.vue";
import MsgAdd from "@/pages/Msg/MsgAddPage.vue";
import MsgView from "@/pages/Msg/MsgViewPage.vue";
import PatientMain from "@/pages/Patient/PatientMain.vue";
import HealthList from "@/pages/Patient/HealthListPage.vue";
import HealthView from "@/pages/Patient/HealthViewPage.vue";
import HealthAdd from "@/pages/Patient/HealthAddPage.vue";
import ExamAdd from "@/pages/Patient/ExamAddPage.vue";
import ExamView from "@/pages/Patient/ExamViewpage.vue";
import Find from "@/pages/User/FindPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/find",
      name: "Find",
      component: Find,
    },
    {
      path: "/user/main",
      name: "UserMain",
      component: UserMain,
    },
    {
      path: "/msg/list",
      name: "MsgList",
      component: MsgList,
    },
    {
      path: "/msg/add",
      name: "MsgAdd",
      component: MsgAdd,
    },
    {
      path: "/msg/view",
      name: "MsgView",
      component: MsgView,
    },
    {
      path: "/patient/main",
      name: "PatientMain",
      component: PatientMain,
    },
    {
      path: "/patient/health/list",
      name: "HealthList",
      component: HealthList,
    },
    {
      path: "/patient/health/view/:id",
      name: "HealthView",
      component: HealthView,
    },
    {
      path: "/patient/health/add",
      name: "HealthAdd",
      component: HealthAdd,
    },

    {
      path: "/patient/exam/add",
      name: "ExamAdd",
      component: ExamAdd,
    },

    {
      path: "/patient/exam/view",
      name: "ExamView",
      component: ExamView,
    },
  ],
});

export default router;

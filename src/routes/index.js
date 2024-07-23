import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../pages/Home.vue";

export default createRouter({
  // hash모드 : 특정 페이지에서 새로고침 시, '페이지를 찾을 수 없음'과 같은 메시지 알림을 방지
  history: createWebHashHistory(),
  // pages : page를 구분해주는 개념
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    }
  ],
});
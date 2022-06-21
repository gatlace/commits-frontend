import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ReposView from "../views/ReposView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/repos",
    name: "repos",
    component: ReposView,
    children: [
      {
        path: "",
        name: "main-list",
        component: () => import("../components/ReposGrid.vue"),
      },
      {
        path: ":user",
        component: () => import("../components/ReposGrid.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/repos/:user",
    name: "repos-user",
    component: ReposView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/repos",
    name: "repos",
    component: () => import("../views/ReposView.vue"),
    children: [
      {
        path: "",
        name: "main-list",
        component: () => import("../components/ReposList.vue"),
      },
      {
        path: ":user",
        name: "user",
        component: () => import("../components/ReposList.vue"),
        props: true,
      },
      {
        path: ":user/:repo",
        component: () => import("../components/CommitsList.vue"),
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

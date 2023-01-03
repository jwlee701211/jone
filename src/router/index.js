import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/variable",
    name: "variable",
    component: () =>
      import(/* webpackChunkName: "variable" */ "../views/VariableView.vue"),
  },
  {
    path: "/operator",
    name: "operator",
    component: () =>
      import(/* webpackChunkName: "operator" */ "../views/OperatorView.vue"),
  },
  {
    path: "/function",
    name: "function",
    component: () =>
      import(/* webpackChunkName: "function" */ "../views/FunctionView.vue"),
  },
  {
    path: "/class",
    name: "class",
    component: () =>
      import(/* webpackChunkName: "class" */ "../views/ClassView.vue"),
  },
  {
    path: "/object",
    name: "object",
    component: () =>
      import(/* webpackChunkName: "object" */ "../views/ObjectView.vue"),
  },
  {
    path: "/array",
    name: "array",
    component: () =>
      import(/* webpackChunkName: "array" */ "../views/ArrayView.vue"),
  },
  {
    path: "/json",
    name: "json",
    component: () =>
      import(/* webpackChunkName: "json" */ "../views/JsonView.vue"),
  },
  {
    path: "/callback",
    name: "callback",
    component: () =>
      import(/* webpackChunkName: "callback" */ "../views/CallbackView.vue"),
  },
  {
    path: "/promise",
    name: "promise",
    component: () =>
      import(/* webpackChunkName: "promise" */ "../views/PromiseView.vue"),
  },
  {
    path: "/callbackToPromise",
    name: "callbackToPromise",
    component: () =>
      import(
        /* webpackChunkName: "callbackToPromise" */ "../views/CallbackToPromiseView.vue"
      ),
  },
  {
    path: "/async",
    name: "async",
    component: () =>
      import(/* webpackChunkName: "async" */ "../views/AsyncView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

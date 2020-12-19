import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/createTime",
        name: "CreateTime",
        component: () => import(/* webpackChunkName: "about" */ "../views/CreateTime.vue"),
    },
    {
        path: "/projects",
        name: "Projects",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/Projects.vue"),
    },
    {
        path: "/time",
        name: "Time",
        component: () => import(/* webpackChunkName: "about" */ "../views/Time.vue"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;

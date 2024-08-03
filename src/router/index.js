import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("../pages/home/Home.vue")
    },
    {
        path: "/perfil",
        component: () => import("../pages/profile/Profile.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
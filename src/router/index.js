import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("../pages/home/Home.vue")
    },
    {
        path: "/signin",
        component: () => import("../pages/signin/SignIn.vue")
    },
    {
        path: "/escuelas",
        component: () => import("../pages/escuelas/Escuelas.vue")
    },
    {
        path: "/cursos",
        component: () => import("../pages/cursos/Cursos.vue"),
    },
    {
        path: "/cursos/:escuelaId",
        component: () => import("../pages/cursos/CursosListado.vue")
    },
    {
        path: '/cursos/:escuelaId/:cursoId',
        component: () => import('../pages/cursos/CursoDetalle.vue'),
    },
    {
        path: "/alumnos",
        component: () => import("../pages/alumnos/Alumnos.vue")
    },
    {
        path: "/examenes",
        component: () => import("../pages/examenes/Examenes.vue")
    },
    {
        path: "/examen/:id",
        component: () => import("../pages/alumnos/Examen.vue")
    },
    {
        path: "/examenes/examen/:id",
        component: () => import("../pages/examenes/ExamenesDetalle.vue"),
    },
    {
        path: "/examenes/:escuelaId/:cursoId",
        component: () => import("../pages/examenes/ExamenesListado.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
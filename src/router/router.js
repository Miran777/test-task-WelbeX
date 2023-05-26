import { createRouter, createWebHistory } from "vue-router"
import Home from "@/pages/Home"
import Blogs from "@/pages/Blogs"
import Registration from "@/pages/Registration"
import BlogIdPage from "@/pages/BlogIdPage"
import Login from "@/pages/Login"

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/blogs',
        component: Blogs,
    },
    {
        path: '/blogs/:id',
        component: BlogIdPage,
    },
    {
        path: '/registration',
        component: Registration,
    },
    {
        path: '/login',
        component: Login,
    },
]


const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router
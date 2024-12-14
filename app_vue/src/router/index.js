import {createRouter, createWebHistory} from 'vue-router'
import AppLayout from "@/layout/AppLayout.vue";
import LoginPage from "@/pages/LoginPage.vue";
import UsuarioPage from "@/pages/UsuarioPage.vue";
import routes from "./RouterMiddleware.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'usuarios',
          component: UsuarioPage,
          meta: { requiresAuth: true }
        }
      ]
    },
  ]
});

// Middleware de verificação de autenticação
router.beforeEach(routes);

export default router;

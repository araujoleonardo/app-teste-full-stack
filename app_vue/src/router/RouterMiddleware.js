import {useAuthStore} from "../stores/useAuth.js";
import {useRouter} from "vue-router";

export default async function routes(to, from, next) {
  const { checkUser } = useAuthStore();
  const router = useRouter();

  // Se a rota requer autenticação
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      const user = await checkUser();

      if (user) {
        next();
      } else {
        next({ name: 'login' });
        await router.push('/login');
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      await router.push('/login');
    }
  } else {
    next();
  }
}

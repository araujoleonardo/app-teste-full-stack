<script setup>
import LoginForm from "../components/auth/LoginForm.vue";
import { useAuthStore } from "../stores/useAuth.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const { checkUser } = useAuthStore();
const router = useRouter();

const user = ref(null);

onMounted(() => {
  user.value = checkUser();

  if (user.value) {
    router.push('/usuarios');
  }
});
</script>

<template>
  <div>
    <LoginForm />
  </div>
</template>

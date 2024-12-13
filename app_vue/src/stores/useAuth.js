import {reactive, ref} from 'vue';
import { defineStore } from 'pinia';
import api from "../axios/useApi.js";
import router from "../router/index.js";

export const useAuthStore = defineStore('auth', () => {
  const token = ref(sessionStorage.getItem('token'));
  const user = ref(JSON.parse(sessionStorage.getItem('user')));
  const loading = ref(false);
  const form = reactive({
    email: '',
    password: ''
  });

  function setToken(tokenValue){
    sessionStorage.setItem('token', tokenValue);
    token.value = tokenValue;
  }

  function setUser(userValue){
    sessionStorage.setItem('user', JSON.stringify(userValue));
    user.value = userValue;
  }

  const login = () => {
    loading.value = true;

    api.post('/login', form)
      .then((response) => {
        setToken(response.data.token);
        setUser(response.data.user);
        console.log('Login feito com sucesso!');
        router.push({name: 'usuarios'});
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        loading.value = false;
      });
  }

  async function checkUser() {
    if (user.value) {
      return user.value;
    }

    api.get('/user').then((response) => {
      user.value = response.data;
      return response.data;
    }).catch((error) => {
      console.error('Erro ao verificar usuário:', error?.response?.data || error.message);
      user.value = null;
      return null;
    });
  }

  async function checkToken() {
    const tokenAuth = 'Bearer '+ token.value;

    api.get('/auth', {
      headers:{
        Authorization: tokenAuth
      }
    }).then((response) => {
        return response.data;
      }).catch((error) => {
        console.log(error)
      });
  }

  function isAuthenticated() {
    return token.value && user.value;
  }

  function clear(){
    sessionStorage.clear();
    token.value = '';
    user.value = '';
  }

  async function logout() {
    api.post('/logout').then(() => {
      clear();

      window.location.reload();

      router.push({ name: 'login' });
    }).catch ((error) => {
      console.error('Erro no logout:', error?.response?.data || error.message);
    });
  }

  return {
    login,
    form,
    loading,
    token,
    user,
    checkToken,
    checkUser,
    logout,
    isAuthenticated
  };
});

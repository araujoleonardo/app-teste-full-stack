import {reactive, ref} from 'vue';
import { defineStore } from 'pinia';
import api from "@/axios/useApi.js";
import router from "@/router/index.js";
import apiAuth from "@/axios/useApiAuth.js";
import {useToast} from "@/context/useToast.js";

export const useAuthStore = defineStore('auth', () => {
  const { showToast } = useToast();
  const token = ref(sessionStorage.getItem('token'));
  const user = ref(JSON.parse(sessionStorage.getItem('user')));
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
    api.post('/login', form)
      .then((response) => {
        setToken(response.data.token);
        setUser(response.data.user);
        showToast({message: 'Login feito com sucesso!', color: 'success'});
        router.push('/');
      }).catch((error) => {
        showToast({message: 'Erro nas credencias, tente novamente!', color: 'error'});
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
    apiAuth.post('/logout').then(() => {
      clear();

      window.location.reload();

      router.push('/login');
    }).catch ((error) => {
      console.error('Erro no logout:', error?.response?.data || error.message);
    });
  }

  return {
    login,
    form,
    token,
    user,
    checkToken,
    checkUser,
    logout,
    isAuthenticated
  };
});

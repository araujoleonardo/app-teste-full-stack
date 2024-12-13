<script setup>

import {useAuthStore} from "../../stores/useAuth.js";

const {login, form, loading} = useAuthStore();

</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-10 py-20 lg:px-12">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form>
        <div class="my-2">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">E-mail</label>
          <div class="mt-2">
            <input
              id="name"
              v-model="form.email"
              type="text"
              size="large"
              required
              autofocus
            />
          </div>
        </div>

        <div class="my-2">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <input
              id="name"
              v-model="form.password"
              type="password"
              size="large"
              required
            />
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" @click.prevent="login" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>

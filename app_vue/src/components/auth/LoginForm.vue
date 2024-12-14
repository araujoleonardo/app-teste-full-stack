<script setup>

import {useAuthStore} from "@/stores/useAuth.js";

const {login, form, loading} = useAuthStore();

</script>

<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card class="pa-4" style="width: 25rem;">
      <v-card-title class="justify-center">Login</v-card-title>
      <v-card-text>
        <v-form ref="loginForm">
          <v-text-field
            id="email"
            label="E-mail"
            type="email"
            v-model="form.email"
            variant="outlined"
            required
          />
          <v-text-field
            id="password"
            label="Senha"
            type="password"
            v-model="form.password"
            variant="outlined"
            required
          />
          <v-btn
            class="mt-4"
            color="primary"
            block
            @click.prevent="login"
          >
            Entrar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

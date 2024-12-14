<script setup>
import {useAuthStore} from "@/stores/useAuth.js";

const {login, form} = useAuthStore();
</script>

<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card class="pa-4" style="width: 25rem;">
      <v-card-title class="justify-center">Login</v-card-title>
      <v-card-text>
        <v-form ref="loginForm">
          <v-col cols="12">
            <v-text-field
              id="email"
              name="email"
              type="email"
              variant="outlined"
              label="Email"
              v-model="form.email"
              required/>
          </v-col>

          <v-col cols="12">
            <v-text-field
              id="password"
              name="password"
              type="password"
              variant="outlined"
              label="Senha"
              v-model="form.password"
              required/>
          </v-col>
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

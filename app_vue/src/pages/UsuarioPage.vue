<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-toolbar-title>Minha Aplicação</v-toolbar-title>
      <v-btn>Home</v-btn>
      <v-btn>Sobre</v-btn>
      <v-btn>Contato</v-btn>
      <v-spacer></v-spacer>
      <v-btn>Contato</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <h1>Bem-vindo à Minha Aplicação</h1>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>

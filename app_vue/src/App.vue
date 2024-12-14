<script setup>
import { RouterView } from 'vue-router'
import AppToast from "@/components/utilitarios/AppToast.vue";
import AppConfirmDialog from "@/components/utilitarios/AppConfirmDialog.vue";
</script>

<template>
  <RouterView />
  <AppToast/>
  <AppConfirmDialog/>
</template>

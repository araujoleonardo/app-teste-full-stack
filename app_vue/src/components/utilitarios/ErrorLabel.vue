<script setup>
defineProps({
  message: String,
});
</script>

<template>
  <span v-show="message" class="text-caption text-red">
    {{ message }}
  </span>
</template>

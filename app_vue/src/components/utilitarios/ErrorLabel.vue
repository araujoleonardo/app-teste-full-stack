<script setup>
defineProps({
  message: String,
});
</script>

<template>
  <div v-show="message">
    <span class="red-darken-2">
      {{ message }}
    </span>
  </div>
</template>

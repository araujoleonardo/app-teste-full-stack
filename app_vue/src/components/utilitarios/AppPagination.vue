<script setup>
const emit = defineEmits(['submit']);

const props = defineProps({
  data: { type: Object, default: () => ({}) }
});

const emviaEmit = (data) => {
  if (!data) {
    return;
  }
  emit('page', data);
};

const isPrevious = (label) => {
  return label.includes('&laquo;') || label.toLowerCase().includes('previous');
};

const isNext = (label) => {
  return label.includes('&raquo;') || label.toLowerCase().includes('next');
};
</script>

<template>
  <v-row align="center" justify="space-between">
    <v-col cols="auto">
      <span v-if="data">Total de {{ data.total }} registros.</span>
    </v-col>
    <v-col cols="auto">
      <v-btn :color="link.active ? 'blue-darken-2': 'grey-darken-1'"
             :variant="link.active ? 'flat': 'outlined'"
             v-for="(link, k) in data.links"
             :key="k"
             @click="emviaEmit(link.url)">
        <!-- Substitui texto por ícones -->
        <span v-if="isPrevious(link.label)"><font-awesome-icon :icon="['fas', 'chevron-left']" /></span>
        <span v-else-if="isNext(link.label)">
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </span>
        <span v-else v-html="link.label"></span>
      </v-btn>
    </v-col>
  </v-row>


<!--  <div class="flex flex-col md:flex-row items-center justify-between w-full mt-4 space-y-2 md:space-y-0">
    &lt;!&ndash; Texto informativo &ndash;&gt;
    <div class="w-full md:w-auto text-center md:text-left" v-if="data">
      <div class="text-sm text-gray-700 dark:text-white">
        Total de {{ data.total }} registros.
      </div>
    </div>

    &lt;!&ndash; Botões de paginação com scroll horizontal em telas menores &ndash;&gt;
    <div class="flex items-center justify-center w-full md:w-auto overflow-x-auto text-sm">
      <button
        v-for="(link, k) in data.links"
        :key="k"
        class="rounded flex items-center justify-center px-3 h-8 leading-tight border transition-colors duration-150 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-500 dark:hover:bg-gray-700"
        :class="{
          'bg-sky-100 dark:bg-gray-700 text-sky-500 border-sky-500': link.active,
          'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-200 dark:border-gray-700': !link.active
        }"
        @click="emviaEmit(link.url)"
      >
        &lt;!&ndash; Substituir texto pelos ícones &ndash;&gt;
        <span v-if="isPrevious(link.label)"><font-awesome-icon :icon="['fas', 'chevron-left']" /></span>
        <span v-else-if="isNext(link.label)">
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </span>
        <span v-else v-html="link.label"></span>
      </button>
    </div>
  </div>-->
</template>

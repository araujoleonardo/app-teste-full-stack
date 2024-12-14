<script setup>
import useUserShow from "@/context/user/useUserShow.js";

const props = defineProps({
  id: { type: Number, default: null },
  visible: { type: Boolean },
  handleClose: { type: Function },
});

const {
  showData,
  loading,
  open
} = useUserShow(props);
</script>

<template>
  <v-dialog
    v-model="open"
    width="auto"
  >
    <v-card width="400">
      <v-list density="compact">
        <v-list-subheader>Dados do Usuário</v-list-subheader>

        <v-list-item
          color="primary"
        >
          <template v-slot:prepend>
            <v-icon><font-awesome-icon :icon="['fas', 'user']" /></v-icon>
          </template>

          <v-list-item-title v-text="showData?.name"></v-list-item-title>
        </v-list-item>

        <v-list-item
          color="primary"
        >
          <template v-slot:prepend>
            <v-icon><font-awesome-icon :icon="['fas', 'at']" /></v-icon>
          </template>

          <v-list-item-title v-text="showData?.email"></v-list-item-title>
        </v-list-item>

        <v-list-item
          color="primary"
        >
          <template v-slot:prepend>
            <v-icon><font-awesome-icon :icon="['fas', 'calendar-plus']" /></v-icon>
          </template>

          <v-list-item-title v-text="showData?.created_at"></v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          text="Fechar"
          variant="plain"
          :loading="loading"
          @click="handleClose"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import useUserForm from "@/context/user/useUserForm.js";
import ErrorLabel from "@/components/utilitarios/ErrorLabel.vue";

const emit = defineEmits(['reload']);
const props = defineProps({
  tipoForm: { type: String, default: '' },
  user: { type: Object, default: () => ({}) },
  visible: { type: Boolean },
  handleClose: { type: Function },
});

const {
  title,
  btnTitulo,
  loading,
  validate,
  formData,
  handleSubmit,
  passwordGenerate,
  open,
  close
} = useUserForm(props, emit);
</script>

<template>
  <v-dialog
    v-model="open"
    width="auto"
  >
    <v-card width="600">
      <v-card-title>
        {{title}}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              id="name"
              name="name"
              type="text"
              variant="outlined"
              label="Nome Completo"
              v-model="formData.name"
              required/>
              <error-label v-if="validate.name" :message="validate.name[0]" />
          </v-col>
          <v-col cols="12">
            <v-text-field
              id="cpf"
              name="cpf"
              type="text"
              variant="outlined"
              label="CPF"
              v-mask="['###.###.###-##']"
              v-model="formData.cpf"
              required/>
            <error-label v-if="validate.cpf" :message="validate.cpf[0]" />
          </v-col>
          <v-col cols="12">
            <v-text-field
              id="email"
              name="email"
              type="text"
              variant="outlined"
              label="Email"
              v-model="formData.email"
              required/>
              <error-label v-if="validate.email" :message="validate.email[0]" />
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col>
                <v-btn
                  variant="outlined"
                  :disabled="!formData.change"
                  @click.prevent="passwordGenerate">
                  <font-awesome-icon :icon="['fas', 'rotate']" class="mr-1" />
                  Gerar senha
                </v-btn>
              </v-col>
              <v-col>
                <v-switch
                  v-if="tipoForm === 'update'"
                  v-model="formData.change"
                  density="compact"
                  label="Alterar Senha?"
                  color="primary"/>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-text-field
              id="password"
              name="password"
              type="password"
              label="Senha"
              variant="outlined"
              :disabled="!formData.change"
              v-model="formData.password"
              required/>
              <error-label v-if="validate.password" :message="validate.password[0]" />
          </v-col>
          <v-col cols="12">
            <v-text-field
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              label="Confirma Senha"
              variant="outlined"
              :disabled="!formData.change"
              v-model="formData.password_confirmation"
              required/>
              <error-label v-if="validate.password_confirmation" :message="validate.password_confirmation[0]" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          text="Cancelar"
          variant="plain"
          :loading="loading"
          @click="close"
        ></v-btn>

        <v-btn
          color="primary"
          :text="btnTitulo"
          variant="tonal"
          :loading="loading"
          @click="handleSubmit"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

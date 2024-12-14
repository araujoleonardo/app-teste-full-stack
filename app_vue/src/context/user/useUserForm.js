import {ref, reactive, watch} from 'vue';
import generatePassword from "@/helpers/generatePassword.js";
import apiAuth from "@/axios/useApiAuth.js";

export default function useUserForm(props, emit) {
  const title = ref('Título');
  const btnTitulo = ref('Salvar');
  const urlSubmit = ref('');
  const loading = ref(false);
  const changePassword = ref(false);
  const open = ref(false);
  const getPassword = ref(null);
  const validate = ref([]);
  const formData = reactive({
    id: null,
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
  });

  const resetForm = () => {
    formData.id = null;
    formData.name = null;
    formData.email = null;
    formData.password = null;
    formData.password_confirmation = null;
    validate.value = [];
    changePassword.value = true;
  };

  const handleSubmit = () => {
    loading.value = true;
    apiAuth.post(urlSubmit.value, formData)
      .then(response => {
        console.log(response?.data?.success || 'Dados cadastrados com sucesso!');
        emit('reload');
        props.handleClose();
      })
      .catch(error => {
        validate.value = error.response.data.errors;
        if (!validate.value) {
          console.log('Erro ao salvar, tente mais tarde!');
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const passwordGenerate = () => {
    getPassword.value = generatePassword(8, true, true, true, true);
    Object.assign(formData, {
      password: getPassword.value,
      password_confirmation: getPassword.value
    });
  }

  watch(() => props.visible,
    (newVisible) => {
      open.value = newVisible;
      if (newVisible) {
        if (props.tipoForm === 'novo') {
          title.value = 'Novo Usuário';
          btnTitulo.value = 'Salvar';
          urlSubmit.value = '/user-create';
          resetForm();
        } else if (props.tipoForm === 'update') {
          title.value = 'Editar Usuário';
          btnTitulo.value = 'Atualizar';
          urlSubmit.value = '/user-update';
          changePassword.value = false;
          Object.assign(formData, {
            id: props.user.id,
            name: props.user.name,
            email: props.user.email,
            password: props.user.password,
            password_confirmation: props.user.password,
          });
        }
      }
    }
  );

  return {
    title,
    btnTitulo,
    urlSubmit,
    loading,
    validate,
    formData,
    open,
    changePassword,
    handleSubmit,
    passwordGenerate
  };
}

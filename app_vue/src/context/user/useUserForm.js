import {ref, reactive, watch} from 'vue';
import generatePassword from "@/helpers/generatePassword.js";
import apiAuth from "@/axios/useApiAuth.js";
import {useToast} from "@/context/useToast.js";

export default function useUserForm(props, emit) {
  const { showToast } = useToast();
  const title = ref('Título');
  const btnTitulo = ref('Salvar');
  const urlSubmit = ref('');
  const loading = ref(false);
  const open = ref(false);
  const getPassword = ref(null);
  const validate = ref([]);
  const formData = reactive({
    id: null,
    name: null,
    email: null,
    cpf: null,
    password: null,
    password_confirmation: null,
    change: false,
  });

  const resetForm = () => {
    formData.id = null;
    formData.name = null;
    formData.email = null;
    formData.cpf = null;
    formData.password = null;
    formData.password_confirmation = null;
    formData.change = true;
    validate.value = [];
  };

  const handleSubmit = () => {
    loading.value = true;
    apiAuth.post(urlSubmit.value, formData)
      .then(response => {
        let message = response?.data?.success || 'Dados cadastrados com sucesso!';
        showToast({message: message, color: 'success'});
        emit('reload');
        props.handleClose();
      })
      .catch(error => {
        validate.value = error.response.data.errors;
        if (!validate.value) {
          showToast({message: 'Erro ao salvar, tente mais tarde!', color: 'error'});
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

  const close = () => {
    resetForm();
    props.handleClose();
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
          Object.assign(formData, {
            id: props.user.id,
            name: props.user.name,
            email: props.user.email,
            cpf: props.user.cpf,
            password: props.user.password,
            password_confirmation: props.user.password,
            change: false,
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
    close,
    handleSubmit,
    passwordGenerate
  };
}

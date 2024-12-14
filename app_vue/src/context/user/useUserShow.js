import {ref, watch} from 'vue';
import apiAuth from "@/axios/useApiAuth.js";
import {useToast} from "@/context/useToast.js";

export default function useUserShow(props) {
  const { showToast } = useToast();
  const showData = ref(undefined);
  const loading = ref(false);
  const open = ref(false);

  const handleShow = () => {
    loading.value = true;
    apiAuth.get('/user/'+props.id)
      .then((response) => {
        showData.value = response.data.user;
      })
      .catch((error) => {
        showToast({message: 'Erro ao carregar dados, tente mais tarde!', color: 'error'});
      })
      .finally(() => {
        loading.value = false;
      });
  };

  watch(
    () => props.visible,
    (newVisible) => {
      open.value = newVisible;
      if (newVisible) {
        handleShow();
      }
    }
  );

  return {
    showData,
    loading,
    handleShow,
    open
  };
}

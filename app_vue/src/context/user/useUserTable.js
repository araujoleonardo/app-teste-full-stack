import { ref, reactive, onMounted } from 'vue';
import apiAuth from "@/axios/useApiAuth.js";
import {useToast} from "@/context/useToast.js";
import {useConfirmDialog} from "@/context/useConfirmDialog.js";

export default function useUserTable(baseEndpoint) {
  const { showToast } = useToast();
  const { open } = useConfirmDialog();
  const loading = ref(false);
  const baseUrl = ref(baseEndpoint+'?page=1');
  const currentPage = ref(null);
  const dataSet = reactive({
    links: []
  });
  const params = reactive({
    field: 'name',
    direction: 'asc',
    search: '',
  });

  const getData = (url) => {
    loading.value = true;
    baseUrl.value = url;
    const currentUrl = `${url}&search=${params.search}&field=${params.field}&direction=${params.direction}`;
    apiAuth.get(currentUrl)
      .then((response) => {
        dataSet.links = response.data.users.links;
        dataSet.total = response.data.users.total;
        dataSet.data = response.data.users.data;
      })
      .catch((error) => {
        showToast({message: 'Erro ao carregar dados!', color: 'error'});
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const loadData = () => {
    getData(baseUrl.value);
  }

  const handleSort = (field) => {
    if (params.field === field) {
      params.direction = params.direction === 'asc' ? 'desc' : 'asc';
    } else {
      params.field = field;
      params.direction = 'asc';
    }
    getData(baseUrl.value);
  };

  const handleSearch = () => {
    if (params.search.length % 3 === 0) {
      getData(baseUrl.value);
    }
  };

  const handleDelete = async (row) => {

    const confirmed = await open({
      title: 'Atenção',
      message: 'Você tem certeza que deseja excluir o registro?',
    });
    if (confirmed) {
      apiAuth.delete('/user-delete/'+ row.id).then((response) => {
        let message = response?.data?.success || 'Usuário excluido com sucesso!';
        showToast({message: message, color: 'success'});
        getData(baseUrl.value);
      }).catch((error) => {
        let message = error?.response?.data?.error || 'Não foi possível excluir usuário!';
        showToast({message: message, color: 'error'});
      });
    }
  };

  onMounted(() => {
    loadData()
  });

  return {
    loading,
    currentPage,
    dataSet,
    params,
    getData,
    loadData,
    handleSort,
    handleSearch,
    handleDelete
  };
}

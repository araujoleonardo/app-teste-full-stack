import { ref, reactive, onMounted } from 'vue';
import apiAuth from "@/axios/useApiAuth.js";

export default function useUserTable(baseEndpoint) {
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
        console.log('erro ao carregar dados')
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

  const handleDelete = (row) => {
    showConfirm({
      title: 'Atenção',
      message: 'Esta ação não poderá ser desfeita. Continuar?',
      button: {
        yes: 'Sim',
        no: 'Cancelar',
      },
      callback: (confirm) => {
        if (!confirm) {
          return;
        }

        apiAuth.delete('/user-delete/'+ row.id).then((response) => {
          console.log(response?.data?.success || 'Item excluido com sucesso!');
          getData(baseUrl.value);
        }).catch((error) => {
          console.log(error?.response?.data?.error || 'Não foi possível excluir item!');
        });

      },
    });
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

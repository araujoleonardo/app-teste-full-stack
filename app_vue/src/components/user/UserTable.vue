<script setup>
import useUserTable from "@/context/user/useUserTable.js";
import {ref} from "vue";
import AppPagination from "@/components/utilitarios/AppPagination.vue";
import UserFormDialog from "@/components/user/UserFormDialog.vue";
import AppToast from "@/components/utilitarios/AppToast.vue";
import UserShowDialog from "@/components/user/UserShowDialog.vue";

const {
  loading,
  dataSet,
  getData,
  loadData,
  params,
  handleSort,
  handleSearch,
  handleDelete
} = useUserTable('/users');
const openDialog = ref({ isOpen: false, tipoForm: 'novo' });
const openShow = ref({ isOpen: false, id: null });
const user = ref({});

const handleOpen = () => {
  openDialog.value.tipoForm = 'novo';
  openDialog.value.isOpen = true;
};

const handleEdit = (row) => {
  openDialog.value.tipoForm = 'update';
  user.value = row;
  openDialog.value.isOpen = true;
};

const handleShow = (data) => {
  openShow.value.id = data.id;
  openShow.value.isOpen = true;
};
</script>

<template>
  <div>
    <v-card>
      <AppToast/>
      <v-card-title>
        <v-row align="center" justify="space-between">
          <v-col cols="auto">
            <v-text-field
              v-model="params.search"
              id="search"
              type="text"
              width="300"
              density="compact"
              placeholder="Pesquisar..."
              @input="handleSearch"
              variant="outlined"
            />
          </v-col>
          <v-col cols="auto">
            <v-btn variant="outlined" :loading="loading" @click="handleOpen">
              <font-awesome-icon :icon="['fas', 'plus']" />
              Novo
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-item>
        <v-table>
          <thead>
          <tr>
            <th class="text-left">
              Nome
              <v-btn density="compact" variant="plain" @click="handleSort('name')" size="small">
                <font-awesome-icon :icon="['fas', 'sort']" />
              </v-btn>
            </th>
            <th class="text-left">
              Email
              <v-btn density="compact" variant="plain" @click="handleSort('email')" size="small">
                <font-awesome-icon :icon="['fas', 'sort']" />
              </v-btn>
            </th>
            <th class="text-left">
              Criado em
              <v-btn density="compact" variant="plain" @click="handleSort('created_at')" size="small">
                <font-awesome-icon :icon="['fas', 'sort']" />
              </v-btn>
            </th>
            <th class="text-left">
              Atualizado em
              <v-btn density="compact" variant="plain" @click="handleSort('updated_at')" size="small">
                <font-awesome-icon :icon="['fas', 'sort']" />
              </v-btn>
            </th>
            <th class="text-center">
              Opções
            </th>
          </tr>
          </thead>
          <tbody v-if="dataSet.data?.length">
          <tr v-for="(user) in dataSet.data" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.created_at }}</td>
            <td>{{ user.updated_at }}</td>
            <td class="justify-space-between">
              <v-row align="center" justify="center">
                <v-col cols="auto">
                  <v-btn density="compact" color="blue-darken-2" variant="text" icon @click="handleEdit(user)">
                    <font-awesome-icon size="lg" :icon="['fas', 'pen-to-square']" />
                  </v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn density="compact" color="green-darken-2" variant="text" icon @click="handleShow(user)">
                    <font-awesome-icon size="lg" :icon="['fas', 'file-lines']" />
                  </v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn density="compact" color="red-darken-2" variant="text" icon @click="handleDelete(user)">
                    <font-awesome-icon size="lg" :icon="['fas', 'trash']" />
                  </v-btn>
                </v-col>
              </v-row>
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr>
            <td colspan="5" class="text-center">
              SEM DADOS DISPONÍVEIS
            </td>
          </tr>
          </tbody>
        </v-table>
      </v-card-item>
      <v-divider v-if="dataSet.total > 0"></v-divider>
      <v-card-actions v-if="dataSet.total > 0" class="pt-0">
        <AppPagination :data="dataSet" @page="getData"/>
      </v-card-actions>
    </v-card>

    <UserFormDialog
      :visible="openDialog.isOpen"
      :handleClose="
        () => {
          openDialog.isOpen = false
        }
      "
      :tipoForm="openDialog.tipoForm"
      :user="user"
      @reload="loadData"
    />

    <UserShowDialog
      :visible="openShow.isOpen"
      :handleClose="
        () => {
          openShow.isOpen = false
        }
      "
      :id="openShow.id"
    />
  </div>
</template>

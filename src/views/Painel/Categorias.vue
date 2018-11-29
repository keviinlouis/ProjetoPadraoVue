<template>
    <v-card>
        <v-container style="height: 100%">
            <v-layout row wrap justify-space-between>
                <v-flex md3 sm4>
                    <v-text-field append-icon="search"
                                  name="search"
                                  :label="$t('label.procurar')"
                                  v-model="query.search"
                                  type="text">
                    </v-text-field>
                </v-flex>
                <v-flex sm2 xs12>
                    <v-btn color="primary"
                           @click="openModal()"
                           class="font-weight-bold"
                           block
                           depressed>
                        {{$t('btn.novo_item')}}
                    </v-btn>
                    <subcategoria-dialog v-model="showModal" :subcategoria="subcategoria"/>
                </v-flex>
                <v-flex xs12 mt-2 mb-2>
                    <v-divider></v-divider>
                </v-flex>
                <v-flex xs12 mb-3>
                    <v-data-table
                            :headers="headers"
                            :items="categorias"
                            :pagination.sync="pagination"
                            class="elevation-1"
                            :loading="loading"
                            :total-items="pagination.totalItems"
                            hide-actions
                    >
                        <template slot="items" slot-scope="props">
                            <tr>
                                <td @click="props.expanded = !props.expanded">
                                    <v-btn flat icon @click="props.expanded = !props.expanded">
                                        <v-icon>
                                            {{props.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}
                                        </v-icon>
                                    </v-btn>
                                    {{props.item.nome}}
                                </td>
                                <td class="justify-end right align-center pt-2">
                                    <v-switch
                                            color="red darken-3"
                                            :true-value="1"
                                            :false-value="2"
                                            @change="updateStatus(props.item)"
                                            v-model="props.item.ativo"
                                    />
                                </td>
                            </tr>
                        </template>
                        <template slot="expand" slot-scope="props">
                            <v-layout row wrap v-for="subcategoria in props.item.subcategorias" :key="subcategoria.id">
                                <v-flex md10 class="pa-3">
                                    {{subcategoria.nome}}
                                </v-flex>
                                <v-flex md1>
                                    <v-btn color="success"
                                           @click="openModal(subcategoria, props.item)"
                                           class="font-weight-bold"
                                           flat icon>
                                        <v-icon>create</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex md1>
                                    <v-btn color="error"
                                           @click="removerSubcategoria(subcategoria.id)"
                                           class="font-weight-bold"
                                           flat icon>
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex xs12>
                                    <v-divider></v-divider>
                                </v-flex>
                            </v-layout>
                        </template>
                    </v-data-table>
                    <div class="text-xs-center pt-2">
                        <v-pagination v-model="pagination.page" :length="pages" :total-visible="10"/>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';

  import _ from 'lodash';
  import SubcategoriaDialog from '@/components/Dialogs/SubcategoriaDialog';

  export default {
    name: 'Categorias',
    components: { SubcategoriaDialog },
    computed: {
      ...mapGetters({
        categorias: 'categorias/getCategorias',
      }),
    },
    data() {
      return {
        subcategoria: {
          id: 0,
          categoria_id: 0,
          nome: '',
        },
        showModal: false,
        loading: false,
        debounceSearch: _.debounce(this.sendSearch, 300),
        pages: 0,
        pagination: {
          descending: false,
          page: 1,
          sortBy: 'nome',
          totalItems: 0,
          rowsPerPage: 15,
        },
        query: {
          search: '',
        },
        headers: [
          {
            text: this.$t('page.categorias.table.headers.nome'),
            value: 'nome',
          },
          {
            text: '',
            value: '',
          },
        ],
      };
    },
    methods: {
      async sendSearch() {
        const query = {
          sort: this.pagination.sortBy,
          page: this.pagination.page,
          limit: this.pagination.rowsPerPage,
          order: this.pagination.descending ? 'desc' : 'asc',
          search: this.query.search,
        };
        this.loading = true;

        const response = await this.$store.dispatch('categorias/loadCategorias', query);

        this.loading = false;

        this.pagination.totalItems = response.getTotalItens();
        this.pages = this.pagination.totalItems === 0 ? null : response.getLastPage();
        this.pagination.page = this.pagination.totalItems === 0 ? 0 : response.getCurrentPage();
      },

      async updateStatus(categoria) {
        this.loading = true;

        const data = {
          id: categoria.id,
          ativo: categoria.ativo,
        };

        await this.$store.dispatch('categorias/updateCategoria', data);

        this.loading = false;
      },

      async openModal(subcategoria, categoriaId) {
        if (subcategoria.id) {
          this.subcategoria = subcategoria;
          this.subcategoria.categoria_id = categoriaId;
        } else {
          this.subcategoria = {
            id: 0,
            categoria_id: 0,
            nome: '',
          };
        }

        this.showModal = true;
      },

      async removerSubcategoria(id) {
        this.$store.dispatch('categorias/deleteSubcategoria', id);
      },
    },
    created() {
      this.$store.dispatch('setTitlePage', 'Categorias');
      this.sendSearch();
    },
    watch: {
      query: {
        handler() {
          this.debounceSearch();
        },
        deep: true,
      },
      'pagination.page': {
        handler(newValue, oldValue) {
          console.log(newValue, oldValue);
          if (newValue !== oldValue) {
            this.debounceSearch();
          }
        },
      },
      'pagination.descending': {
        handler(newValue, oldValue) {
          console.log(newValue, oldValue);
          if (newValue !== oldValue) {
            this.debounceSearch();
          }
        },
      },
      'pagination.sortBy': {
        handler(newValue, oldValue) {
          console.log(newValue, oldValue);
          if (newValue !== oldValue) {
            this.debounceSearch();
          }
        },
      },
    },
  };
</script>

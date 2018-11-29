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
                    <v-btn color="success"
                           @click="goToNewAdministrador"
                           class="font-weight-bold"
                           block
                           depressed>
                        {{$t('btn.novo_admin')}}
                    </v-btn>
                </v-flex>
                <v-flex xs12 mt-2 mb-2>
                    <v-divider></v-divider>
                </v-flex>
                <v-flex xs12 mb-3>
                    <v-data-table
                            :headers="headers"
                            :items="administradores"
                            :pagination.sync="pagination"
                            class="elevation-1"
                            :loading="loading"
                            :total-items="pagination.totalItems"
                            hide-actions
                    >
                        <template slot="items" slot-scope="props">
                            <td v-html="props.item.nome"/>
                            <td v-html="props.item.email"/>
                            <td class="justify-end right">
                                <v-btn icon @click.stop="showAdministrador(props.item)" color="dark" flat>
                                    <v-icon>remove_red_eye</v-icon>
                                </v-btn>
                            </td>
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

  export default {
    name: 'Administradores',
    computed: {
      ...mapGetters({
        administradores: 'administradores/getAdministradores',
      }),
    },
    data() {
      return {
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
            text: this.$t('page.administradores.table.headers.nome'),
            value: 'nome',
          },
          {
            text: this.$t('page.administradores.table.headers.email'),
            value: 'email',
          },
          {
            text: '',
            value: '',
          },
        ]
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

        const response = await this.$store.dispatch('administradores/loadAdministradores', query);

        this.loading = false;

        this.pagination.totalItems = response.getTotalItens();
        this.pages = this.pagination.totalItems === 0 ? null : response.getLastPage();
        this.pagination.page = this.pagination.totalItems === 0 ? 0 : response.getCurrentPage();
      },
      async showAdministrador(usuario){
        this.$router.push({name: 'administrador', params: {id: usuario.id}})
      },
      async goToNewAdministrador(){
        this.$router.push({name: 'administrador'})
      }
    },
    created() {
      this.$store.dispatch('setTitlePage', 'Administradores');
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

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
                    <v-layout row wrap>
                        <v-flex v-if="loading" class="text-xs-center align-center justify-center" style="min-height:389px">
                            <v-progress-circular indeterminate size="100"/>
                        </v-flex>
                        <v-flex md4 v-for="(admin, i) in administradores" :key="admin.id" v-else :class="getClassAdmin(i)">
                            <v-card>
                                <v-responsive class="text-xs-center">
                                    <v-avatar size="150">
                                        <v-img
                                            src="data:image/png;base64,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"
                                        />
                                    </v-avatar>
                                </v-responsive>
                                <v-card-text class="text-xs-center align-center">
                                    <span class="font-weight-bold subheading">{{admin.nome}}</span><br>
                                    <span>{{admin.email}}</span>
                                </v-card-text>
                                <v-layout row wrap>
                                    <v-flex md12 class="text-xs-center"  v-if="!admin.is_master" py-1>
                                        <v-btn outline
                                               color="gray"
                                               v-if="admin.status === 1"
                                               @click="bloquearAdmin(admin, i)">
                                            Bloquear
                                        </v-btn>
                                        <v-btn outline
                                               color="primary"
                                               v-else-if="admin.status === 2"
                                               @click="ativarAdmin(admin, i)">
                                            Ativar
                                        </v-btn>
                                    </v-flex>
                                    <v-flex md12 v-else class="primary text-xs-center font-weight-bold white--text" mb-3 py-1>
                                        <span>MASTER</span>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </v-flex>

                    </v-layout>
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
      getClassAdmin(i){
        return {
          'pr-4': (i+1) % 3 !== 0 && this.$vuetify.breakpoint.smAndUp,
          'py-2': this.$vuetify.breakpoint.xsOnly
        }
      },
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
      async bloquearAdmin(admin, i){
        this.administradores[i].status = 2;

        await this.$store.dispatch('administradores/desativarAdmin', admin.id);
      },
      async ativarAdmin(admin, i){
        this.administradores[i].status = 1;

        await this.$store.dispatch('administradores/ativarAdmin', admin.id);
      },
      async goToNewAdministrador(){
        this.$router.push({name: 'admin'})
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

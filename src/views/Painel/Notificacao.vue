<template>
    <div>
        <v-container v-if="notificacaoId > 0" >
            <v-card>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex class="title dark--text">Título do push</v-flex>
                    </v-layout>
                    <v-layout row wrap mt-1>
                        <v-flex>{{notificacao.titulo}}</v-flex>
                    </v-layout>
                    <v-layout row wrap mt-3>
                        <v-flex>{{notificacao.mensagem}}</v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-text v-if="notificacaoId > 0">
                    <v-layout row wrap>
                        <v-flex class="title dark--text">Título do push</v-flex>
                    </v-layout>
                    <v-layout row wrap mt-1>
                        <v-flex>{{notificacao.titulo}}</v-flex>
                    </v-layout>
                    <v-layout row wrap mt-3>
                        <v-flex>{{notificacao.mensagem}}</v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-container>
        <v-card v-else>
            <v-container>
                <v-layout row wrap>
                    <v-flex class="title dark--text">Título do push</v-flex>
                </v-layout>
                <v-layout row wrap mt-1>
                    <v-flex>
                        <v-text-field
                                name="titulo"
                                :label="$t('label.titulo')"
                                v-model="notificacao.titulo"
                                v-validate="'required|min:3'"
                                :error-messages="errors.first('titulo')"
                                type="text">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row wrap mt-3>
                    <v-flex>
                        <v-text-field
                                name="mensagem"
                                :label="$t('label.mensagem')"
                                v-model="notificacao.mensagem"
                                v-validate="'required|min:6'"
                                :error-messages="errors.first('mensagem')"
                                type="text">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout justify-end>
                    <v-flex md2 pa-2>
                        <v-btn color="grey darken-1"
                               @click="goBack"
                               class="font-weight-bold"
                               block
                               dark
                               depressed>
                            {{$t('btn.cancelar')}}
                        </v-btn>
                    </v-flex>
                    <v-flex md2 pa-2>
                        <v-btn color="primary"
                               @click="sendNotificacao"
                               class="font-weight-bold"
                               block
                               :loading="loading"
                               depressed>
                            {{$t('btn.enviar')}}
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Notificacao',
    computed: {
      ...mapGetters({
        notificacao: 'notificacoes/getNotificacao',
      }),
    },
    data() {
      return {
        notificacaoId: 0,
        loading: false,
      };
    },
    methods: {
      goBack(){
        this.$router.push({name: 'notificacoes'});
      },
      async send(){
        await this.$store.dispatch('notificacoes/createNotificacao', this.notificacao);
      },
      async validateLoginForm() {
        return await this.$validator.validateAll('login');
      },
      async sendNotificacao() {
        if (!await this.validateLoginForm() || this.loading) {
          return;
        }

        this.loading = true;

        this.handleResponse(await this.send(), '', () => this.$router.push({ name: 'dashboard' }));

        this.loading = false;

        this.$store.dispatch('setToast', { text: 'Push enviada com sucesso' });
      },
    },
    created() {
      if (this.$router.currentRoute.params.id) {
        this.notificacaoId = parseInt(this.$router.currentRoute.params.id);
      } else {
        this.notificacaoId = 0;
      }
    },
    watch: {
      'notificacaoId': {
        handler(newValue, oldValue) {
          if (newValue > 0) {
            this.$store.dispatch('notificacoes/loadNotificacao', newValue);
          }else{
            this.$store.dispatch('notificacoes/unsetNotificacao', newValue);
          }
        },
      },

    },
  };
</script>

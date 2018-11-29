<template>
    <v-card>
        <v-container>
            <v-layout row wrap mt-1>
                <v-flex md2></v-flex>
                <v-flex md5>
                    <v-text-field
                            name="nome"
                            :label="$t('label.nome_completo')"
                            v-model="administrador.nome"
                            v-validate="'required|min:3'"
                            :error-messages="errors.first('nome')"
                            type="text">
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap mt-3>
                <v-flex md5>
                    <v-text-field
                            name="email"
                            :label="$t('label.email')"
                            v-model="administrador.email"
                            v-validate="'required|email'"
                            :error-messages="errors.first('email')"
                            type="email">
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs12>
                    <v-text-field id="senha"
                                  prepend-icon="lock"
                                  ref="senha"
                                  name="senha"
                                  :label="$t('label.senha')"
                                  v-model="form.senha"
                                  v-validate="'required|min:6'"
                                  :error-messages="errors.first('senha')"
                                  :append-icon="showSenha ? 'visibility_off' : 'visibility'"
                                  @click:append="showSenha = !showSenha"
                                  :type="showSenha ? 'text' : 'password'">
                    </v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field id="confirmar_senha"
                                  prepend-icon="lock"
                                  name="confirmar_senha"
                                  :label="$t('label.confirmar_senha')"
                                  v-model="form.senha_confirmation"
                                  v-validate="'required|min:6|confirmed:senha'"
                                  :error-messages="errors.first('confirmar_senha')"
                                  @keyup.enter="login"
                                  :append-icon="showSenhaConfirmation ? 'visibility_off' : 'visibility'"
                                  @click:append="showSenhaConfirmation = !showSenhaConfirmation"
                                  :type="showSenhaConfirmation ? 'text' : 'password'">
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
                           @click="sendAdministrador"
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
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Administrador',
    computed: {
      ...mapGetters({
        administrador: 'administradores/getAdministrador',
      }),
    },
    data() {
      return {
        administradorId: 0,
        loading: false,
        showSenha: false,
        showSenhaConfirmation: false,
      };
    },
    methods: {
      goBack() {
        this.$router.push({ name: 'administradores' });
      },
      async send() {
        await this.$store.dispatch('administradores/createAdministrador', this.administrador);
      },
      async validateLoginForm() {
        return await this.$validator.validateAll('login');
      },
      async sendAdministrador() {
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
        this.administradorId = parseInt(this.$router.currentRoute.params.id);
      } else {
        this.administradorId = 0;
      }
    },
    watch: {
      'administradorId': {
        handler(newValue, oldValue) {
          if (newValue > 0) {
            this.$store.dispatch('administradores/loadAdministrador', newValue);
          } else {
            this.$store.dispatch('administradores/unsetAdministrador', newValue);
          }
        },
      },

    },
  };
</script>

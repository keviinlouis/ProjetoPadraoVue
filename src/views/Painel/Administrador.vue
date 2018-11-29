<template>
    <v-card>
        <v-container>
            <v-layout row wrap mt-1>
                <v-flex md2>
                    <upload-foto v-on:uploaded="fotoUpdated">
                        <v-avatar :src="administrador.url_foto" height="150"/>
                    </upload-foto>
                </v-flex>
            </v-layout>
            <v-layout row wrap mt-3>
                <v-flex md6>
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
                <v-flex md6>
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
                <v-flex md3 mr-3>
                    <v-text-field id="senha"
                                  ref="senha"
                                  name="senha"
                                  :label="$t('label.senha')"
                                  v-model="administrador.senha"
                                  v-validate="'required|min:6'"
                                  :error-messages="errors.first('senha')"
                                  :append-icon="showSenha ? 'visibility_off' : 'visibility'"
                                  @click:append="showSenha = !showSenha"
                                  :type="showSenha ? 'text' : 'password'">
                    </v-text-field>
                </v-flex>
                <v-flex md3>
                    <v-text-field id="confirmar_senha"
                                  name="confirmar_senha"
                                  :label="$t('label.confirmar_senha')"
                                  v-model="administrador.senha_confirmation"
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
  import UploadFoto from '../../components/Inputs/UploadFoto';

  export default {
    name: 'Administrador',
    components: { UploadFoto },
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
      fotoUpdated(foto) {
        this.administrador.url_foto = foto;
        this.administrador.foto = foto;
      },
      goBack() {
        this.$router.push({ name: 'admins' });
      },
      async send() {
        if (this.administradorId > 0) {
          return await this.$store.dispatch('administradores/updateAdministrador', this.administrador);
        }
        return await this.$store.dispatch('administradores/createAdministrador', this.administrador);
      },

      async validateLoginForm() {
        return await this.$validator.validateAll('login');
      },

      async sendAdministrador() {
        if (!await this.validateLoginForm() || this.loading) {
          return;
        }

        this.loading = true;

        const response = this.handleResponse(await this.send(), '', () => this.$router.push({ name: 'admins' }));

        this.loading = false;

        if (response.isSuccess()) {
          return await this.$store.dispatch('setToast', { text: 'Push enviada com sucesso' });
        }

        return await this.$store.dispatch('setToast', { text: response.getMessage() });
      },
    },
    created() {
      if (this.$router.currentRoute.params.id) {
        this.administradorId = parseInt(this.$router.currentRoute.params.id);
      } else {
        this.administradorId = 0;
      }
    },
    destroyed() {
      this.$store.dispatch('administradores/unsetAdministrador');
      this.administradorId = 0;
    },
    watch: {
      'administradorId': {
        handler(newValue, oldValue) {
          if (newValue > 0) {
            this.$store.dispatch('administradores/loadAdministrador', newValue);
          } else {
            this.$store.dispatch('administradores/unsetAdministrador');
          }
        },
      },

    },
  };
</script>

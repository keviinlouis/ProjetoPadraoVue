<template>
    <div>
        <v-btn color="primary"
               class="font-weight-bold"
               block
               @click.stop="dialog = true"
               v-html="$t('btn.alterar_senha')"
               depressed/>
        <v-dialog v-model="dialog"
                  persistent
                  max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline" v-html="$t('dialog.alterar_senha.title')"/>
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="redefinirSenha">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field id="senha-antiga"
                                                  prepend-icon="lock"
                                                  name="senha_atual"
                                                  :label="$t('label.senha_atual')"
                                                  v-model="form.senha_atual"
                                                  v-validate="'required|min:6'"
                                                  :error-messages="errors.first('senha_atual')"
                                                  :append-icon="showSenhaAtual ? 'visibility_off' : 'visibility'"
                                                  @click:append="showSenhaAtual = !showSenhaAtual"
                                                  :type="showSenhaAtual ? 'text' : 'password'">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field id="nova_senha"
                                                  prepend-icon="lock"
                                                  ref="nova_senha"
                                                  name="nova_senha"
                                                  :label="$t('label.nova_senha')"
                                                  v-model="form.nova_senha"
                                                  v-validate="'required|min:6'"
                                                  :error-messages="errors.first('nova_senha')"
                                                  :append-icon="showNovaSenha ? 'visibility_off' : 'visibility'"
                                                  @click:append="showNovaSenha = !showNovaSenha"
                                                  :type="showNovaSenha ? 'text' : 'password'">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field id="confirmar_nova_senha"
                                                  prepend-icon="lock"
                                                  name="confirmar_nova_senha"
                                                  :label="$t('label.confirmar_nova_senha')"
                                                  v-model="form.nova_senha_confirmation"
                                                  v-validate="'required|min:6|confirmed:nova_senha'"
                                                  :error-messages="errors.first('confirmar_nova_senha')"
                                                  @keyup.enter="login"
                                                  :append-icon="showNovaSenhaConfirmation ? 'visibility_off' : 'visibility'"
                                                  @click:append="showNovaSenhaConfirmation = !showNovaSenhaConfirmation"
                                                  :type="showNovaSenhaConfirmation ? 'text' : 'password'">
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="default"
                           dark
                           @click.native="close"
                           class="font-weight-bold"
                           block
                           depressed
                           v-html="$t('btn.cancelar')"/>
                    <v-btn color="primary"
                           @click.native="redefinirSenha"
                           :loading="loading"
                           :disabled="loading"
                           class="font-weight-bold"
                           block
                           depressed
                           v-html="$t('btn.enviar')"/>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
  name: 'AlterarSenhaDialog',
  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        senha_atual: '',
        nova_senha: '',
        nova_senha_confirmation: '',
      },
      showSenhaAtual: false,
      showNovaSenha: false,
      showNovaSenhaConfirmation: false,
    };
  },
  methods: {
    close() {
      this.form = {
        senha_atual: '',
        nova_senha: '',
        nova_senha_confirmation: '',
      };

      this.$validator.reset();

      this.showSenhaAtual = false;
      this.showNovaSenha = false;
      this.showNovaSenhaConfirmation = false;

      this.dialog = false;
    },
    async validate() {
      return await this.$validator.validateAll();
    },
    async redefinirSenha() {
      this.loading = await this.validate();

      if (!this.loading) {
        return false;
      }

      const response = await this.$store.dispatch('auth/updatePerfil', this.form);

      this.loading = false;

      this.handleResponse(response, null, () => this.close());

      return true;
    },
  },
};
</script>

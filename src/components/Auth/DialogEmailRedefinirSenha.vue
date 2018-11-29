<template>
    <div style="width: 100%">
        <v-btn color="primary"
               class="btn-esqueci-senha"
               round
               @click.stop="dialog = true"
               flat>
            {{$t('btn.esqueci_senha')}}
        </v-btn>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Redefinir Senha</span>
                </v-card-title>
                <v-card-text>
                    <v-form data-vv-scope="redefinir-senha" @submit.prevent="redefinirSenha">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    {{$t('text.redefinir_senha')}}
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field :label="$t('label.email')"
                                                  name="email"
                                                  outline
                                                  v-model="form.email"
                                                  v-validate="'required|email'"
                                                  @key.enter="redefinirSenha"
                                                  :error-messages="errors.first('redefinir-senha.email')"
                                    >

                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-1" dark @click.native="dialog = false">{{$t('btn.cancelar')}}</v-btn>
                    <v-btn color="primary" @click.native="redefinirSenha" :loading="loading" :disabled="loading">{{$t('btn.enviar')}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

</template>

<script>
export default {
  name: 'DialogEmailRedefinirSenha',
  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        email: '',
      },
    };
  },
  methods: {
    async validate() {
      const result = await this.$validator.validateAll('redefinir-senha');
      this.loading = result;
      return result;
    },

    async sendRedefinirSenha() {
      return await this.$store.dispatch('auth/emailRedefinirSenha', this.form);
    },

    onSuccess() {
      this.dialog = false;
      this.form.email = '';
      this.$store.dispatch('setToast', { text: this.$t('toast.email_enviado_sucesso') });
    },

    async redefinirSenha() {
      if (!await this.validate()) {
        return false;
      }

      this.handleResponse(await this.sendRedefinirSenha(), 'redefinir-senha', this.onSuccess);

      this.loading = false;

      return true;
    },
  },

};
</script>

<style scoped>
    .btn-esqueci-senha {
        width: 100%;
        padding: 0;
        margin: 0;
    }
</style>

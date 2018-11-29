<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-card-text>
                                <v-form data-vv-scope="redefinir-senha" @submit.prevent="redefinirSenha">
                                    <v-layout align-center justify-center column fill-height class="logo">
                                        <img src="@/assets/icons/logo-texto.png" alt="">
                                    </v-layout>
                                    <v-text-field prepend-icon="email"
                                                  name="email"
                                                  :label="$t('label.email')"
                                                  v-model="form.email"
                                                  v-validate="'required|email'"
                                                  :error-messages="errors.first('redefinir-senha.email')"
                                                  v-on:keyup.enter="login"
                                                  type="email">
                                    </v-text-field>
                                    <v-text-field prepend-icon="lock"
                                                  name="senha"
                                                  :label="$t('label.senha')"
                                                  v-model="form.senha"
                                                  v-validate="'required|min:6'"
                                                  :error-messages="errors.first('redefinir-senha.senha')"
                                                  type="password">
                                    </v-text-field>
                                    <v-text-field prepend-icon="lock"
                                                  name="senha_confirmation"
                                                  :label="$t('label.confirmar_senha')"
                                                  v-model="form.senha_confirmation"
                                                  type="password">
                                    </v-text-field>
                                </v-form>
                                <v-layout align-center justify-center column fill-height style="padding:0 10%">
                                    <v-btn color="primary"
                                           depressed
                                           @click.stop="redefinirSenha"
                                           :loading="loading"
                                           :disabled="loading">
                                        {{$t('btn.redefinir_senha')}}
                                    </v-btn>
                                    <v-btn color="default" dark depressed :to="{name: 'login'}">{{$t('btn.cancelar')}}
                                    </v-btn>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
  name: 'RedefinirSenha',
  data() {
    return {
      form: {
        email: '',
        senha: '',
        senha_confirmation: '',
        token: null,

      },
      loading: false,
    };
  },
  methods: {
    async validateRedefinirSenhaForm() {
      let isValid = await this.$validator.validateAll('redefinir-senha');

      if (this.form.senha !== this.form.senha_confirmation) {
        this.$validator.errors.add({
          field: 'senha',
          msg: this.$t('validation.senha_confirmation'),
          scope: 'redefinir-senha',
        });
        isValid = false;
      }

      this.loading = isValid;

      return isValid;
    },

    async sendRedefinirSenhaForm() {
      return await this.$store.dispatch('auth/redefinirSenha', this.form);
    },

    async onSuccess() {
      this.$router.push({ name: 'login' });

      await this.$store.dispatch('setToast', { text: this.$t('toast.senha_redefinida_sucesso') });
    },

    async redefinirSenha() {
      if (!await this.validateRedefinirSenhaForm()) {
        return;
      }
      const response = await this.sendRedefinirSenhaForm();

      this.handleResponse(response, 'redefinir-senha', this.onSuccess);

      if (response.hasInput('token')) {
        await this.$store.dispatch('setToast', { text: this.$t('toast.token_invalido') });
      }

      this.loading = false;
    },
  },
  created() {
    this.form.token = this.$router.currentRoute.params.token;
  },
};
</script>

<style scoped>
    .v-btn {
        width: 100%;
        padding: 0;
    }

    .logo {
        padding: 5%;
    }

    .logo img {
        width: 70%;
    }
</style>

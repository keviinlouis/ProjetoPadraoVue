<template>
    <v-app id="inspire">
        <v-content  class="input-background">
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-0" color="transparent">
                            <v-card-text>
                                <v-form data-vv-scope="login" @submit.prevent="login" autocomplete="off">
                                    <v-layout align-center justify-center column fill-height class="logo">
                                        <img src="@/assets/icons/logo-texto.png" alt="">
                                    </v-layout>
                                    <v-text-field name="email"
                                                  autofocus
                                                  outline
                                                  color="primary"
                                                  class="input-background"
                                                  :label="$t('label.email')"
                                                  v-model="form.email"
                                                  dark
                                                  v-validate="'required|email'"
                                                  :error-messages="errors.first('login.email')"
                                                  @keyup.enter="login"
                                                  type="email">
                                    </v-text-field>
                                    <v-text-field id="senha"
                                                  name="senha"
                                                  outline
                                                  dark
                                                  class="input-background"
                                                  :label="$t('label.senha')"
                                                  v-model="form.senha"
                                                  v-validate="'required|min:6'"
                                                  :error-messages="errors.first('login.senha')"
                                                  @keyup.enter="login"
                                                  :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                                                  @click:append="showPassword = !showPassword"
                                                  :type="showPassword ? 'text' : 'password'">
                                    </v-text-field>
                                </v-form>
                                <v-layout align-center justify-center column fill-height >
                                    <v-btn color="white"
                                           depressed
                                           block
                                           round
                                           @click.stop="login"
                                           :loading="loading">
                                        {{$t('btn.login')}}
                                    </v-btn>
                                    <dialog-email-redefinir-senha></dialog-email-redefinir-senha>
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
import DialogEmailRedefinirSenha from '../../components/Auth/DialogEmailRedefinirSenha';
import FacebookLoginButton from '../../components/Auth/FacebookLoginButton';

export default {
  name: 'Login',
  components: { FacebookLoginButton, DialogEmailRedefinirSenha },
  data() {
    return {
      form: {
        email: '',
        senha: '',
      },
      loading: false,
      showPassword: false,
    };
  },
  methods: {
    async validateLoginForm() {
      return await this.$validator.validateAll('login');
    },

    async sendLoginForm() {
      return await this.$store.dispatch('auth/login', this.form);
    },

    async login() {
      if (!await this.validateLoginForm() || this.loading) {
        return;
      }

      this.loading = true;

      this.handleResponse(await this.sendLoginForm(), 'login', () => this.$router.push({ name: 'dashboard' }));

      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
    .input-background{
        background-color: #1d2d3c;
    }
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

<template>
    <v-btn color="#405b96"
           :dark="!loading"
           depressed
           @click.prevent="sendLogin"
           :loading="loading"
            :disabled="loading">
        {{$t('btn.login_facebook')}}
    </v-btn>
</template>

<script>
export default {
  name: 'FacebookLoginButton',
  data() {
    return {
      loading: false,
      test: false,
      fbSignInParams: {
        scope: 'email,public_profile',
        return_scopes: true,
      },
    };
  },
  methods: {
    async sendLogin() {
      this.loading = true;

      if (this.test) {
        return this.onSignInSuccessTest();
      }

      window.FB.login((response) => {
        this.loading = false;

        if (!response.status) {
          return this.onError(response);
        }

        return this.onSignInSuccess(response.authResponse.userID.toString());
      }, this.fbSignInParams);

      return true;
    },
    async onSignInSuccessTest() {
      const facebookId = '2314359255248426';

      const response = await this.$store.dispatch('auth/loginFacebook', { facebook_id: facebookId });

      this.loading = false;

      if (response.isSuccess()) {
        return this.$router.push({ name: 'rede' });
      }

      return this.$store.dispatch('setToast', { text: this.$t('toast.cadastro_nao_encontrado') });
    },
    async onSignInSuccess(facebookId) {
      const response = await this.$store.dispatch('auth/loginFacebook', { facebook_id: facebookId });
      if (response.isSuccess()) {
        return this.$router.push({ name: 'rede' });
      }

      return this.$store.dispatch('setToast', { text: this.$t('toast.cadastro_nao_encontrado') });
    },

    onError(error) {
      console.log('Error ao logar no facebook', error);
      return this.$store.dispatch('setToast', { text: this.$t('toast.erro_entrar_facebook') });
    },
  },
};
</script>

<style scoped>

</style>

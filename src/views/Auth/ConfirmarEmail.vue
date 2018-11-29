<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-card-text>
                                <v-layout align-center justify-center column fill-height class="logo">
                                    <img src="@/assets/icons/logo-texto.png" alt="">
                                </v-layout>
                                <v-layout align-center justify-center column fill-height class="logo">
                                    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
                                    <span v-else>{{message}}</span>
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
  name: 'ConfirmarEmail',
  data() {
    return {
      form: {
        token: '',
      },
      loading: true,
      success: false,
      message: '',
    };
  },
  methods: {
    async confirmarEmail() {
      const response = await this.$store.dispatch('auth/confirmarEmail', this.form.token);
      this.loading = false;

      if (response.isSuccess()) {
        this.message = this.$t('page.confirmar_email.success');
      } else {
        this.message = response.getMessage();
      }
    },
  },
  created() {
    this.form.token = this.$router.currentRoute.params.token;

    if (this.form.token) {
      this.confirmarEmail();
    }
  },
};
</script>

<style scoped>
    .logo {
        padding: 5%;
    }

    .logo img {
        width: 70%;
    }
</style>

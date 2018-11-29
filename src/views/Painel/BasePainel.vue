<template>
    <v-app>
        <v-navigation-drawer
                v-model="drawer"
                :width="200"
                fixed
                class="dark"
                app
        >
            <v-list two-line>
                <v-list-tile class="logo dark logo-max">
                    <img src="@/assets/icons/logo.png" alt="logo"/>
                </v-list-tile>

                <v-list-tile v-for="(menu, i) in menus" v-if="!menu.master || (menu.master && user.is_master)"
                             :key="i"
                             @click="goToRoute(menu.route)"
                             exact
                             class="item">
                    <v-layout align-center
                              justify-center
                              column
                              fill-height>
                        <v-icon :color="menu.route === currentRoute ? 'primary' : 'white'"
                                class="mb-2">
                            {{menu.icon}}
                        </v-icon>
                        <div class="white--text" :class="menu.route === currentRoute ? 'primary--text' : 'white--text'">
                            {{menu.name}}
                        </div>
                    </v-layout>
                </v-list-tile>

            </v-list>
        </v-navigation-drawer>
        <v-toolbar app class="gradient">
            <v-toolbar-side-icon @click.stop="drawer = !drawer" color="primary" flat/>
            <v-toolbar-title v-text="title" class="white--text"/>
            <v-spacer></v-spacer>
            <v-toolbar-title v-text="user.nome" class="white--text"/>
            <v-btn icon @click.stop="logout" color="white" flat>
                <v-icon>fa fa-sign-out-alt</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BasePage',
  computed: {
    ...mapGetters({
      title: 'getTitlePage',
      user: 'auth/getUser',
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout').finally(() => this.$router.push({ name: 'login' }));
    },
    goToRoute(route){
      this.$router.push({name: route});
      this.currentRoute = route;
    }
  },
  data() {
    return {
      drawer: true,
      currentRoute: 'dashboard',
      menus: [
        {
          icon: 'fas fa-tachometer-alt',
          name: this.$t('sidebar.dashboard'),
          route: 'dashboard',
        },
        {
          icon: 'fa fa-users',
          name: this.$t('sidebar.usuarios'),
          route: 'usuarios',
        },
        {
          icon: 'fa fa-gift',
          name: this.$t('sidebar.cupons'),
          route: 'cupons',
        },
        {
          icon: 'fas fa-bell',
          name: this.$t('sidebar.envio_push'),
          route: 'notificacoes',
        },
        {
          icon: 'fas fa-user-plus',
          name: this.$t('sidebar.admins'),
          route: 'admins',
          master: true
        },
        {
          icon: 'fas fa-cog',
          name: this.$t('sidebar.configuracoes'),
          route: 'configuracoes',
        },
      ],
    };
  },
    watch: {
      '$router': function(newValue){
          this.currentRoute = newValue.currentRoute.name;
      }
    }
};
</script>

<style scoped lang="scss">
    .ativo{
        color: var(--primary)
    }
    .gradient{
        background-image: linear-gradient(to right, #1d2d3c , #25485b)
    }
    .logo-max {
        padding-left: 60px;
    }

    .logo-min {
        padding-left: 0;
    }

    .logo {
        margin-top: -9px;
        height: 64px;
    }

    .logo img {
        height: 50px;
        width: 50px;
        margin-bottom: 4px;
    }
</style>

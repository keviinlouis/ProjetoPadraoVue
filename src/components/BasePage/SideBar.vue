<template>
    <v-navigation-drawer
            persistent
            :mini-variant="miniVariant"
            v-model="drawer"
            :width="200"
            enable-resize-watcher
            fixed
            app
            class="primary"
    >
        <v-list two-line>
            <v-list-tile :class="miniVariant ? 'logo-min' : 'logo-max'" class="logo accent">
                <img src="@/assets/icons/logo.png" alt="logo"/>
            </v-list-tile>

            <v-list-tile v-for="(menu, i) in menus"
                         :key="i"
                         :to="{name: menu.route}"
                         active-class="dark"
                         exact
                         class="item">
                <v-layout align-center
                          justify-center
                          column
                          fill-height>
                    <v-icon color="accent"
                            class="mb-2">
                        {{menu.icon}}
                    </v-icon>
                    <div class="accent--text"
                         v-if="!miniVariant">
                        {{menu.name}}
                    </div>
                </v-layout>
            </v-list-tile>

        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'SideBar',
  props: [
    'drawer', 'clipped', 'miniVariant', 'menus',
  ],
};
</script>

<style scoped>
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

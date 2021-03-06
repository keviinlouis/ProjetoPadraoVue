import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const hasJwt = !!localStorage.getItem(process.env.VUE_APP_TOKEN_JWT);

  const authenticated = store.getters['auth/isAuthenticated'];

  const routeNeedAuth = to.matched.length > 0 ? to.matched[0].meta.auth : false;

  console.log('Router: ', {
    route: to.name,
    path: to.path,
    hasJwt,
    authenticated,
    routeNeedAuth,
  });

  if (routeNeedAuth === 3) {
    return next();
  }

  if (hasJwt && routeNeedAuth) {
    if (!authenticated) {
      store.dispatch('auth/me').then((response) => {
        if (response.isFailed()) {
          store.dispatch('auth/logout').then(() => router.push({ name: 'login' }));
        }
        if(to.meta.master){
          const user = store.getters['auth/getUser'];

          if(!user.is_master){
            return next({ name: 'dashboard' });
          }
        }
      });
    }else if(to.meta.master){
      const user = store.getters['auth/getUser'];

      if(!user.is_master){
        return next({ name: 'dashboard' });
      }
    }
    return next();
  }

  if (!hasJwt && routeNeedAuth) {
    return router.push({ name: 'login' });
  }

  if (hasJwt && !routeNeedAuth) {
    return next({ name: 'dashboard' });
  }


  return next();
});

export default router;

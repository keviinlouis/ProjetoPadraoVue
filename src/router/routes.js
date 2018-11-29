import BasePage from '@/views/Painel/BasePainel.vue';
import Dashboard from '@/views/Painel/Dashboard.vue';
import Usuarios from '@/views/Painel/Usuarios.vue';
import Usuario from '@/views/Painel/Usuario.vue';
import Notificacoes from '@/views/Painel/Notificacoes.vue';
import Notificacao from '@/views/Painel/Notificacao.vue';
import Administradores from '@/views/Painel/Administradores.vue';
import Administrador from '@/views/Painel/Administrador.vue';

import Login from '@/views/Auth/Login.vue';
import RedefinirSenha from '@/views/Auth/RedefinirSenha.vue';
import ConfirmarEmail from '@/views/Auth/ConfirmarEmail.vue';

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      auth: false,
    },
  },
  {
    path: '/redefinir-senha/:token',
    name: 'redefinir-senha',
    component: RedefinirSenha,
    meta: {
      auth: false,
    },
  },

  {
    path: '/confirmar-email/:token',
    name: 'confirmar-email',
    component: ConfirmarEmail,
    meta: {
      auth: 3,
    },
  },

  {
    path: '/',
    component: BasePage,
    meta: {
      auth: true,
    },
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          auth: true,
        },
      },
      {
        path: '/usuarios',
        name: 'usuarios',
        component: Usuarios,
        meta: {
          auth: true,
        },
      },
      {
        path: '/usuario/:id',
        name: 'usuario',
        component: Usuario,
        meta: {
          auth: true,
        },
      },
      {
        path: '/',
        name: 'cupons',
        component: Dashboard,
        meta: {
          auth: true,
        },
      },
      {
        path: '/',
        name: 'notificacoes',
        component: Notificacoes,
        meta: {
          auth: true,
        },
      },
      {
        path: '/notificacao/:id',
        name: 'notificacao',
        component: Notificacao,
        meta: {
          auth: true,
        },
      },
      {
        path: '/notificacao/novo',
        name: 'nova-notificacao',
        component: Notificacao,
        meta: {
          auth: true,
        },
      },
      {
        path: '/administradores',
        name: 'admins',
        component: Administradores,
        meta: {
          auth: true,
        },
      },
      {
        path: '/administrador/:id?',
        name: 'admin',
        component: Administrador,
        meta: {
          auth: true,
        },
      },
      {
        path: '/',
        name: 'configuracoes',
        component: Dashboard,
        meta: {
          auth: true,
        },
      },


    ],
  },
];


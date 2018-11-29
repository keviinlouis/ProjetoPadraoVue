<template>
    <div>
        <img class="logo-effect"
             :style="'width: '+size+'; height: '+size"
             :class="getColorByTipo(tipo)"
             :src="url">
    </div>
</template>

<script>
export default {
  name: 'FotoUsuario',
  props: {
    url: {
      required: true,
    },
    tipo: {
      required: true,
    },
    size: {
      type: String,
      default: '56px',
    },
  },
  data() {
    return {
      tipos: [
        {
          text: 'Pleno',
          value: 1,
          cor: 'usuarioPleno',
        },
        {
          text: 'Virtual',
          value: 2,
          cor: 'usuarioVirtual',
        },
        {
          text: 'Free',
          value: 3,
          cor: 'usuarioFree',
        },
        {
          text: 'Estabelecimento',
          value: 4,
          cor: 'usuarioEstabelecimento',
        },
      ],
    };
  },

  methods: {
    getColorByTipo(tipoId) {
      const tipo = this.tipos.find(tipo => tipo.value === tipoId);

      if (!tipo) {
        return 'default';
      }

      return tipo.cor;
    },
  },
};
</script>

<style scoped>
    .logo-effect {
        border-radius: 50%;
        object-fit: cover;
        margin-right: 15px;
    }
    .logo-effect.usuarioFree{
        -webkit-box-shadow: -3px 0 0 5px #4eaf6c;
        -moz-box-shadow: -3px 0 0 5px #4eaf6c;
        box-shadow: -3px 0 0 5px #4eaf6c;
    }

    .logo-effect.usuarioVirtual{
        -webkit-box-shadow: -3px 0 0 5px #4eaf6c;
        -moz-box-shadow: -3px 0 0 5px #4eaf6c;
        box-shadow: -3px 0 0 5px #4eaf6c;
    }

    .logo-effect.usuarioPleno{
        -webkit-box-shadow: -3px 0 0 5px #000;
        -moz-box-shadow: -3px 0 0 5px #000;
        box-shadow: -3px 0 0 5px #000;
    }
    .logo-effect.usuarioEstabelecimento{
        -webkit-box-shadow: -3px 0 0 5px #d14444;
        -moz-box-shadow: -3px 0 0 5px #d14444;
        box-shadow: -3px 0 0 5px #d14444;
    }

</style>

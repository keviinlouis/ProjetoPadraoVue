<template>
    <v-btn color="primary"
           @click="exportar"
           class="font-weight-bold btn-full"
           :disabled="loading"
           :loading="loading"
           block
           depressed>
        {{$t('btn.exportar')}}
    </v-btn>
</template>
<script>
export default {
  name: 'ExportarXslx',
  props: {
    action: {
      required: true,
      type: String,
    },

  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async exportar() {
      this.loading = true;
      await this.$store.dispatch(this.action);
      this.loading = false;
    },

  },
};
</script>

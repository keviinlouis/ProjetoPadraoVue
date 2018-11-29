<template>
    <div style="cursor: pointer" @click="openInputFile">
        <slot></slot>

        <input type="file"
               v-show="false"
               @change="onInputFileChange"
               ref="infoBox">
    </div>
</template>

<script>
export default {
  name: 'UploadFoto',
  methods: {
    openInputFile() {
      this.$refs.infoBox.click();
    },
    onInputFileChange(e) {
      const files = e.target.files;
      this.uploadTmp(files[0]);
    },
    async uploadTmp(file) {
      this.$emit('setLoading', true);

      const response = await this.$store.dispatch('uploadTmp', file);

      this.$emit('setLoading', false);

      const data = response.getData();

      if (response.isSuccess()) {
        this.$emit('uploaded', data);
        return true;
      }

      return false;
    },
  },
};
</script>

<style scoped>

</style>

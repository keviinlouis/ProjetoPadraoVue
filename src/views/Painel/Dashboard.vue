<template>

</template>

<script>
  export default {
    name: 'Dashboard',
    created(){
      this.$store.dispatch('setTitlePage', 'Dashboard')
    }

  };
</script>

<style scoped>

</style>

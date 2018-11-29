<template>
    <div>
    <router-view/>
    <snack-bar></snack-bar>
    </div>
</template>

<script>

import SnackBar from '@/components/SnackBar';

export default {
  name: 'App',
  components: { SnackBar },
};
</script>

<style lang="scss">
    .bar {
        background-color: var(--primary) !important;
        border-color: var(--primary) !important;
    }

    .spinner {
        display: none !important;
    }
</style>

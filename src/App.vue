<template lang='pug'>
  div(id='app')
    home()
</template>

<script>
import home from './views/Home.vue';

export default {
  name: 'app',
  components: {
    home,
  },
};
</script>

<style lang="sass">
</style>

<template lang='pug'>
  div(id='app')
    home()
</template>

<script>
import Vue from 'vue';
import Buefy from 'buefy';
import home from './views/Home.vue';
import 'buefy/dist/buefy.css';
import '@/styles/global.sass'

Vue.use(Buefy);

export default {
  name: 'app',
  components: {
    home,
  },
};
</script>

<style lang="sass">
</style>

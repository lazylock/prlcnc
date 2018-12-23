<template lang='pug'>
  div(id='app')
    home()
</template>

<script>
import Vue from 'vue';
import Buefy from 'buefy';
import VeeValidate from 'vee-validate';
import home from './views/Home.vue';
import 'buefy/dist/buefy.css';
import '@/styles/global.sass'

Vue.use(Buefy);
Vue.use(VeeValidate);

export default {
  name: 'app',
  components: {
    home,
  },
};
</script>

<style lang="sass">
</style>

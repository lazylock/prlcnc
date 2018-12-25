<template lang='pug'>
  div(id='app')
    home()
</template>

<script>
import '@/styles/global.sass';
import '@/styles/vars.sass';

import Vue from 'vue';
import Buefy from 'buefy';
import VeeValidate from 'vee-validate';
import home from './views/Home.vue';

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

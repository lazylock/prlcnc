<template lang='pug'>
 
</template>

<script>
import values from '@/values.js'

export default {

  data() {
    return {
      material,
      matOptions,
      tool,
      diameter,
      numFlutes,
      chipLoad,
      speed,
      feed,
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.material = '';
    },
  },
};
</script>

<style lang='sass'>
@import '@/styles/vars.sass'

</style>

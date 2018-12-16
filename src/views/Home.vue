<template lang='pug'>
  div(id='home')
    calc(v-if='showCalc')
</template>

<script>
import calc from '@/components/CalcComponent.vue'
// import Tool from '@/components/ToolComponent.vue'

export default {
  components: {
    calc,
    // 'tool': Tool,
  },

  data() {
    return {
      showCalc: false,
    }
  },

  watch: {

  },

  methods: {
    init() {
      this.showCalc = true
    },
  },
}

</script>

<style lang='sass'>
@import '@/styles/vars.sass'
</style>

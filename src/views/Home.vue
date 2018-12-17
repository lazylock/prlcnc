<template lang='pug'>
  div(id='home')
    b-modal(:active.sync='showCalc' has-modal-card)
      calc()
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
      showCalc: true,
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

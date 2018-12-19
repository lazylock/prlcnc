<template lang='pug'>
  div(id='home')
    draggable(v-model='tools' @start='drag=true' @end='drag=false')
      tool(v-for='tool in tools' :key='tool.toolNum')
    b-modal(:active.sync='showCalc' has-modal-card)
      calc(@save='saveHandler')
</template>

<script>
import calc from '@/components/CalcComponent.vue'
import tool from '@/components/ToolComponent.vue'
import draggable from 'vuedraggable'

export default {
  components: {
    calc,
    tool,
    draggable,
  },

  props: [
    'tools',
  ],

  data() {
    return {
      showCalc: false,
    }
  },

  watch: {

  },

  methods: {
    saveHandler(event, tool){

    },

    editHandler(event, toolNum){
      
    },

    init() {
      this.showCalc = false
    },
  },
}

</script>

<style lang='sass'>
@import '@/styles/vars.sass'
</style>

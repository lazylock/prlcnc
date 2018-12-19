<template lang='pug'>
  div(id='home')
    navigation(
      v-bind:setups='setups'
      v-bind:activeSetup='activeSetup'
      @showSetup='showSetupHandler(setup)'
      @duplicateSetup='duplicateSetupHandler(setup)'
      @deleteSetup='deleteSetupHandler(setup)'
      @addSetup='addSetupHandler'
      )
    draggable(v-model='tools' @start='drag=true' @end='drag=false')
      tool(
        v-for='tool in tools'
        :key='tool.toolNum'
        @deleteTool='deleteToolHandler'
        @editTool='editToolHandler'
        )
    b-modal(:active.sync='showCalc' has-modal-card)
      calc(@saveTool='saveToolHandler')
    b-modal(:active.sync='showSetup' has-modal-card)
      setup(@saveSetup='saveSetupHandler')
</template>

<script>
import calc from '@/components/CalcComponent.vue'
import setup from '@/components/SetupComponent.vue'
import tool from '@/components/ToolComponent.vue'
import navigation from '@/components/NavComponent.vue'
import draggable from 'vuedraggable'

export default {
  components: {
    calc,
    setup,
    tool,
    draggable,
    navigation,
  },

  props: [
    'tools',
    'setups',
  ],

  data() {
    return {
      showCalc: true,
      showSetup: false,
      activeSetup: '',
    }
  },

  watch: {

  },

  methods: {
    saveToolHandler(tool) {

    },

    editToolHandler(toolNum) {
      
    },

    deleteToolHandler(toolNum) {
      
    },

    showSetupHandler(targetSetup) {
      this.activeSetup = this.setups.find(setup => setup.id === targetSetup.id)
    },

    duplicateSetupHandler(targetSetup) {
      const duplicatedSetup = this.setups.find(setup => setup.id === targetSetup.id)
      this.setups.push(duplicatedSetup)
    },

    deleteSetupHandler(targetSetup) {
      this.setups.filter(setup => setup.id !== targetSetup.id)
    },

    addSetupHandler() {

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

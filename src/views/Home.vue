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
    draggable(v-model='activeTools' @start='drag=true' @end='drag=false')
      tool(
        v-for='(tool,index) in activeTools'
        :tool='tool'
        :toolNum='index+1'
        :key='index'
        @deleteTool='deleteToolHandler(index)'
        @editTool='editToolHandler(index)'
        )
    b-modal(:active.sync='showCalc' has-modal-card)
      calc(
        :material='activeMaterial'
        :totalNumTools='totalNumTools'
        :toolNum='activeToolIndex+1'
        :tool='activeTool'
         @saveTool='saveToolHandler')
    b-modal(:active.sync='showSetup' has-modal-card)
      setup(@saveSetup='saveSetupHandler($event)' :setup='activeSetup')
    div(class='bottom')
      a(class='button circle is-large is-rounded' @click='addToolHandler')
        span(class='icon')
          i(class='fas fa-plus')
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

  data() {
    return {
      showCalc: false,
      showSetup: false,
      setups: [],
      activeSetupIndex: 0,
      activeToolIndex: 0,
    }
  },

  computed: {
    activeSetup() {
      if (this.setups.length) {
        return this.setups[this.activeSetupIndex]
      }
      return {}
    },

    activeMaterial() {
      if (Object.getOwnPropertyNames(this.activeSetup).length) {
        return this.activeSetup.data.material
      }
      return ''
    },

    activeTools: {
      get() {
        if (Object.getOwnPropertyNames(this.activeSetup).length) {
          return this.activeSetup.tools
        }
        return []
      },
      set(newActiveTools) {
        this.activeSetup.tools = newActiveTools
      },
    },

    activeTool() {
      if (this.activeTools.length && this.activeToolIndex < this.totalNumTools) {
        return this.activeTools[this.activeToolIndex]
      }
      return {}
    },

    totalNumTools() {
      return this.activeTools.length
    },
  },

  mounted() {
    this.init()
  },

  methods: {
    addToolHandler() {
      this.activeToolIndex = this.totalNumTools
      this.showCalc = true
    },

    editToolHandler(index) {
      this.activeToolIndex = index
      this.showCalc = true
    },

    saveToolHandler(savedTool) {
      this.$set(this.setups[this.activeSetupIndex].tools, this.activeToolIndex, savedTool)
    },

    deleteToolHandler(index) {
      this.setups[this.activeSetupIndex].tools.splice(index, 1)
    },

    showSetupHandler(targetSetup) {
      this.activeSetupIndex = this.setups.indexOf(testSetup => testSetup.id !== targetSetup.id)
    },

    duplicateSetupHandler(targetSetup) {
      const duplicatedSetup = this.setups.find(testSetup => testSetup.id !== targetSetup.id)
      this.setups.push(duplicatedSetup)
    },

    deleteSetupHandler(targetSetup) {
      this.setups.filter(testSetup => testSetup.id !== targetSetup.id)
    },

    addSetupHandler() {
      this.showSetup = true
    },

    saveSetupHandler(savedSetup) {
      if (this.activeSetupIndex !== 0) {
        this.setups[this.activeSetupIndex].data = savedSetup
      } else {
        const newSetup = {
          data: savedSetup,
          tools: [],
        }
        this.setups.push(newSetup)
      }
    },

    init() {
      this.showCalc = false
      if (!this.setups.length) {
        this.activeSetupIndex = 0
        this.showSetup = true
      }
    },
  },
}

</script>

<style lang='sass'>
@import '@/styles/vars.sass'

.bottom
  width: 100%
  position: fixed
  bottom: 1rem
  display: flex
  justify-content: center

</style>

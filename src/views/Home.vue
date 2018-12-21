<template lang='pug'>
  div(id='home')
    navigation(
      v-bind:setups='setups'
      v-bind:activeSetup='activeSetup'
      ref='navigation'
      @showSetup='showSetupHandler'
      @editSetup='editSetupHandler'
      @duplicateSetup='duplicateSetupHandler'
      @deleteSetup='deleteSetupHandler'
      @addSetup='addSetupHandler'
      )
    draggable(
      v-model='activeTools'
      @start='drag=true'
      @end='drag=false'
      :options="{handle :'div.drag'}"
      )
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
      if (this.setups.length && this.activeSetupIndex < this.setups.length) {
        return this.setups[this.activeSetupIndex]
      }
      return {}
    },

    activeMaterial() {
      if (Object.keys(this.activeSetup).length) {
        return this.activeSetup.material
      }
      return ''
    },

    activeTools: {
      get() {
        if (Object.keys(this.activeSetup).length) {
          return this.activeSetup.tools
        }
        return []
      },
      set(newActiveTools) {
        this.activeSetup.tools = newActiveTools
      },
    },

    activeTool() {
      if (Object.keys(this.activeTools).length && this.activeToolIndex < this.totalNumTools) {
        return this.activeTools[this.activeToolIndex]
      }
      return {}
    },

    totalNumTools() {
      if (Object.keys(this.activeSetup).length) {
        return this.activeTools.length
      }
      return 0
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

    showSetupHandler(index) {
      this.activeSetupIndex = index
      this.$refs.navigation.burgerHandler()
    },

    editSetupHandler() {
      this.showSetup = true
    },

    duplicateSetupHandler(setupIndex) {
      this.setups.push(this.setups[setupIndex])
    },

    deleteSetupHandler(setupIndex) {
      this.setups.splice(setupIndex, 1)
    },

    addSetupHandler() {
      this.activeSetupIndex = this.setups.length
      this.showSetup = true
    },

    saveSetupHandler(savedSetup) {
      if (this.setups.find(testSetup => testSetup.id === savedSetup.id)) {
        this.setups[this.activeSetupIndex] = savedSetup
      } else {
        this.setups.push(savedSetup)
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

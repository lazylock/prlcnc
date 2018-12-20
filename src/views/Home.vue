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
        v-for='tool in activeTools'
        :tool='tool'
        :key='Math.random()'
        @deleteTool='deleteToolHandler'
        @editTool='editToolHandler'
        )
    b-modal(:active.sync='showCalc' has-modal-card)
      calc(
        :material='activeMaterial'
        :totalNumTools='totalNumTools'
        :toolNum='activeToolNum'
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
      activeSetup: {
        name: '',
        material: '',
        maxSpeed: '',
        id: '',
      },
      activeTool: {
        type: '',
        toolMat: '',
        diameter: '',
        numFlutes: '',
        chipLoad: '',
        speed: '',
        feed: '',
      },
      activeToolNum: 1,
    }
  },

  computed: {
    activeSetupIndex() {
      if (this.setups) {
        return this.setups.indexOf(testSetup => testSetup.data.id === this.activeSetup.id)
      }
      return ''
    },
    activeMaterial() {
      if (this.activeSetupIndex !== -1 && this.activeSetup) {
        return this.setups[this.activeSetupIndex].data.material
      }
      return ''
    },
    activeTools() {
      if (this.activeSetupIndex !== -1 && this.activeSetup) {
        return this.setups[this.activeSetupIndex].tools
      }
      return []
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
      this.showCalc = true
    },

    saveToolHandler(savedTool) {
      this.setups[this.activeSetupIndex][this.activeToolNum] = savedTool
    },

    deleteToolHandler() {
      this.setups[this.activeSetupIndex].splice(this.activeToolNum, 1)
    },

    showSetupHandler(targetSetup) {
      this.showSetup = true
    },

    duplicateSetupHandler(targetSetup) {
      const duplicatedSetup = this.setups.find(testSetup => testSetup.id !== targetSetup.id)
      this.setups.push(duplicatedSetup)
    },

    deleteSetupHandler(targetSetup) {
      this.setups.filter(testSetup => testSetup.id !== targetSetup.id)
    },

    saveSetupHandler(savedSetup) {
      this.activeSetup = savedSetup
      if (this.activeSetupIndex !== -1) {
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

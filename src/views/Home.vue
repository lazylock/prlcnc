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
      @about='aboutHandler'
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
    b-modal(:active.sync='showCalc' ref='calc' :canCancel='[0,0,0]' has-modal-card)
      calc(
        :material='activeMaterial'
        :activeMaxSpeed='activeMaxSpeed'
        :activeToolNum='activeToolIndex+1'
        :activeTool='activeTool'
         @saveTool='saveToolHandler'
         )
    b-modal(:active.sync='showSetup' :canCancel='[0,0,0]' has-modal-card)
      setup(
        @saveSetup='saveSetupHandler'
        :activeSetup='targetSetup'
        :activeSetupIndex='targetSetupIndex'
        )
    b-modal(:active.sync='showConfirm' :canCancel='[0,0,0]' has-modal-card)
      confirm(
        @confirm='confirmDeleteHandler'
        :name='targetSetupName'
        :index='targetSetupIndex'
        )
    b-modal(:active.sync='showAbout' has-modal-card)
      about()
    div(class='bottom hidden' ref='addTool')
      a(
        v-if='activeSetup'
        class='button circle is-rounded'
        @click='addToolHandler'
        ) Add Tool
</template>

<script>
import calc from '@/components/CalcComponent.vue'
import setup from '@/components/SetupComponent.vue'
import tool from '@/components/ToolComponent.vue'
import navigation from '@/components/NavComponent.vue'
import confirm from '@/components/ConfirmComponent.vue'
import about from '@/components/AboutComponent.vue'
import draggable from 'vuedraggable'

export default {
  components: {
    calc,
    setup,
    tool,
    draggable,
    navigation,
    confirm,
    about,
  },

  data() {
    return {
      showCalc: false,
      showSetup: false,
      showConfirm: false,
      showAbout: false,
      setups: [],
      activeSetupIndex: 0,
      activeToolIndex: 0,
      targetSetupIndex: 0,
      targetSetupName: '',
    }
  },

  computed: {
    targetSetup() {
      if (this.setups.length
      && this.targetSetupIndex < this.setups.length
      ) {
        return this.setups[this.targetSetupIndex]
      }
      return {}
    },

    activeSetup() {
      if (this.setups.length
      && this.activeSetupIndex < this.setups.length
      ) {
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

    activeMaxSpeed() {
      if (Object.keys(this.activeSetup).length) {
        return this.activeSetup.maxSpeed
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

  watch: {
    activeSetup() {
      if (Object.keys(this.activeSetup).length) {
        this.$refs.addTool.classList.remove('hidden')
      } else {
        this.$refs.addTool.classList.add('hidden')
      }
    },
    activeSetupIndex() {
      this.targetSetupIndex = this.activeSetupIndex
    },
  },

  mounted() {
    if (typeof (Storage) !== 'undefined') {
      if (window.localStorage.getItem('setups')) {
        this.setups = JSON.parse(window.localStorage.getItem('setups'))
      } else {
        window.localStorage.setItem('setups', JSON.stringify([]))
      }
    }
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
      this.updateLocalStorage()
    },

    deleteToolHandler(index) {
      this.setups[this.activeSetupIndex].tools.splice(index, 1)
      this.updateLocalStorage()
    },

    showSetupHandler(index) {
      this.activeSetupIndex = index
    },

    editSetupHandler() {
      this.showSetup = true
    },

    duplicateSetupHandler(setupIndex) {
      this.setups.splice(setupIndex + 1, 0, (JSON.parse(JSON.stringify(this.setups[setupIndex]))))
      this.activeSetupIndex = setupIndex + 1
      this.updateLocalStorage()
    },

    deleteSetupHandler(setupIndex) {
      this.targetSetupIndex = setupIndex
      this.targetSetupName = this.setups[setupIndex].name
      this.showConfirm = true
    },

    confirmDeleteHandler(setupIndex) {
      this.setups.splice(setupIndex, 1)
      if (setupIndex === this.activeSetupIndex || setupIndex >= this.setups.length) {
        this.activeSetupIndex = 0
      }
      this.updateLocalStorage()
    },

    addSetupHandler() {
      this.targetSetupIndex = this.setups.length
      this.showSetup = true
    },

    saveSetupHandler(savedSetup) {
      if (this.targetSetupIndex <= this.setups.length) {
        this.$set(this.setups, this.targetSetupIndex, savedSetup)
        this.activeSetupIndex = this.targetSetupIndex
      } else {
        this.$set(this.setups, this.targetSetupIndex + 1, savedSetup)
        this.activeSetupIndex = this.targetSetupIndex + 1
      }
      this.updateLocalStorage()
    },

    aboutHandler() {
      this.showAbout = true
    },

    updateLocalStorage() {
      window.localStorage.setItem('setups', JSON.stringify(this.setups))
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

.hidden
  display: none

.section
  width: 100%

</style>

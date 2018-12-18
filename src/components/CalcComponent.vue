<template lang='pug'>
  form(@keypress.enter='submitHandler')
    div(class='modal-card')
      header(class='modal-card-head')
        p(class='modal-card-title') Tool {{toolNum}}
        a(class='delete'  @click='$parent.close()' aria-label='close')
      section(class='modal-card-body')
        b-field(label='Tool Type')
          b-select(v-model='tool' expanded)
            option(
              v-for='option in toolOptions'
              v-bind:value='option.value'
              ) {{ option.text }}
        b-field(v-if="tool==='mill'" label='Tool Material')
          b-select(v-model='toolMat' expanded)
            option(
              v-for='option in toolMatOptions'
              v-bind:value='option.value'
              ) {{ option.text }}
        b-field(label='Tool Diameter')
          b-input(
            v-model='diameter'
            min='0'
            step='0.001'
            type='number')
        b-field(label='Number of Flutes')
          b-input(
            v-model='numFlutes'
            min='0'
            max='6'
            step='1'
            type='number')
        hr()
        b-field(label='Chip Load')
          div(class='control has-icons-right')
            b-input(
              v-model='chipLoad'
              min='0'
              step='0.001'
              type='number')
            span(class='icon is-right')
              a(@click="calculateChipLoad")
                i(class='fas fa-calculator clickable')
        b-field(label='Spindle Speed (rpm)')
          div(class='control has-icons-right')
            b-input(
              v-model='speed'
              min='0'
              step='1'
              type='number')
            span(class='icon is-right')
              a(@click="calculateSpeed")
                i(class='fas fa-calculator clickable')
        b-field(label='Feed Rate (in/min)')
          div(class='control has-icons-right')
            b-input(
              v-model='feed'
              min='0'
              step='1'
              type='number')
            span(class='icon is-right')
              a(@click="calculateFeed")
                i(class='fas fa-calculator clickable')
      footer(class='modal-card-foot')
        div(class='buttons columns')
          a(class='button column is-fullwidth' @click='init')
            span(class='icon is-small')
              i(class='fas fa-eraser')
          a(class='button column is-fullwidth' @click='addTool')
            span(class='icon is-small')
              i(class='fas fa-plus')
          a(class='button column is-fullwidth' @click='saveTool')
            span(class='icon is-small')
              i(class='fas fa-check')
</template>

<script>
import vals from '@/values.js';

export default {
  data() {
    return {
      //TODO: Move material to calc param, make global for job
      //TODO: Allow creation of jobs
      material: '',
      totalNumTools: '',
      toolNum: '',
      tool: '',
      toolMat: '',
      diameter: '',
      numFlutes: '',
      chipLoad: '',
      speed: '',
      feed: '',
      toolOptions: [
        { text: 'End Mill', value: 'mill' },
        { text: 'Drill', value: 'drill' },
        { text: 'Face Mill', value: 'face' },
        { text: 'Countersink', value: 'countersink' },
        { text: 'Reamer', value: 'reamer' },
        { text: 'Tap', value: 'tap' },
      ],
      toolMatOptions: [
        { text: 'HSS', value: 'hss' },
        { text: 'Carbide', value: 'carbide' },
      ],
      values: vals,
    };
  },

  watch: {
    tool() {
      this.calculate()
    },
    toolMat() {
      this.calculate()
    },
    diameter() {
      this.calculate()
    },
    numFlutes() {
      this.calculate()
    },
    chipLoad() {
      this.calculateFeed()
    },
  },

  methods: {
    submitHandler(event) {
      this.$emit('submit', event)
    },

    calculate() {
      this.calculateChipLoad()
      this.calculateSpeed()
      this.calculateFeed()
    },

    calculateChipLoad() {
      if (this.tool && this.material && this.diameter) {
        this.chipLoad = 0.001
      }
    },

    calculateSpeed() {
      if (this.tool && this.material && this.diameter) {
        this.speed = Math.round((this.values.sfm[this.tool][this.material] * 4) / this.diameter)
      }
    },

    calculateFeed() {
      if (this.chipLoad && this.numFlutes && this.speed) {
        this.feed = Math.round(this.chipLoad * this.numFlutes * this.speed)
      }
    },

    addTool() {
      this.doneTool()
      this.totalNumTools += 1
      this.toolNum = this.totalNumTools
      this.init()
    },

    saveTool() {
      this.doneTool()
      this.$parent.close()
    },

    doneTool() {
      const newTool = {
        tool: this.tool,
        toolMat: this.toolMat,
        diameter: this.diameter,
        numFlutes: this.numFlutes,
        chipLoad: this.chipLoad,
        speed: this.speed,
        feed: this.feed,
      }
      this.$emit('save', this.toolNum, newTool)
    },

    init() {
      this.tool = ''
      this.toolMat = ''
      this.diameter = ''
      this.numFlutes = ''
      this.chipLoad = ''
      this.speed = ''
      this.feed = ''
    },
  },
};
</script>

<style lang='sass'>
@import '@/styles/vars.sass'

.clickable
  pointer-events: initial

.modal-card
  padding: 0 1em

.modal-close
  display: none !important

.modal-card-foot
  justify-content: center !important

.buttons
  width: 100%

.button
  margin-top: 0.5rem

</style>

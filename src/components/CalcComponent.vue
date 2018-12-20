<template lang='pug'>
  form(@keypress.enter='submitHandler')
    div(class='modal-card')
      header(class='modal-card-head')
        p(class='modal-card-title') Tool {{toolNum}}
        a(class='delete' @click='$parent.close()' aria-label='close')
      section(class='modal-card-body')
        b-field(label='Type')
          b-select(v-model='tool.type' expanded)
            option(
              v-for='option in toolOptions'
              v-bind:value='option.value'
              ) {{ option.text }}
        b-field(v-if="tool.type==='mill'" label='Tool Material')
          b-select(v-model='tool.toolMat' expanded)
            option(
              v-for='option in toolMatOptions'
              v-bind:value='option.value'
              ) {{ option.text }}
        b-field(label='Diameter')
          b-input(
            v-model='tool.diameter'
            min='0'
            step='0.001'
            type='number')
        b-field(label='Number of Flutes')
          b-input(
            v-model='tool.numFlutes'
            min='0'
            max='6'
            step='1'
            type='number')
        hr()
        b-field(label='Chip Load')
          div(class='control has-icons-right')
            b-input(
              v-model='tool.chipLoad'
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
              v-model='tool.feed'
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
  props: [
    'material',
    'totalNumTools',
    'toolNum',
    'tool',
  ],

  data() {
    return {
      toolOptions: [
        { text: 'End Mill', value: 'mill' },
        { text: 'Ball End Mill', value: 'ball_end_mill' },
        { text: 'Drill', value: 'drill' },
        { text: 'Center Drill', value: 'center_drill' },
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
    type() {
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
    calculate() {
      this.calculateChipLoad()
      this.calculateSpeed()
      this.calculateFeed()
    },

    calculateChipLoad() {
      if (this.tool.type && this.material && this.tool.diameter) {
        this.tool.chipLoad = 0.001
      }
    },

    calculateSpeed() {
      if (this.tool.type && this.tool.material && this.tool.diameter) {
        const sfm = this.values.sfm[this.tool.type][this.material]
        this.tool.speed = Math.round((sfm * 4) / this.tool.diameter)
      }
    },

    calculateFeed() {
      if (this.tool.chipLoad && this.tool.numFlutes && this.tool.speed) {
        this.feed = Math.round(this.tool.chipLoad * this.tool.numFlutes * this.tool.speed)
      }
    },

    addTool() {
      this.doneTool()
      this.toolNum = this.totalNumTools + 1
      this.init()
    },

    saveTool() {
      this.doneTool()
      this.$parent.close()
    },

    doneTool() {
      const newTool = {
        type: this.tool.type,
        toolMat: this.tool.toolMat,
        diameter: this.tool.diameter,
        numFlutes: this.tool.numFlutes,
        chipLoad: this.tool.chipLoad,
        speed: this.tool.speed,
        feed: this.tool.feed,
      }
      this.$emit('saveTool', this.toolNum, newTool)
    },

    init() {
      this.tool.type = ''
      this.tool.toolMat = ''
      this.tool.diameter = ''
      this.tool.numFlutes = ''
      this.tool.chipLoad = ''
      this.tool.speed = ''
      this.tool.feed = ''
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

<template lang='pug'>
  form(@keypress.enter='submitHandler')
    div(class='modal-card')
      header(class='modal-card-head')
        p(class='modal-card-title') Tool {{toolNum}}
        a(class='delete' aria-label='close')
      section(class='modal-card-body')
        b-field(label='Material')
          b-select(v-model='material' placeholder='Select a Material' expanded)
            option(
              v-for='option in matOptions'
              v-bind:value='option.value'
              ) {{ option.text }}
        b-field(label='Tool Type')
          b-select(v-model='tool' placeholder='Select a Material' expanded)
            option(
              v-for='option in toolOptions'
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
                i(class='fas fa-undo clickable')
        b-field(label='Spindle Speed (rpm)')
          div(class='control has-icons-right')
            b-input(
              v-model='speed'
              min='0'
              step='1'
              type='number')
            span(class='icon is-right')
              a(@click="calculateSpeed")
                i(class='fas fa-undo clickable')
        b-field(label='Feed Rate (in/min)')
          div(class='control has-icons-right')
            b-input(
              v-model='feed'
              min='0'
              step='1'
              type='number')
            span(class='icon is-right')
              a(@click="calculateFeed")
                i(class='fas fa-undo clickable')
      footer(class='modal-card-foot')
        div(class='buttons' expanded)
          a(class='button is-left' @click='init')
            span(class='icon is-small')
              i(class='fas fa-eraser')
          a(class='button is-centered')
            span(class='icon is-small')
              i(class='fas fa-plus')
          a(class='button is-right')
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
      matOptions: [
        { text: 'Plastic', value: 'plastic' },
        { text: 'Aluminum', value: 'aluminum' },
        { text: 'Brass', value: 'brass' },
        { text: 'Bronze', value: 'bronze' },
        { text: 'Mild Steel', value: 'mild_steel' },
        { text: 'Stainless Steel', value: 'stainless_steel' },
      ],
      tool: '',
      toolNum: '',
      toolOptions: [
        { text: 'End Mill', value: 'mill' },
        { text: 'Drill', value: 'drill' },
        { text: 'Face Mill', value: 'face' },
      ],
      diameter: '',
      numFlutes: '',
      values: vals,
      chipLoad: '',
      speed: '',
      feed: '',
    };
  },

  watch: {
    material() {
      this.calculate()
    },
    tool() {
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

    init() {
      this.material = ''
      this.tool = ''
      this.toolNum = ''
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

.dropdown-menu
  max-width: none
  width: auto

</style>

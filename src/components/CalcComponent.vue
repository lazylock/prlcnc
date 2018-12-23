<template lang='pug'>
  form(@keypress.enter='submitHandler')
    div(class='modal-card')
      header(class='modal-card-head')
        p(class='modal-card-title') Tool {{activeToolNum}}
        a(class='delete' @click='exitHandler' aria-label='close')
      section(class='modal-card-body')
        b-field(label='Type' ref='type')
          b-select(
            :value='activeTool.type'
            @input='tool.type = $event'
            expanded
            )
            option(
              v-for='option in toolOptions'
              v-bind:value='option.value'
              ) {{ option.text }}
        b-field(v-if="tool.type==='mill'" label='Tool Material')
          b-select(
            :value='activeTool.toolMat'
            @input='tool.toolMat = $event'
            expanded
            )
            option(
              v-for='option in toolMatOptions'
              v-bind:value='option.value'
              ) {{ option.text }}
        b-field(label='Diameter' ref='diameter')
          b-input(
            :value='activeTool.diameter'
            @input='tool.diameter = $event'
            min='0'
            step='0.001'
            type='number')
        b-field(label='Number of Flutes')
          b-input(
            :value='activeTool.numFlutes'
            @input='tool.numFlutes = $event'
            min='0'
            max='6'
            maxlength='1'
            step='1'
            type='number')
        hr()
        b-field(label='Chip Load')
          div(class='control has-icons-right')
            b-input(
              :value='activeTool.chipLoad'
              @input='tool.chipLoad = $event'
              min='0'
              step='0.001'
              type='number')
            span(class='icon is-right')
              a(@click="calculateChipLoad")
                i(class='fas fa-calculator clickable')
        b-field(label='Spindle Speed (rpm)' ref='speed')
          div(class='control has-icons-right')
            b-input(
              :value='activeTool.speed'
              @input='tool.speed = $event'
              min='0'
              max='99999'
              step='1'
              type='number')
            span(class='icon is-right')
              a(@click="calculateSpeed")
                i(class='fas fa-calculator clickable')
        b-field(label='Feed Rate (in/min)' ref='feed')
          div(class='control has-icons-right')
            b-input(
              :value='activeTool.feed'
              @input='tool.feed = $event'
              min='0'
              max='999'
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
          a(class='button column is-fullwidth' type='submit' @click='saveTool')
            span(class='icon is-small')
              i(class='fas fa-check')
</template>

<script>
import vals from '@/values.js';

export default {
  props: [
    'material',
    'activeToolNum',
    'activeTool',
  ],

  data() {
    return {
      toolOptions: [
        { text: 'End Mill', value: 'mill' },
        { text: 'Ball End Mill', value: 'ball_end_mill' },
        { text: 'Drill', value: 'drill' },
        { text: 'Center Drill', value: 'center_drill' },
        { text: 'Face Mill', value: 'face_mill' },
        { text: 'Countersink', value: 'countersink' },
        { text: 'Reamer', value: 'reamer' },
        { text: 'Tap', value: 'tap' },
      ],
      toolMatOptions: [
        { text: 'HSS', value: 'hss' },
        { text: 'Carbide', value: 'carbide' },
      ],
      tool: {
        type: '',
        toolMat: '',
        diameter: '',
        numFlutes: '',
        chipLoad: '',
        speed: '',
        feed: '',
      },
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
  },

  mounted() {
    if (!Object.keys(this.activeTool).length) {
      this.init()
    }
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

    exitHandler() {
      this.$parent.close()
    },

    saveTool() {
      const save = () => {
        this.$emit('saveTool', this.tool)
        this.$parent.close()
      }
      this.checkFields(save)
    },

    checkFields(func) {
      if (this.tool.type && this.tool.diameter && this.tool.speed && this.tool.feed) {
        func()
      } else {
        if (!this.tool.type) {
          this.$refs.type.type = 'is-danger'
        }
        if (!this.tool.diameter) {
          this.$refs.diameter.type = 'is-danger'
        }
        if (!this.tool.speed) {
          this.$refs.speed.type = 'is-danger'
        }
        if (!this.tool.feed) {
          this.$refs.feed.type = 'is-danger'
        }
      }
    },

    init() {
      this.activeTool = Object.assign({}, this.activeTool, {
        type: '',
        toolMat: '',
        diameter: '',
        numFlutes: '',
        chipLoad: '',
        speed: '',
        feed: '',
      })
    },
  },
};
</script>

<style lang='sass'>
@import '@/styles/vars.sass'

.clickable
  pointer-events: initial

.modal-card
  padding: 2em 1em

.modal-close
  display: none !important

.modal-card-foot
  justify-content: center !important

.buttons
  width: 100%

.button
  margin-top: 0.5rem

</style>

<template lang='pug'>
  form(@submit.prevent='validateBeforeSubmit')
    div(class='modal-card')
      header(class='modal-card-head')
        p(class='modal-card-title') Tool {{activeToolNum}}
        a(class='delete' @click='exitHandler' aria-label='close')
      section(class='modal-card-body')
        b-field(
          label='Type'
          ref='type'
          :type="{'is-danger': errors.has('type')}"
          :message="errors.first('type')"
          )
          b-select(
            name='type'
            v-model='tool.type'
            v-validate='{ required: true }'
            expanded
            )
            option(
              v-for='option in toolOptions'
              v-bind:value='option.value'
              ) {{ option.text }}
        b-field(
          v-if="tool.type==='mill'"
          label='Tool Material'
          )
          b-select(
            v-model='tool.toolMat'
            expanded
            )
            option(
              v-for='option in toolMatOptions'
              v-bind:value='option.value'
              ) {{ option.text }}
        b-field(
          label='Diameter'
          ref='diameter'
          :type="{'is-danger': errors.has('diameter')}"
          :message="errors.first('diameter')"
          )
          b-input(
            name='diameter'
            v-model='tool.diameter'
            v-validate='{ required: true, min_value: 0, max_value: 10}'
            min='0'
            step='0.001'
            type='number')
        b-field(
          label='Number of Flutes'
          :type="{'is-danger': errors.has('number of flutes')}"
          :message="errors.first('number of flutes')"
          )
          b-input(
            name='number of flutes'
            v-model='tool.numFlutes'
            v-validate='{ min_value: 0, max_value: 6}'
            step='1'
            type='number')
        hr()
        b-field(
          label='Chip Load'
          :type="{'is-danger': errors.has('chip load')}"
          :message="errors.first('chip load')"
          )
          div(class='control has-icons-right')
            b-input(
              name='chip load'
              v-model='tool.chipLoad'
              v-validate='{ min_value: 0, max_value: 1 }'
              step='0.0001'
              type='number')
            span(class='icon is-right')
              a(@click="calculateChipLoad")
                i(class='fas fa-calculator clickable')
        b-field(
          label='Spindle Speed (rpm)'
          ref='speed'
          :type="{'is-danger': errors.has('speed')}"
          :message="errors.first('speed')"
          )
          div(class='control has-icons-right')
            b-input(
              name='speed'
              v-model='tool.speed'
              v-validate='{ required: true, min_value: 0, max_value: maxSpeed}'
              step='1'
              type='number')
            span(class='icon is-right')
              a(@click="calculateSpeed")
                i(class='fas fa-calculator clickable')
        b-field(
          label='Feed Rate (in/min)'
          ref='feed'
          :type="{'is-danger': errors.has('feed')}"
          :message="errors.first('feed')"
          )
          div(class='control has-icons-right')
            b-input(
              name='feed'
              v-model='tool.feed'
              v-validate='{ required: true, min_value: 0, max_value: 100}'
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
          button(class='button column is-fullwidth is-flex submit' type='submit')
            b-icon(pack='fas' size='is-small' icon='check')
</template>

<script>
import vals from '@/values.js';

export default {
  props: [
    'material',
    'activeMaxSpeed',
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

  computed: {
    maxSpeed() {
      if (this.activeMaxSpeed) {
        return this.activeMaxSpeed
      }
      return 100000
    },
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
    if (Object.keys(this.activeTool).length) {
      this.tool = Object.assign({}, this.tool, this.activeTool)
    } else {
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

    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$emit('saveTool', this.tool)
          this.$parent.close()
        }
      })
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

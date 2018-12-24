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
              :value='option.value'
              ) {{ option.text }}
        b-field(
          v-if="tool.type==='end_mill' || tool.type==='ball_end_mill'"
          label='Tool Material'
          )
          b-select(
            v-model='tool.toolMat'
            expanded
            )
            option(
              v-for='option in toolMatOptions'
              :value='option.value'
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
        b-field(class='space-above')
          h6(class='is-size-6 left-text has-text-weight-semibold') Automatic Calculation&nbsp
          b-switch(
            v-model='autoCalc'
          )
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
        { text: 'End Mill', value: 'end_mill' },
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
      autoCalc: true,
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
    'tool.type': function () {
      if (this.autoCalc) {
        this.calculate()
      }
    },
    'tool.toolMat': function () {
      if (this.autoCalc) {
        this.calculate()
      }
    },
    'tool.diameter': function () {
      if (this.autoCalc) {
        this.calculate()
      }
    },
    'tool.numFlutes': function () {
      if (this.autoCalc) {
        this.calculate()
      }
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
      this.$nextTick(() => {
        this.calculateFeed()
      })
    },

    calculateChipLoad() {
      if (this.tool.type && this.tool.diameter) {
        const dia = this.tool.diameter
        if (dia < 0.125) {
          this.$set(this.tool, 'chipLoad', this.values.chipLoad[this.material][0])
        } else if (dia < 0.25) {
          this.$set(this.tool, 'chipLoad', this.values.chipLoad[this.material][1])
        } else if (dia < 0.5) {
          this.$set(this.tool, 'chipLoad', this.values.chipLoad[this.material][2])
        } else if (dia < 1) {
          this.$set(this.tool, 'chipLoad', this.values.chipLoad[this.material][3])
        } else {
          this.$set(this.tool, 'chipLoad', this.values.chipLoad[this.material][4])
        }
      }
    },

    calculateSpeed() {
      if (this.tool.type && this.tool.diameter) {
        let sfm = 0
        switch (this.tool.type) {
          case 'end_mill':
          case 'ball_end_mill':
            if (this.tool.toolMat) {
              sfm = this.values.sfm.mill[this.tool.toolMat][this.material]
            } else {
              return
            }
            break
          case 'center_drill':
            sfm = this.values.sfm.drill[this.material]
            break
          default:
            sfm = this.values.sfm[this.tool.type][this.material]
        }
        this.tool.speed = Math.round((sfm * 12) / (this.tool.diameter * Math.PI))
      }
    },

    calculateFeed() {
      if (this.tool.chipLoad && this.tool.numFlutes && this.tool.speed) {
        this.tool.feed = Math.round(this.tool.chipLoad * this.tool.numFlutes * this.tool.speed)
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

.left-text
  flex-grow: 1

.space-above
  padding-top: 0.75rem

</style>

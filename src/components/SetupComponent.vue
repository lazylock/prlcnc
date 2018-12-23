<template lang='pug'>
  form(@submit.prevent='validateBeforeSubmit')
    div(class='modal-card')
      header(class='modal-card-head')
        p(class='modal-card-title')
          b-field(
            ref='name'
            :type="{'is-danger': errors.has('name')}"
            )
            b-input(
              class='title'
              size='is-large'
              name='name'
              v-model='setup.name'
              v-validate='{ required: true, max: 25 }'
              @focus='focusHandler'
              @blur='blurHandler'
              )
        a(class='delete' @click='exitHandler' aria-label='close')
      section(class='modal-card-body')
        b-field(
          ref='material'
          label='Material'
          :type="{'is-danger': errors.has('material')}"
          )
          b-select(
            v-model='setup.material'
            name='material'
            v-validate='{ required: true }'
            expanded
            )
            option(
              v-for='option in matOptions'
              v-model='option.value'
              ) {{ option.text }}
        b-field(
          label='Max Spindle Speed'
          :type="{'is-danger': errors.has('maxSpeed')}"
          )
          b-input(
            v-model='setup.maxSpeed'
            name='maxSpeed'
            v-validate='{ min_value: 0 }'
            step='1'
            type='number')
      footer(class='modal-card-foot')
        div(class='buttons columns')
          a(class='button column is-fullwidth' @click='init')
            span(class='icon is-small')
              i(class='fas fa-eraser')
          button(class='button column is-fullwidth is-flex submit' type='submit')
            b-icon(pack='fas' size='is-small' icon='check')
</template>

<script>

export default {
  props: [
    'activeSetup',
    'activeSetupIndex',
  ],

  data() {
    return {
      matOptions: [
        { text: 'Aluminum', value: 'aluminum' },
        { text: 'Plastic', value: 'plastic' },
        { text: 'Brass', value: 'brass' },
        { text: 'Mild Steel', value: 'mild_steel' },
        { text: 'Stainless Steel', value: 'stainless_steel' },
      ],
      setup: {
        name: '',
        material: '',
        maxSpeed: '',
        tools: [],
      },
    };
  },

  mounted() {
    if (Object.keys(this.activeSetup).length) {
      this.setup = Object.assign({}, this.setup, this.activeSetup)
    } else {
      this.setup.name = `Job ${this.activeSetupIndex + 1}`
    }
  },

  methods: {
    focusHandler(event) {
      event.target.classList.toggle('hidden-input')
    },

    blurHandler(event) {
      event.target.classList.toggle('hidden-input')
    },

    exitHandler() {
      if (Object.keys(this.activeSetup).length) {
        this.$parent.close()
      } else {
        if (!this.tool.name) {
          this.$refs.name.type = 'is-danger'
        }
        if (!this.tool.material) {
          this.$refs.material.type = 'is-danger'
        }
      }
    },

    clearHandler() {
      this.setup.name = ''
      this.setup.material = ''
      this.setup.maxSpeed = ''
    },

    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$emit('saveSetup', this.setup)
          this.$parent.close()
        }
      })
    },

    init() {
      this.setup.name = ''
      this.setup.material = ''
      this.setup.maxSpeed = ''
    },
  },
}
</script>

<style lang='sass'>
@import '@/styles/vars.sass'

.modal-card-title
  margin-right: 1rem
  flex-shrink: 1 !important

.modal-card-title input
  font-weight: 600

.counter
  display: none !important

.submit
  padding: 0 0.75rem !important

</style>

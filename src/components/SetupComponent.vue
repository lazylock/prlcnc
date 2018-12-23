<template lang='pug'>
  form()
    div(class='modal-card')
      header(class='modal-card-head')
        p(class='modal-card-title')
          b-field(ref='title')
            b-input(
              class='title'
              size='is-large'
              :value='activeSetup.name'
              @input='setup.name = $event'
              maxlength = '25'
              @focus='focusHandler'
              @blur='blurHandler'
              )
        a(class='delete' @click='exitHandler' aria-label='close')
      section(class='modal-card-body')
        b-field(ref='material' label='Material')
          b-select(
            :value='activeSetup.material'
            @input='setup.material = $event'
            expanded
            )
            option(
              v-for='option in matOptions'
              v-model='option.value'
              ) {{ option.text }}
        b-field(label='Max Spindle Speed')
          b-input(
            :value='activeSetup.maxSpeed'
            @input='setup.maxSpeed = $event'
            min='0'
            step='1'
            type='number')
      footer(class='modal-card-foot')
        div(class='buttons columns')
          a(class='button column is-fullwidth' @click='clearHandler')
            span(class='icon is-small')
              i(class='fas fa-eraser')
          a(class='button column is-fullwidth' @click='saveHandler')
            span(class='icon is-small')
              i(class='fas fa-check')
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
      },
    };
  },

  mounted() {
    this.init()
  },

  methods: {
    focusHandler(event) {
      event.target.classList.toggle('hidden-input')
    },

    blurHandler(event) {
      event.target.classList.toggle('hidden-input')
    },

    exitHandler() {
      const exit = () => {
        this.$parent.close()
      }
      this.checkFields(exit)
    },

    clearHandler() {
      this.setup.name = ''
      this.setup.material = ''
      this.setup.maxSpeed = ''
    },

    saveHandler() {
      const save = () => {
        this.$emit('saveSetup', this.setup)
        this.$parent.close()
      }
      this.checkFields(save)
    },

    checkFields(func) {
      if (this.setup.name && this.setup.material) {
        func()
      } else {
        if (!this.setup.name) {
          this.$refs.title.type = 'is-danger'
        }
        if (!this.setup.material) {
          this.$refs.material.type = 'is-danger'
        }
      }
    },

    init() {
      if (!this.activeSetup.name) {
        this.activeSetup = Object.assign({}, this.activeSetup, {
          name: `Job ${this.activeSetupIndex + 1}`,
          material: '',
          maxSpeed: '',
          tools: [],
        })
      }
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

</style>

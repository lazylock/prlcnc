<template lang='pug'>
  form(@keypress.enter='enterHandler')
    div(class='modal-card')
      header(class='modal-card-head')
        p(class='modal-card-title')
          b-field(ref='title')
            b-input(
              class='hidden-input title'
              size='is-large'
              v-model='setup.name'
              maxlength = '25'
              @focus='focusHandler'
              @blur='blurHandler'
              )
        a(class='delete' @click='$parent.close()' aria-label='close')
      section(class='modal-card-body')
        b-field(ref='material' label='Material')
          b-select(v-model='setup.material' expanded)
            option(
              v-for='option in matOptions'
              v-model='option.value'
              ) {{ option.text }}
        b-field(label='Max Spindle Speed')
          b-input(
            v-model='setup.maxSpeed'
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
    'setup',
    'setupIndex',
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

    clearHandler() {
      this.setup.name = ''
      this.setup.material = ''
      this.setup.maxSpeed = ''
    },

    saveHandler() {
      if (this.setup.name) {
        if (this.setup.material) {
          this.$emit('saveSetup', this.setup)
          this.$parent.close()
        } else {
          this.$refs.material.type = 'is-danger'
        }
      } else {
        this.$refs.title.type = 'is-danger'
      }
    },

    enterHandler() {

    },

    init() {
      if (!this.setup.name) {
        this.setup = Object.assign({}, this.setup, {
          name: `Job ${this.setupIndex + 1}`,
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
  margin-right: 1.5rem

.modal-card-title input
  font-weight: 600

.counter
  display: none !important

</style>

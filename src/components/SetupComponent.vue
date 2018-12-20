<template lang='pug'>
  form(@keypress.enter='enterHandler')
    div(class='modal-card')
      header(class='modal-card-head')
        p(class='modal-card-title')
          b-field()
            b-input(
              class='hidden-input title'
              size='is-large'
              v-model='setup.name'
              @focus='focusHandler'
              @blur='blurHandler'
              )
        a(class='delete' @click='$parent.close()' aria-label='close')
      section(class='modal-card-body')
        b-field(label='Material')
          b-select(v-model='setup.material' expanded)
            option(
              v-for='option in matOptions'
              v-bind:value='option.value'
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
      //if (Object.values(this.setup).every(val => val !== '')) {
        this.$emit('saveSetup', this.setup)
        this.$parent.close()
      //}
    },

    enterHandler() {

    },

    init() {
      if (!this.setup.id) {
        this.setup.name = ''
        this.setup.material = ''
        this.setup.maxSpeed = ''
        this.setup.id = Math.random()
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

.hidden-input input
  border: none
  background-color: transparent
  box-shadow: none
  transition: 0.25s

</style>

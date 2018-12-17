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
            step='0.125'
            type='number')
        b-field(label='Number of Flutes')
          b-input(
            v-model='numFlutes'
            min='0'
            max='6'
            step='1'
            type='number')
        b-field(label='Chip Load')
          b-input(
            v-model='chipLoad'
            min='0'
            step='0.001'
            type='number')
        span(id='speed') Speed: {{ speed }} rpm
        span(id='feed') Feed: {{ feed }} in/min
      footer(class='modal-card-foot')
        div(class='buttons' expanded)
          a(class='button is-left')
            span(class='icon is-small')
              i(class='fas fa-undo')
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
      chipLoad: '',
      values: vals,
    };
  },

  mounted() {
    this.init();
  },

  computed: {
    speed() {
      if (this.tool === 'face') {
        return Math.round((this.values.sfm[this.tool][this.material] * 4) / this.diameter);
      }
      return '';
    },
    feed() {
      return this.chipLoad * this.numFlutes * this.speed;
    },
  },

  methods: {
    submitHandler(event) {
      this.$emit('submit', event);
    },

    init() {
      this.material = '';
    },
  },
};
</script>

<style lang='sass'>
@import '@/styles/vars.sass'

</style>

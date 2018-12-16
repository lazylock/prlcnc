<template lang='pug'>
  form(@keypress.enter='submitHandler')
    select(v-model='material')
      option(
        v-for='option in matOptions' 
        v-if='option.tools.includes(tool)' 
        v-bind:value='option.value'
        ) {{ option.text }}
    select(v-model='tool')
      option(
        v-for='option in matOptions' 
        v-if='option.tools.includes(tool)' 
        v-bind:value='option.value'
        ) {{ option.text }}
    input(
      v-if="tool!='face'" 
      v-model='diameter' 
      placeholder='Tool Diameter' 
      min='0' 
      type='number')
    input(
      v-model='numFlutes' 
      placeholder='Number of Flutes' 
      min='0'
      max='6'
      type='number')
    input(
      v-model='chipLoad' 
      placeholder='Chip Load' 
      min='0'
      type='number')
    span(id='speed') Speed: {{ speed }} rpm
    span(id='feed') Feed: {{ feed }} in/min
</template>

<script>
import values from '@/values.js'

export default {

  data() {
    return {
      material,
      matOptions: [
        {text: 'Plastic', value: 'plastic', tools: ['mill','drill']},
        {text: 'Aluminum', value: 'aluminum', tools: ['mill','drill','face']},
        {text: 'Brass', value: 'brass', tools: ['mill','drill','face']},
        {text: 'Bronze', value: 'bronze', tools: ['mill','drill']},
        {text: 'Mild Steel', value: 'mild_steel', tools: ['mill','drill','face']},
        {text: 'Stainless Steel', value: 'stainless_steel', tools: ['mill','drill','face']},
      ],
      tool,
      toolOptions: [
        {text: 'End Mill', value: 'mill'},
        {text: 'Drill', value: 'drill'},
        {text: 'Face Mill', value: 'face'},
      ],
      diameter,
      numFlutes,
      chipLoad,
      speed,
      feed,
    }
  },

  mounted() {
    this.init()
  },

  computed: {
    speed() {
      if(this.tool === 'face')
        return Math.round(this.values[this.tool][this.material]*4/this.diameter)
      else if (this.tool)
        return Math.round(this.values[this.tool][this.material]*12/Math.PI/this.diameter)
      else
        return ''
    },
    feed() {
      return this.chipLoad*this.numFlutes*this.speed
    },
  },

  methods: {
    submitHandler(event) {
      this.$emit('submit',this)
    },

    init() {
      this.material = '';
    },
  },
}
</script>

<style lang='sass'>
@import '@/styles/vars.sass'

</style>

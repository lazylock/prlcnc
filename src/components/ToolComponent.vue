<template lang='pug'>
  div(class='card')
    div(class='card-content')
      div(class='drag')
        span(class='icon has-text-grey-light')
          i(class='fas fa-grip-vertical')
      div(class='tool')
        h4(class='title is-4') {{title}}
      div(class='speed')
        h6(class='subtitle is-6') Speed: {{tool.speed}} rpm
      div(class='feed')
        h6(class='subtitle is-6') Feed: {{tool.feed}} in/min
      div(class='trash')
        a(@click='deleteHandler')
          span(class='icon has-text-grey-light')
            i(class='fas fa-trash-alt clickable')
      div(class='edit')
        a(@click='editHandler')
          span(class='icon has-text-grey-light')
            i(class='fas fa-pencil-alt clickable')
</template>

<script>

export default {

  props: [
    'toolNum',
    'tool',
  ],

  computed: {
    name() {
      if (this.tool.type) {
        return this.tool.type
          .toLowerCase()
          .split('_')
          .map(word => word[0].toUpperCase() + word.substr(1))
          .join(' ')
      }
      return ''
    },

    title() {
      return `T${this.toolNum}\u00A0|\u00A0${this.tool.diameter}" ${this.name}`
    },
  },

  methods: {
    editHandler() {
      this.$emit('editTool', this.toolNum)
    },

    deleteHandler() {
      this.$emit('deleteTool', this.toolNum)
    },
  },
};
</script>

<style lang='sass'>
@import '@/styles/vars.sass'

.card
  margin: 0.5rem
  height: 7.5rem
  border-radius: 6px

.card-content
  height: 100%
  padding: 1rem !important
  display: grid
  grid-template-columns: 2rem 1fr 1fr 2rem
  grid-auto-rows: 1fr
  grid-template-areas: 'drag tool tool trash' 'drag speed feed edit'

.card-content *
  display: flex
  align-items: center

.drag
  grid-area: drag

.tool
  grid-area: tool
  padding-left: 0.5rem

.trash
  grid-area: trash
  justify-content: flex-end

.speed
  grid-area: speed
  padding-left: 0.5rem

.feed
  grid-area: feed

.edit
  grid-area: edit
  justify-content: flex-end

.clickable
  pointer-events: initial

</style>

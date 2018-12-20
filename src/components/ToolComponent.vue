<template lang='pug'>
  div(class='card')
    div(class='card-content')
      div(class='drag')
        span(class='icon')
          i(class='fas fa-grip-vertical')
      div(class='tool')
        p(class='title') T{{toolNum}} | {{tool.diameter}}" {{name}}
      div(class='speed')
        p(class='subtitle') Speed: {{tool.speed}} rpm
      div(class='feed')
        p(class='subtitle') Feed: {{tool.feed}} in/min
      div(class='trash')
        a(@click='trashHandler')
          span(class='icon')
            i(class='fas fa-trash-alt clickable')
      div(class='edit')
        a(@click='editHandler')
          span(class='icon')
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
      return this.type
        .toLowerCase()
        .split('_')
        .map(word => word[0].toUpperCase() + word.substr(1))
        .join(' ')
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

.card-content
  height: 100%
  padding: 1rem !important
  display: grid
  grid-template-columns: 2rem auto auto 2rem
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

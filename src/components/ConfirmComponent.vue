<template lang='pug'>
  div(class='modal-card')
    header(class='modal-card-head has-text-centered')
      p(class='modal-card-title') Confirm
      a(class='delete' @click='exitHandler' aria-label='close')
    section(class='modal-card-body has-text-centered')
      p() Delete {{name}}?
    footer(class='modal-card-foot')
      div(class='buttons columns')
        button(class='button column is-fullwidth' @click='exitHandler')
          b-icon(pack='fas' size='is-small' icon='times')
        button(class='button column is-fullwidth' @click='confirmHandler')
          b-icon(pack='fas' size='is-small' icon='check')
</template>

<script>

export default {
  props: [
    'name',
    'index',
  ],

  methods: {
    confirmHandler() {
      this.$emit('confirm', this.index)
      this.$parent.close()
    },

    exitHandler() {
      this.$parent.close()
    },
  },
}
</script>

<style lang='sass'>
@import '@/styles/vars.sass'

.button
  padding: 0 0.75rem !important

</style>

<template lang='pug'>
  nav(class='navbar is-fixed-top' role='navigation' aria-label='main navigation')
    div(class='navbar-brand')
      p(class='navbar-item') PRLCNC
      a(v-if='activeSetup.name' class='navbar-item' @click='editHandler') {{activeSetup.name}}
      a(
        role='button'
        class='navbar-burger burger'
        ref='burger'
        aria-label='menu'
        aria-expanded='false'
        data-target='setupList'
        @click='burgerHandler'
        )
        span(aria-hidden='true')
        span(aria-hidden='true')
        span(aria-hidden='true')
    div(id='setupList' class='navbar-menu' ref='menu')
      div(class='navbar-start')
      div(class='navbar-end')
        div(class='navbar-item has-dropdown is-boxed is-hoverable is-right')
          a(class='navbar-link') Setups
          div(class='navbar-dropdown')
            div(
              class='navbar-item is-flex'
              v-for='(setup,index) in setups'
              )
              a(class='has-text-grey-darker setup' @click='showHandler(index)')
                div() {{setup.name}}
              a(class='is-pulled-right icon-margin' @click='duplicateHandler(index)')
                span(class='icon has-text-grey-light')
                  i(class='fas fa-copy clickable')
              a(class='is-pulled-right' @click='deleteHandler(index)')
                span(class='icon has-text-grey-light')
                  i(class='fas fa-trash-alt clickable')
            hr(class='navbar-divider')
            a(class='navbar-item has-text-grey-darker' @click='addHandler') Add Setup
        a(class='navbar-item') About
</template>

<script>

export default {

  props: [
    'setups',
    'activeSetup',
  ],

  methods: {
    burgerHandler() {
      this.$refs.burger.classList.toggle('is-active')
      this.$refs.menu.classList.toggle('is-active')
    },

    showHandler(index) {
      this.$emit('showSetup', index)
    },

    editHandler() {
      this.$emit('editSetup')
    },

    addHandler() {
      this.$emit('addSetup')
    },

    duplicateHandler(index) {
      this.$emit('duplicateSetup', index)
    },

    deleteHandler(index) {
      this.$emit('deleteSetup', index)
    },
  },
};
</script>

<style lang='sass'>
@import '@/styles/vars.sass'

nav
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)

.navbar-brand
  display: flex
  text-align: center

.icon-margin
  margin-right: 1em

.setup
  flex-grow: 1

</style>

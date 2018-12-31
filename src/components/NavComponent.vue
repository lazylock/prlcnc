<template lang='pug'>
  nav(
    class='navbar is-fixed-top is-transparent'
    role='navigation'
    aria-label='main navigation')
    div(class='navbar-brand has-text-weight-bold')
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
        div(class='navbar-item has-dropdown is-boxed is-hoverable')
          a(class='navbar-link has-text-weight-bold') Setups
          div(class='navbar-dropdown is-right has-background-primary')
            div(
              class='navbar-item is-flex'
              v-for='(setup,index) in setups'
              )
              a(class='setup' @click='showHandler(index)')
                div() {{setup.name}}
              a(class='is-pulled-right icon-margin' @click='duplicateHandler(index)')
                span(class='icon')
                  i(class='fas fa-copy clickable has-text-light')
              a(class='is-pulled-right' @click='deleteHandler(index)')
                span(class='icon')
                  i(class='fas fa-trash-alt clickable has-text-light')
            hr(class='navbar-divider')
            a(class='navbar-item' @click='addHandler') Add Setup
        a(class='navbar-item has-text-weight-bold' @click='aboutHandler') About
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
      this.burgerHandler()
    },

    editHandler() {
      this.$emit('editSetup')
    },

    addHandler() {
      this.$emit('addSetup')
      this.burgerHandler()
    },

    duplicateHandler(index) {
      this.$emit('duplicateSetup', index)
    },

    deleteHandler(index) {
      this.$emit('deleteSetup', index)
      this.burgerHandler()
    },

    aboutHandler() {
      this.$emit('about')
      this.burgerHandler()
    },
  },
};
</script>

<style lang='sass'>
@import '@/styles/vars.sass'

nav
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)

nav *
  color: white !important

.navbar-brand
  display: flex
  text-align: center

.icon-margin
  margin-right: 1em

.setup
  flex-grow: 1
  padding-right: 0.75rem

.burger span
  height: 2px

nav a:hover
  background-color: transparent !important

.navbar-link::after
  border-color: white !important

</style>

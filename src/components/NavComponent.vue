<template lang='pug'>
  nav(class='navbar' role='navigation' aria-label='main navigation')
    div(class='navbar-brand')
      p(class='navbar-item') PRLCNC | {{activeSetup}}
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
        div(class='navbar-item has-dropdown is-hoverable')
          a(class='navbar-link') Setups
          div(class='navbar-dropdown')
            a(class='navbar-item' v-for='setup in setups' @click='showHandler') {{setup.name}}
              a(@click='duplicateHandler(setup.id)')
                span(class='icon')
                  i(class='fas fa-copy clickable')
              a(@click='deleteHandler(setup.id)')
                span(class='icon')
                  i(class='fas fa-trash-alt clickable')
            hr(class='navbar-divider')
            a(class='navbar-item') Add Setup
      div(class='navbar-end')
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

    showHandler(setup) {
      this.$emit('showSetup', setup)
    },

    addHandler() {
      this.$emit('addSetup')
    },

    duplicateHandler(setup) {
      this.$emit('duplicateSetup', setup)
    },

    deleteHandler(setup) {
      this.$emit('deleteSetup', setup)
    },
  },
};
</script>

<style lang='sass'>
@import '@/styles/vars.sass'

.navbar-brand
  display: flex
  text-align: center

</style>

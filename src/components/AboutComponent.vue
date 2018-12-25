<template lang='pug'>
  div(class='modal-card')
    header(class='modal-card-head has-text-centered')
      p(class='modal-card-title') &nbsp&nbsp&nbspAbout
      a(class='delete' @click='exitHandler' aria-label='close')
    section(class='modal-card-body no-footer')
      p() PRLCNC is intended to help in two areas  of CNC work. The calculator gives rough estimates of parameters to be set up in the CAM. The tool list provides a handy reference when the setup needs to be checked off.
      br()
      p(class='has-text-centered') Created by&nbsp
        a(href='http://winstonliao.com' target='_blank') Winston Liao
      p(class='has-text-centered') Built with&nbsp
        a(href='https://vuejs.org/' target='_blank') Vue.js
        span() &nbspand&nbsp
        a(href='https://buefy.github.io/' target='_blank') Buefy
      p(class='has-text-centered')
        a(href='data.xlsx' target='_blank') Source Data
</template>

<script>

export default {
  methods: {
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

.no-footer
  border-radius: 0 0 6px 6px

</style>

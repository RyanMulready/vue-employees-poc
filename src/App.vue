<template>
  <q-layout ref="layout" view="hHr LpR lFf" :right-breakpoint="1100" v-if="$route.name">
    <titlebar slot="header" />
    <navigation slot="navigation" />
    <router-view />
    <q-ajax-bar ref="bar" />
    <q-toolbar slot="footer">
      <q-toolbar-title>
        Footer
      </q-toolbar-title>
    </q-toolbar>
  </q-layout>
</template>

<script>
import navigation from '~/src/components/global/navigation.vue'
import titlebar from '~/src/components/global/header.vue'
import { mapActions } from 'vuex'

export default {
  created () {
    this.loadMetaData()
  },
  methods: {
    ...mapActions('metadata', ['loadMetaData'])
  },
  components: {
    navigation,
    titlebar
  }
}
</script>

<style></style>

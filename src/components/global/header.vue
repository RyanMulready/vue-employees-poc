<template>
  <q-toolbar>
    <q-toolbar-title>
    </q-toolbar-title>
    <div v-if="metaData.user.messages">
      <q-btn flat @click="$router.push({name: 'accountInfo'})" >
      <q-item>
        <q-item-side :avatar="metaData.user.avatar" />
        </q-item>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  created () {
  },
  computed: {
    ...mapState({
      metaData: state => state.metadata.metaData
    })
  }
}
</script>

<style></style>

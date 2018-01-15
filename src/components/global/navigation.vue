<template>
  <div v-if="['login', 'register'].indexOf($route.name) == -1">
    <q-tabs>
        <q-route-tab icon="home" to="/" exact slot="title" :label="$t('home')" />
        <q-route-tab v-if="metaData.user.permissions.employees" icon="wc" to="/employees" exact slot="title" :label="$t('employees')" />
    </q-tabs>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      metaData: state => state.metadata.metaData
    })
  }
}
</script>

<style></style>

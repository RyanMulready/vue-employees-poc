<template>
 <div class="row justify-center">
    <q-card inline class="bigger" style="width: 500px">
      <q-card-title>{{ 'Login' | translate }}</q-card-title>
        <q-card-main>
          <q-field :error="$v.loginRequest.user.$error" :error-label="$t('Please enter a username')">
            <q-input v-model="loginRequest.user" :stack-label="$t('username')" @blur="$v.loginRequest.user.$touch" />
          </q-field>
          <q-field :error="$v.loginRequest.password.$error" :error-label="$t('Please enter a password')">
            <q-input type="password" v-model="loginRequest.password" :stack-label="$t('password')" @blur="$v.loginRequest.password.$touch" />
          </q-field>
        </q-card-main>
        <q-card-separator />
        <q-card-actions align="end">
          <q-btn color="primary" @click="submitLogin">{{'login' | translate}}</q-btn>
        </q-card-actions>
  </q-card>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      loginRequest: {
        user: '',
        password: ''
      }
    }
  },
  components: {},
  methods: {
    ...mapActions('user', ['postLoginData']),
    submitLogin: function (event, done) {
      this.$v.loginRequest.$touch()

      if (!this.$v.loginRequest.$invalid) {
        this.postLoginData(this.loginRequest)
      }
      else {
        done()
      }
    }
  },
  validations: {
    loginRequest: {
      user: { required },
      password: { required }
    }
  }
}
</script>

<style>

</style>

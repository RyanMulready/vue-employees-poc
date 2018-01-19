<template>
  <div>
    <breadcrumbs>
        <li slot="link">
          <router-link to="/employees">
            <a>
              <q-icon name="wc" /> {{ $t('employees') }}
            </a>
          </router-link>
        </li>
        <li slot="link">
          <a>
            <q-icon name="wc" /> {{ $t('employee') }}
          </a>
        </li>
    </breadcrumbs>
    <div class="list" style="padding:15px" v-if="employeeData">
      <div class="row xl-gutter">
        <div class="col">
          <h6>{{'employee information' | translate}}</h6>

          <q-list v-if="$route.params.id !== 'new'">
            <q-item>
              <q-item-main :label="$t('last login')" label-lines="1" />
              <q-item-side right :stamp="employeeData.login | dateTimeFilter" />
            </q-item>

            <q-item>
              <q-item-side />
              <q-item-main :label="$t('username')" label-lines="1" />
              <q-item-side right :stamp="employeeData.username" />
            </q-item>
          </q-list>

            <q-field :error="$v.employeeData.firstname.$error" :error-label="$t('please enter a name')">
               <q-input v-model="employeeData.firstname" type="text" :stack-label="$t('first name')" />
            </q-field>

            <q-field :error="$v.employeeData.lastname.$error" :error-label="$t('please enter a name')">
               <q-input v-model="employeeData.lastname" type="text" :stack-label="$t('last name')" />
            </q-field>

            <q-field :error="$v.employeeData.email.$error" :error-label="$t('please type a valid email')">
               <q-input v-model="employeeData.email" type="text" :stack-label="$t('email')" />
            </q-field>

            <br />
            <h6>{{'phone information' | translate}}</h6>

            <q-field>
              <q-input v-model="employeeData.phone" type="text" :stack-label="$t('phone number')" />
            </q-field>

            <q-field>
              <q-input v-model="employeeData.extension" type="text" :stack-label="$t('extension')" />
            </q-field>

            <q-field>
              <q-input v-model="employeeData.altphone" type="text" :stack-label="$t('alt phone number')" />
            </q-field>

            <q-field>
              <q-input v-model="employeeData.mobile" type="text" :stack-label="$t('mobile phone number')" />
            </q-field>

            <q-field>
              <q-select :stack-label="$t('mobile provider')" v-model="employeeData.mobileprovider.value" :options="prefixArray(this.metaData.mobileproviders, 'select', '')" filter :filter-placeholder="$t('type to filter')" />
            </q-field>

            <q-field>
              <q-input v-model="employeeData.pager" type="text" :stack-label="$t('pager')" />
            </q-field>

            <q-field>
              <q-input v-model="employeeData.fax" type="text" :stack-label="$t('fax')" />
            </q-field>

            <q-field>
              <q-input v-model="employeeData.contact" type="text" :stack-label="$t('emergency contact')" />
            </q-field>

        </div>
        <div class="col">

          <h6>{{'address information' | translate}}</h6>

            <q-field>
              <q-input v-model="employeeData.address" type="text" :stack-label="$t('street address')" />
            </q-field>

            <q-field>
              <q-input v-model="employeeData.state" type="text" :stack-label="$t('state')" />
            </q-field>

            <q-field>
              <q-input v-model="employeeData.zip" type="text" :stack-label="$t('zip')" />
            </q-field>

            <q-field>
              <q-select :stack-label="$t('floor and suite')" v-model="employeeData.floor.value" :options="prefixArray(this.metaData.floors, 'select', '')" filter :filter-placeholder="$t('type to filter')" />
            </q-field>

            <q-field>
              <q-input v-model="employeeData.location" type="text" :stack-label="$t('location')" />
            </q-field>

            <br /><h6>{{'permissions' | translate}}</h6>

            <q-field>
              <q-toggle v-model="employeeData.permissions.employees" :label="$t('employees')" />
            </q-field>
        </div>
      </div>
      <q-btn class="float-right" color="primary" @click="submitItem">{{'save' | translate}}</q-btn>
      <br /><br />
    </div>
  </div>
</template>

<script>
import breadcrumbs from '~/src/components/shared/breadcrumbs.vue'
import pageactions from '~/src/components/shared/pageactions.vue'
import { quillEditor } from 'vue-quill-editor'
import uuid from 'uuid/v4'
import { required, email } from 'vuelidate/lib/validators'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {}
  },
  created () {
    this.setEmployeeData()
  },
  computed: {
    ...mapState({
      metaData: state => state.metadata.metaData
    }),
    ...mapGetters('employees', ['getEmployeeById']),
    employeeData: function () {
      if (this.$route.params.id === 'new') {
        return this._data.schema.newEmployee
      }
      else {
        return this.getEmployeeById(this.$route.params.id)
      }
    }
  },
  methods: {
    ...mapActions('employees', ['postEmployeeData', 'loadEmployeeData']),
    setEmployeeData: function () {
      if (this.$route.params.id === 'new') {
        this.$set(this._data.schema.newEmployee, 'id', uuid())
      }
      else {
        this.loadEmployeeData(this.$route.params.id)
      }
    },
    submitItem: function (event, done) {
      this.$v.employeeData.$touch()

      if (!this.$v.employeeData.$invalid) {
        this.postEmployeeData(this.employeeData)
      }
      else {
        done()
      }
    }
  },
  validations: {
    employeeData: {
      firstname: { required },
      lastname: { required },
      email: { required, email }
    }
  },
  components: {
    breadcrumbs,
    pageactions,
    quillEditor
  }
}
</script>

<style scoped>
.q-item-main{
  padding-left:10px;
}
</style>

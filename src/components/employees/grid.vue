<template>
  <div>
    <breadcrumbs>
        <li slot="link">
          <a>
            <q-icon name="wc" /> {{ $t('employees') }}
          </a>
        </li>
    </breadcrumbs>

    <div v-if="metaData.columns.employeescolumns.length > 0">
      <q-data-table :data="employeesArray" :config="config" :columns="metaData.columns.employeescolumns" @refresh="refresh">
        <template slot="col-name" slot-scope="cell">
           <router-link :to="{ name: 'employeesItem', params: { id: cell.row.id }}">{{ cell.row.firstname }}, {{ cell.row.firstname }}</router-link>
        </template>
        <template slot="col-login" slot-scope="cell">
          {{ cell.data | dateFilter }}
        </template>
      </q-data-table>
    </div>
  </div>
</template>
<script>
import breadcrumbs from '~/src/components/shared/breadcrumbs.vue'
import pageactions from '~/src/components/shared/pageactions.vue'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  data () {
    return {
      page: 1,
      searchFormData: {
        name: '',
        dateRange: {
          min: moment('2001-01-01T00:00:00').format(),
          max: moment().format(),
          range: {
            from: moment('2001-01-01T00:00:00').format(),
            to: moment().format()
          }
        }
      }
    }
  },
  created () {
    this.loadEmployeesArray()
  },
  computed: {
    ...mapState({
      metaData: state => state.metadata.metaData,
      employeesArray: state => state.employees.employeesArray
    }),
    config: function () {
      return {
        rowHeight: '50px',
        columnPicker: false,
        selection: false,
        pagination: {
          rowsPerPage: 15,
          options: [5, 10, 15, 30, 50, 500]
        },
        messages: {
          noData: this.$t('No data available to show.'),
          noDataAfterFiltering: this.$t('No results. Please refine your search terms.')
        }
      }
    }
  },
  methods: {
    ...mapActions('employees', ['loadEmployeesArray', 'clearEmployeesArray']),
    refresh: function (done) {
      this.clearEmployeesArray()
      this.loadEmployeesArray(this.searchFormData)
      done()
    },
    advancedSearch: function (event, done) {
      this.clearEmployeesArray()
      this.loadEmployeesArray(this.searchFormData)
      done()
    }
  },
  filters: {},
  components: {
    breadcrumbs,
    pageactions
  },
  validations: {}
}
</script>

<style scoped>

</style>

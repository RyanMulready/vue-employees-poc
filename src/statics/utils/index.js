import moment from 'moment'
import schema from './schema'

export default {
  data () {
    return {
      schema,
      editorOption: {
        modules: {
          toolbar: [
            [{ 'size': ['small', false, 'large'] }],
            ['bold', 'italic'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image']
          ]
        }
      }
    }
  },
  filters: {
    dateFilter (value, row) {
      if (value) {
        value = moment(value).format('MM/DD/YYYY')
      }

      return value
    },
    timeFilter (value, row) {
      if (value) {
        value = moment(value).format('h:mm:ss a')
      }

      return value
    },
    dateTimeFilter (value, row) {
      if (value) {
        value = moment(value).format('MM/DD/YYYY h:mm:ss a')
      }

      return value
    },
    checkMarkFilter (value, row) {
      if (value) {
        return 'check'
      }
      else {
        return ''
      }
    }
  },
  methods: {
    clearModal: function () {
      if (this.$v.popupForm.$dirty) {
        Object.assign(this.$data, this.$options.data.apply(this))
        this.$v.popupForm.$reset()
      }
    },
    prefixArray: function (array, key, value) {
      let prefixedArray = JSON.parse(JSON.stringify(array))
      prefixedArray.unshift({
        'label': this.$t(key),
        'value': value
      })
      return prefixedArray
    }
  }
}

<template>
  <b-card>
    <div slot="header">
      <i class="fa fa-id-card-o"></i> {{ $t('i18n.maintable_title') }}
        <label class="switch switch-sm switch-text switch-info float-right mb-0">
          <input type="checkbox" class="switch-input" v-model="autoRefreshEnabled" value="false" unchecked-value="true">
          <span class="switch-label" data-on="on" data-off="off"></span>
          <span class="switch-handle"></span>
        </label>
      </div>
    <b-table 
    :hover="hover" 
    :striped="striped" 
    :bordered="bordered" 
    :small="small" 
    :fixed="fixed" 
    class="table-responsive-sm" 
    :items="items" 
    :fields="fields" 
    :disabled="!isAutoRefreshEnabled"
    :current-page="currentPage" 
    :per-page="perPage"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc">
    
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
    </b-table>
    <nav v-if="showPageNavigator">
      <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>

<script>
export default {
  name: 'table',
  props: {
    caption: {
      type: String,
      default: 'Table'
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: ''
    }
  },
  data () {
    return {
      isBusy: false,
      sortBy: 'Time',
      sortDesc: true,
      fields: [
        {
          key: 'de',
          label: 'DE',
          sortable: true
        },
        {
          key: 'frequency',
          label: 'Frequency',
          sortable: true
        },
        {
          key: 'dx',
          label: 'DX',
          sortable: true
        },
        {
          key: 'comment',
          label: 'Comment',
          sortable: true
        },
        {
          key: 'time',
          label: 'Time UTC 0',
          sortable: true
        }
      ],
      currentPage: 1,
      perPage: 15,
      totalRows: 0,
      showPageNavigator: this.items.length > this.perPage,
      autoRefreshEnabled: this.$store.getters.autoRefreshEnabled
    }
  },
  watch: {
    autoRefreshEnabled (val) {
      this.$store.commit('setAutoRefreshEnabled', val)
    }
  },
  methods: {
    getBadge (status) {
      return status === 'Active'
        ? 'success'
        : status === 'Inactive'
          ? 'secondary'
          : status === 'Pending'
            ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getRowCount (items) {
      return items.length
    }
  },
  computed: {
    isAutoRefreshEnabled () {
      return this.autoRefreshEnabled
    }
  }
}
</script>

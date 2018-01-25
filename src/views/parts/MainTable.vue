<template>
  <b-card :header="tableCaption">
    <b-table 
    :hover="hover" 
    :striped="striped" 
    :bordered="bordered" 
    :small="small" 
    :fixed="fixed" 
    class="table-responsive-sm" 
    :items="items" 
    :fields="fields" 
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
/**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

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
  data: () => {
    return {
      isBusy: false,
      sortBy: 'delta',
      sortDesc: true,
      fields: [
        {
          key: 'pair',
          label: 'Pair name',
          sortable: false
        },
        {
          key: 'delta',
          label: 'Delta %',
          sortable: true
        },
        {
          key: 'wex_price',
          label: 'WEX',
          sortable: true
        },
        {
          key: 'bitfinex_price',
          label: 'Bitfinex',
          sortable: true
        },
        {
          key: 'kraken_price',
          label: 'Kraken',
          sortable: true
        },
        {
          key: 'cexio_price',
          label: 'CEX.io',
          sortable: true
        }
      ],
      currentPage: 1,
      perPage: 7,
      totalRows: 0,
      showPageNavigator: shuffleArray.length > this.perPage
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
    tableCaption () {
      return "<i class='fa fa-line-chart fa-lg'></i> " + this.$i18n.t('i18n.maintable_title')
    }
  }
}
</script>

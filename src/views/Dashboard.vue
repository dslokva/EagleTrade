<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <mainTable :items="getItems" hover></mainTable>
      </b-col>
    </b-row>
   
    <b-button variant="primary" @click="getPublicCoinsData()"><i class="fa fa-refresh"></i>&nbsp; Refresh data</b-button>

    <section v-if="authRequired()">
      <b-row align-h="end">
        <b-col md="4">
          <b-card size="sm" border-variant="secondary"
                header="Server time"
                header-border-variant="secondary"
                align="center">
            <!-- <p class="card-text">{{ getTick }}</p> -->
            <span class="text-muted medium"> {{ getTick }} </span>
          </b-card>
        </b-col>
      </b-row>
    </section>
  </div>
</template>

<script>
import mainTable from './parts/MainTable'
import { isLoggedIn } from '../utils/auth'

export default {
  name: 'Dashboard',

  data () {
    return {
      items: [
        {
          pair: 'Bitcoin',
          delta: '5%',
          wex_price: '12400',
          bitfinex_price: '12982',
          kraken_price: '12345',
          cexio_price: '14890'
        },
        {
          pair: 'Etherium',
          delta: '1%',
          wex_price: '1200',
          bitfinex_price: '1250',
          kraken_price: '1234',
          cexio_price: '1489'
        },
        {
          pair: 'ZCash',
          delta: '3%',
          wex_price: '760',
          bitfinex_price: '754',
          kraken_price: '767',
          cexio_price: '789'
        },
        {
          pair: 'Litecoin',
          delta: '18%',
          wex_price: '250',
          bitfinex_price: '245',
          kraken_price: '256',
          cexio_price: '271'
        }
      ]
    }
  },
  components: {
    mainTable
  },
  methods: {
    authRequired: function () {
      return isLoggedIn()
    },
    getPublicCoinsData () {
      this.$socket.send(
        JSON.stringify({ request: 'getPublicCoinsData' })
      )
    }
  },
  computed: {
    getTick () {
      return this.$store.getters.serverTick
    },
    getItems () {
      return this.items
    }
  }
}
</script>

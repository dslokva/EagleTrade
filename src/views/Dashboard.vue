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
          // pair: '---',
          // delta: '0%',
          // wex_price: '0',
          // bitfinex_price: '0',
          // kraken_price: '0',
          // cexio_price: '0'
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
    getCoinData () {
      return this.$store.getters.publicCoinData
    },
    getItems () {
      let storeObjects = JSON.parse(JSON.stringify(this.getCoinData))
      if (storeObjects.wex_public) {
        let wexCoinData = storeObjects.wex_public
        this.items.length = 0

        for (let i = 0; i < wexCoinData.length; i++) {
          let wexCoin = JSON.parse(wexCoinData[i])
          console.log(wexCoin)
          let item = {}

          item.pair = wexCoin.coin_pair
          item.delta = '0%'
          item.wex_price = wexCoin.ticker.last
          item.bitfinex_price = '0'
          item.kraken_price = '0'
          item.cexio_price = '0'

          this.items.push(item)
        }
      }
      return this.items
    }
  }
}
</script>

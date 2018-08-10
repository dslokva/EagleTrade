<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="10">
        <mainTable :items="getItems" hover></mainTable>
      </b-col>
    </b-row>
   
    <b-button variant="primary" @click="getLast50Spots()"><i class="fa fa-refresh"></i>&nbsp; Show last 50 spots</b-button>
    
    <b-row align-h="start"><b-col>&nbsp;</b-col></b-row>

    <section v-if="authRequired()">
      <b-row align-h="start">
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

        }
      ]
    }
  },
  components: {
    mainTable
  },
  methods: {
    authRequired () {
      return isLoggedIn()
    },
    getLast50Spots () {
      this.$socket.send(
        JSON.stringify({ request: 'getLast50Spots' })
      )
    }
  },
  computed: {
    getTick () {
      return this.$store.getters.serverTick
    },
    getLast50SpotData () {
      return this.$store.getters.last50spots
    },
    getItems () {
      if (this.getLast50SpotData) {
        let spotData = JSON.parse(JSON.stringify(this.getLast50SpotData))
        if (spotData) {
          this.items.length = 0

          for (let i = 0; i < spotData.length; i++) {
            let spot = JSON.parse(JSON.stringify(spotData[i]))
            let item = {}

            item.de = spot.spot.de
            item.frequency = spot.spot.freq
            item.dx = spot.spot.dx
            item.comment = spot.spot.comment
            item.time = spot.spot.time

            this.items.push(item)
          }
        }
      }
      return this.items
    }
  }
}
</script>

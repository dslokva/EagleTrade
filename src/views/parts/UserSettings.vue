<template>
  <div class="animated fadeIn">
    <div>
      <b-alert :show="dismissCountDown"
              dismissible
              variant="success"
              @dismissed="dismissCountdown=0"
              @dismiss-count-down="countDownChanged">
        Settings succesfully saved (dismiss in {{dismissCountDown}} seconds)
      </b-alert>
    </div>
    <b-card>
       <div slot="header">
            <i class="fa fa-id-card-o"></i> {{ $t('i18n.api_card_header') }}
          </div>
      <b-row>
        <MarketAPICard 
          :name="'WexMarketAPICard'"
          :title="'WEX.nz'" 
          :showAlert="showAlert" 
          :inBus="bus" 
          :inAPIenabled="wexAPIenabled" 
          :inAPIKey="wexAPIKey" 
          :inAPISecret="wexAPISecret"
          :APIEnabledMethod="'setWexAPIEnabled'"
          :APIKeySaveMethod="'setWexAPIKey'"
          :APISecretSaveMethod="'setWexAPISecret'"/>

        <MarketAPICard 
          :name="'BitfinexMarketAPICard'" 
          :title="'Bitfinex.com'"  
          :showAlert="showAlert" 
          :inBus="bus" 
          :inAPIenabled="bitfinexAPIenabled" 
          :inAPIKey="bitfinexAPIKey" 
          :inAPISecret="bitfinexAPISecret"
          :APIEnabledMethod="'setBitfinexAPIEnabled'"
          :APIKeySaveMethod="'setBitfinexAPIKey'"
          :APISecretSaveMethod="'setBitfinexAPISecret'"/>
      </b-row>
         
      <div slot="footer">
        <b-button type="submit" @click="checkAndSaveAPIKeys" variant="success">{{ $t('i18n.save_changes_form') }}</b-button>
        <b-button :to="'/dashboard'" type="button" variant="secondary">{{ $t('i18n.back_form') }}</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import MarketAPICard from './microparts/MarketAPICard'
import Vue from 'vue'

export default {
  name: 'UserSettings',
  data () {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
      bus: new Vue(),

      wexAPIenabled: this.$store.getters.wexAPIEnabled,
      wexAPIKey: this.$store.getters.wexAPIKey,
      wexAPISecret: this.$store.getters.wexAPISecret,

      bitfinexAPIenabled: this.$store.getters.bitfinexAPIEnabled,
      bitfinexAPIKey: this.$store.getters.bitfinexAPIKey,
      bitfinexAPISecret: this.$store.getters.bitfinexAPISecret
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    checkAndSaveAPIKeys () {
      this.bus.$emit('checkAndSave')
    }
  },
  computed: {

  },
  components: {
    MarketAPICard
  }
}
</script>

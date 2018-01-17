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
            <i class="fa fa-id-card-o"></i> Your API settings for cryptomarkets
          </div>
      <b-row>
        
        <b-col sm="6" md="4">
        <b-card>
          <div slot="header">
            WEX.nz
            <label class="switch switch-sm switch-text switch-info float-right mb-0">
              <input type="checkbox" class="switch-input" v-model="wexAPIenabled" value="false" unchecked-value="true">
              <span class="switch-label" data-on="on" data-off="off"></span>
              <span class="switch-handle"></span>
            </label>
          </div>
        <!-- <b-col sm="5"> -->
          <small class="text-muted text-uppercase font-weight-bold">WEX.nz API key</small>
           <b-form-fieldset 
            :disabled="!isAPIEnabled"
            :label-cols="3" 
            :description="$t('i18n.enter_api_key')">
              <b-form-input type="text" v-model.trim="wexApiKey"></b-form-input>
          </b-form-fieldset>

          <small class="text-muted text-uppercase font-weight-bold">WEX.nz API secret</small>
           <b-form-fieldset 
            :disabled="!isAPIEnabled"
            :label-cols="3" 
            :description="$t('i18n.enter_api_secret')">
              <b-form-input type="password" v-model.trim="wexApiSecret"></b-form-input>
          </b-form-fieldset>
        <!-- </b-col> -->
                </b-card>
        </b-col>
      </b-row>
         
        <div slot="footer">
          <b-button type="submit" @click="storeWexApiKeys" variant="success">Save changes</b-button>
          <b-button :to="'/dashboard'" type="button" variant="secondary">Back</b-button>
        </div>
</b-card>
  </div>
</template>

<script>

export default {
  name: 'UserSettings',
  data () {
    return {
      wexAPIenabled: this.$store.getters.wexAPIEnabled,
      wexApiKey: this.$store.getters.wexApiKey,
      wexApiSecret: this.$store.getters.wexApiSecret,
      dismissSecs: 3,
      dismissCountDown: 0
    }
  },
  methods: {
    storeWexApiKeys () {
      this.$store.commit('setWexAPIEnabled', this.wexAPIenabled)
      this.$store.commit('setWexAPIKey', this.wexApiKey)
      this.$store.commit('setWexAPISecret', this.wexApiSecret)
      this.showAlert()
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  },
  computed: {
    isAPIEnabled () {
      console.log(this.wexAPIenabled)
      return this.wexAPIenabled
    }
  }
}
</script>

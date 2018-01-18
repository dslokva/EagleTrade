<<template>
    <b-col sm="6" md="4">
    <b-card>
        <div slot="header">{{ title }}
            <label class="switch switch-sm switch-text switch-info float-right mb-0">
              <input type="checkbox" class="switch-input" v-model="APIenabled" value="false" unchecked-value="true">
              <span class="switch-label" data-on="on" data-off="off"></span>
              <span class="switch-handle"></span>
            </label>
        </div>
        <small class="text-muted text-uppercase font-weight-bold">{{ $t('i18n.api_key') }}</small>
          <b-form-group 
            :state="checkKey" 
            :feedback="authKeyFieldTextError"
            :disabled="!isAPIEnabled"
            :label-cols="3">
              <b-form-input :state="checkKey" type="text" v-model.trim="APIKey"></b-form-input>
          </b-form-group>
          <!-- :description="$t('i18n.enter_api_key')" -->
          <small class="text-muted text-uppercase font-weight-bold">{{ $t('i18n.api_secret') }}</small>
           <b-form-fieldset 
            :state="checkSecret" 
            :feedback="authSecretFieldTextError"
            :disabled="!isAPIEnabled"
            :label-cols="3">
              <b-form-input :state="checkSecret" type="password" v-model.trim="APISecret"></b-form-input>
          </b-form-fieldset>
          <!-- :description="$t('i18n.enter_api_secret')" -->
    </b-card>
    </b-col>
</template>

<script>
// import mainStore from '../../../utils/store'

export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    showAlert: {
      required: true,
      type: Function
    },
    inAPIenabled: {
      type: Boolean,
      default: false
    },
    inAPIKey: {
      type: String,
      default: ''
    },
    inAPISecret: {
      type: String,
      default: ''
    },
    APIEnabledMethod: {
      type: String,
      default: ''
    },
    APIKeySaveMethod: {
      type: String,
      default: ''
    },
    APISecretSaveMethod: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    inBus: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      APIenabled: this.inAPIenabled,
      APIKey: this.inAPIKey,
      APISecret: this.inAPISecret,
      authKeyFieldTextError: '',
      authSecretFieldTextError: '',
      saveClicked: false,
      validationSuccess: false
    }
  },
  mounted () {
    console.log(this.inBus)
    this.inBus.$on('checkAndSave', this.checkAndSaveAPIKeys)
  },
  methods: {
    checkAndSaveAPIKeys () {
      this.saveClicked = true
      this.validationSuccess = false
      if (this.checkKey && this.checkSecret) {
        this.validationSuccess = true
        this.storeAPIKeys()
        this.storeAPIEnabledState()
        this.showAlert()
      }

      if (!this.isAPIEnabled) {
        this.storeAPIEnabledState()
        this.validationSuccess = true
        this.showAlert()
      }
    },
    storeAPIEnabledState () {
      this.$store.commit(this.APIEnabledMethod, this.APIenabled)
    },
    storeAPIKeys () {
      this.$store.commit(this.APIKeySaveMethod, this.APIKey)
      this.$store.commit(this.APISecretSaveMethod, this.APISecret)
    },
    fieldLengthCheck (textToCheck) {
      if (!this.isAPIEnabled) return undefined
      if (this.saveClicked) {
        if (textToCheck.length < 6) {
          return false
        } else return true
      } else return undefined
    }
  },
  computed: {
    isAPIEnabled () {
      return this.APIenabled
    },
    checkKey () {
      let result = this.fieldLengthCheck(this.APIKey)
      if (!result) {
        this.authKeyFieldTextError = this.$i18n.t('i18n.enter_valid_api_key')
      }
      return result
    },
    checkSecret () {
      let result = this.fieldLengthCheck(this.APISecret)
      if (!result) {
        this.authSecretFieldTextError = this.$i18n.t('i18n.enter_valid_api_secret')
      }
      return result
    }
  }
}
</script>

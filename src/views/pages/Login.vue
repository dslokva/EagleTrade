<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col sm="12" md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <div>
                <h1>{{ $t('i18n.login') }}</h1>
                <p class="text-muted">{{ $t('i18n.signin_form') }}</p>
                </div>
                  <b-form-group :state="emailCheck" :feedback="authEmailFieldTextError">
                    <b-input-group left="<i class='icon-user'></i>">
                      <b-form-input type="email" class="form-control" :state="emailCheck" :placeholder="$t('i18n.email')" v-model.trim="email"/>
                    </b-input-group>
                  </b-form-group>

                  <b-form-group :state="passCheck" :feedback="authPassFieldTextError">
                      <b-input-group left="<i class='icon-lock'></i>">
                        <b-form-input type="password" class="form-control" :state="passCheck" :placeholder="$t('i18n.password')" v-model.trim="pass"/>
                      </b-input-group>       
                  </b-form-group>
                <b-row>
                  <b-col cols="6">
                    <b-button type="submit" variant="primary" class="px-4" @click="handleLogin()">{{ $t('i18n.login_form') }}</b-button>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <b-button variant="link" class="px-0">{{ $t('i18n.forgot_password') }}</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { authNotifier, login } from '../../utils/auth'

export default {
  name: 'Login',
  data () {
    authNotifier.on('authError', authState => {
      this.authPassFieldTextError = authState.errorDescription
      this.authEmailFieldTextError = ''
      this.authError = true
      console.log(this.authPassFieldTextError)
    })
    return {
      email: '',
      pass: '',
      authError: false,
      authPassFieldTextError: '',
      authEmailFieldTextError: '',
      loginClicked: false
    }
  },
  methods: {
    handleLogin () {
      this.loginClicked = true
      if (this.emailCheck && this.passCheck) {
        login(this.email, this.pass)
      }
    }
  },
  watch: {
    email: function (newEmail) {
      this.authError = false
    },
    pass: function (newPass) {
      this.authError = false
    },
    i18nname (itemName) {
      return this.$i18n.t('i18n.' + itemName)
    }
  },
  computed: {
    emailCheck () {
      if (this.loginClicked) {
        if (this.authError) { return false }
        const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!mailRegex.test(this.email)) {
          this.authEmailFieldTextError = 'Please enter a vaild email'
          return false
        } else return true
      } else return undefined
    },
    passCheck () {
      if (this.loginClicked) {
        if (this.authError) { return false }
        if (this.pass.length < 4) {
          this.authPassFieldTextError = 'Please enter a valid password.'
          return false
        } else return true
      } else return undefined
    }
  }
}
</script>

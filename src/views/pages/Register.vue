<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <h1>{{ $t('i18n.register') }}</h1>
              <p class="text-muted">{{ $t('i18n.create_account_form') }}</p>
              <div class="input-group mb-3">
                <span class="input-group-addon"><i class="icon-user"></i></span>
                <input type="text" class="form-control" :placeholder="$t('i18n.username')">
              </div>

              <div class="input-group mb-3">
                <span class="input-group-addon">@</span>
                <input type="text" class="form-control" :placeholder="$t('i18n.email')">
              </div>

              <div class="input-group mb-3">
                <span class="input-group-addon"><i class="icon-lock"></i></span>
                <input type="password" class="form-control" :placeholder="$t('i18n.password')">
              </div>

              <div class="input-group mb-4">
                <span class="input-group-addon"><i class="icon-lock"></i></span>
                <input type="password" class="form-control" :placeholder="$t('i18n.password_repeat')">
              </div>
            </b-card-body>
            <b-card-footer class="p-4">
              <b-row>
                <b-col cols="10" class="mx-auto">
                  <b-button variant="success" block>{{ $t('i18n.create_account') }}</b-button>
                </b-col>
              </b-row>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register'
}
</script>

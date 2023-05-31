<template>
  <q-page padding>
    <q-form class="row justify-center">
      <p class="col-12 text-h6 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input label="User" v-model="form.user" />
        <q-input label="Password" v-model="form.password" />
        <q-btn label="Login" color="primary" class="full-width" />
        <q-btn label="Register" class="full-width" to="/register" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PageLogin',

  setup () {
    const form = ref({
      user: '',
      password: '',
      token: ''
    })

    return {
      form
    }
  }
})
</script>

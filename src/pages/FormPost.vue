<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="row q-col-gutter-sm">
      <q-input v-model="houseRules.name" label="Name" style="min-width: 250px; max-width: 300px" />
      <q-select v-model="houseRules.active" :options="options" option-value="value" label="Active" emit-value  map-options style="min-width: 250px; max-width: 300px"/>
      <div class="col-12 q-gutter-sm">
        <q-btn label="Cancel" color="red" icon="cancel" size="sm" :to="{ name: 'home' }" />
        <q-btn label="Save" color="primary" icon="save" size="sm" @click="save"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'FormPost',
  setup () {
    const { post, getById, update } = postsService()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const houseRules = ref({
      name: '',
      active: '',
      order: null
    })
    onMounted(async () => {
      if (route.params.id) {
        getPost(route.params.id)
      }
    })

    const getPost = async (id) => {
      try {
        const response = await getById(id)
        houseRules.value = response
      } catch (error) {
        console.error(error)
      }
    }

    const options = [{ label: 'Yes', value: '1' }, { label: 'No', value: '0' }]

    const save = async () => {
      try {
        if (houseRules.value.id) {
          await update(houseRules.value)
        } else {
          await post(houseRules.value)
        }
        $q.notify({ message: 'Entity created successfully..', icon: 'check', color: 'positive' })
        router.push({ name: 'home' })
      } catch (error) {
        console.error(error)
      }
    }

    return {
      houseRules,
      options,
      save
    }
  }
})
</script>

<template>
  <q-page padding>
    <q-table
      title="Treats"
      :rows="posts"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <span class="text-h5">Teste</span>
        <q-space />
        <q-btn color="primary" label="Add Row" :to="{ name: 'formPost' }" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="delete" color="negative" dense size="sm" @click="handeleDeletePost(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const posts = ref([])
    const { list, remove } = postsService()
    const columns = [
      { name: 'id', label: 'Id', field: 'id', sortable: true, align: 'left' },
      { name: 'name', label: 'Name', field: 'name', sortable: true, align: 'left' },
      { name: 'name', label: 'Active', field: 'name', sortable: true, align: 'left' },
      { name: 'order', label: 'Order', field: 'order', sortable: true, align: 'left' },
      { name: 'actions', label: 'Actions', field: 'actions' }
    ]
    const $q = useQuasar()

    onMounted(() => {
      getPosts()
    })

    const getPosts = async () => {
      try {
        const data = await list()
        posts.value = data
      } catch (error) {
        console.error(error)
      }
    }

    const handeleDeletePost = async (id) => {
      try {
        await remove(id)
        $q.notify({ message: 'Entity removed successfully.', icon: 'check', color: 'positive' })
        await getPosts()
      } catch (error) {
        $q.notify({ message: 'Error.', icon: 'times', color: 'negative' })
      }
    }

    return {
      posts,
      columns,
      handeleDeletePost
    }
  }
})
</script>

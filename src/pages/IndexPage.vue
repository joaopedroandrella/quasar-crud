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
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" color="primary" dense size="sm" @click="handelerEditPost(props.row.id)" />
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
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const posts = ref([])
    const { list, remove } = postsService()
    const router = useRouter()
    const $q = useQuasar()
    const columns = [
      { name: 'id', label: 'Id', field: 'id', sortable: true, align: 'left' },
      { name: 'name', label: 'Name', field: 'name', sortable: true, align: 'left' },
      { name: 'active', label: 'Active', field: 'active', sortable: true, align: 'left' },
      { name: 'order', label: 'Order', field: 'order', sortable: true, align: 'left' },
      { name: 'actions', label: 'Actions', field: 'actions' }
    ]

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

    const handelerEditPost = async (id) => {
      router.push({ name: 'formPost', params: { id } })
    }

    return {
      posts,
      columns,
      handeleDeletePost,
      handelerEditPost
    }
  }
})
</script>

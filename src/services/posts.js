import useApi from 'src/composables/UseApi'

export default function postsService () {
  const { list, post, update, remove } = useApi('entities')
  return {
    list,
    post,
    update,
    remove
  }
}

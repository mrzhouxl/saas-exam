import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useRouteParams() {
  const route = useRoute()

  const params = computed(() => route.params)
  const query = computed(() => route.query)
  const fullPath = computed(() => route.fullPath)

  return {
    params,
    query,
    fullPath
  }
}
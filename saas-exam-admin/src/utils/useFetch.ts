import axios from '@/utils/axios'
import { ref } from 'vue'
export async function useFetch(url: string, query: any) {
  const data = ref()
  data.value = await axios.get(url, query)
}
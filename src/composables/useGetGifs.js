import { getGifs } from '@/utils/api'

export async function useGetGifs(filter, pagination) {
  const query = new URLSearchParams()
  query.append('q', filter)
  query.append('api_key', import.meta.env.VITE_API_KEY)
  query.append('offset', pagination * 50)

  const data = await getGifs(query)

  return { data }
}

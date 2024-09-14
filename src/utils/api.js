import axios from 'axios'

export const getGifs = async (query) => {
  const { data } = await axios.get(`https://api.giphy.com/v1/gifs/search?${query}`)

  return data
}

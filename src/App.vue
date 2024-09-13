<script setup>
import CardsGif from './components/Cards/CardsGif.vue'

import axios from 'axios'
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'

let timeout = null

const scrollTarget = useTemplateRef('scrollTarget')
const observer = ref(null)
const pagination = ref(0)
const filter = ref('')
const gifs = ref([])

const getGifs = async (isFiltering) => {
  const query = new URLSearchParams()
  query.append('q', filter.value)
  query.append('api_key', import.meta.env.VITE_API_KEY)
  query.append('offset', pagination.value * 50)

  const { data } = await axios.get(`https://api.giphy.com/v1/gifs/search?${query}`)

  if (isFiltering) {
    return (gifs.value = data.data)
  }

  gifs.value.push(...data.data)
}

const clearGifs = () => {
  gifs.value = []
}

const debounceSearch = () => {
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    pagination.value = 0
    getGifs(true)
  }, 650)
}

const setupObserver = () => {
  observer.value = new IntersectionObserver(([entry]) => {
    console.log(entry, scrollTarget.value)
    if (entry.isIntersecting && !!gifs.value.length) {
      pagination.value = pagination.value + 1
      getGifs(false)
    }
  })

  if (scrollTarget.value) {
    observer.value.observe(scrollTarget.value)
  }
}

onMounted(() => {
  setupObserver()
})

onUnmounted(() => {
  observer.value.unobserve(scrollTarget.value)
})
</script>

<template>
  <section class="container">
    <div class="filter-wrapper">
      <input type="text" v-model="filter" placeholder="Filter..." @input="debounceSearch" />
      <button @click="clearGifs">CLEAR</button>
    </div>

    <CardsGif
      v-for="(gif, index) in gifs"
      :key="`gif-${index}`"
      :gif-name="gif.title"
      :gif-url="gif.images.preview_gif.url"
    />

    <div ref="scrollTarget" />
  </section>
</template>

<style>
.container {
  max-width: 548px;
  width: 100%;
  margin: 3rem auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.filter-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-wrapper > button {
  background-color: #6671bd;
  color: white;
  border-radius: 6px;
  padding: 4px 12px;
}

.filter-wrapper > input {
  border: 1px solid #1a1a1a;
  width: 100%;
  border-radius: 6px;
  padding: 0.5rem;
  transition: 0.3s ease;
  outline: none;
}

.filter-wrapper > input:focus {
  border: 1px solid #6671bd;
}
</style>

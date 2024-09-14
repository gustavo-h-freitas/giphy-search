<script setup>
import CardsGif from './components/Cards/CardsGif.vue'

import { ref } from 'vue'
import { useGetGifs } from './composables/useGetGifs'

let timeout = null

const pagination = ref(0)
const filter = ref('')
const gifs = ref([])

const getGifs = async (isFiltering) => {
  try {
    const { data } = await useGetGifs(filter.value, pagination.value)

    if (isFiltering) {
      return (gifs.value = data.data)
    }

    gifs.value.push(...data.data)
  } catch {
    new Error().stack
  }
}

const clearGifs = () => {
  gifs.value = []
  filter.value = ''
}

const debounceSearch = () => {
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    pagination.value = 0
    getGifs(true)
  }, 650)
}

const setupObserver = () => {
  if (!gifs.value.length) {
    return
  }

  pagination.value = pagination.value + 1
  getGifs(false)
}
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

    <div ref="scrollTarget" v-on-show="setupObserver" />
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
  padding: 8px 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
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

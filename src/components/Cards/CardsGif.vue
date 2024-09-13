// eslint-disable-next-line vue/multi-word-component-names
<script setup>
const props = defineProps({
  gifUrl: String,
  gifName: String
})
</script>

<template>
  <div class="gif-image-wrapper">
    <img :src="gifUrl" :alt="gifName" />
  </div>
</template>

<style>
.gif-image-wrapper {
  width: 100%;
}

.gif-image-wrapper > img {
  width: 100%;
  display: block;
  border-radius: 6px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
}
</style>

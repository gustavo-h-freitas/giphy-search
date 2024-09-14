let observer = null

export const onShow = {
  mounted(el, binding) {
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        binding.value()
      }
    })

    observer.observe(el)
  },

  unmounted(el) {
    observer.unobserver(el)
  }
}

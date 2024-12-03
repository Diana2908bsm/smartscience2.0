<template>
  <button class="v-button btn" :class="[`btn-${sample} btn-${size}`, {loading}]">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'iu-button',
  props: {
    sample: { type: String, default: 'light' },
    size: { type: String, default: 'md' },
    icon: String,
    isabled: Boolean,
    loading: Boolean
  }
}
</script>

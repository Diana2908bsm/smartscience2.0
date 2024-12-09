<template>
  <button class="v-button btn" :class="[`btn-${sample} btn-${size}`, {loading}]"  :disabled="disabled || loading">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'iu-button',
  props: {
    sample: { type: String, default: 'light' },
    size: { type: String, default: 'md' },
    disabled: Boolean,
    loading: Boolean
  }
}
</script>

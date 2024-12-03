<template>
  <component :is="name" />
</template>
<script>
import * as manyIcon from './variants'
export default {
  name: 'manyIcon',
  components: { ...manyIcon },
  props: {
    name: {
      type: String,
      required: true,
      validator (value) {
        return Object.keys(manyIcon).includes(value)
      }
    }
  }
}
</script>

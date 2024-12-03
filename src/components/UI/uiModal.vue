<template>
  <div class="modal" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'uiModal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog () {
      this.$emit('update:show', false)
    }
  }
}
</script>
<style>
.modal{
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}
.modal-content {
  margin: auto;
  background: #fff;
  border-radius:10px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}
</style>

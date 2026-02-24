<script setup>
import { ref, onErrorCaptured } from 'vue'
const isError = ref(false);
const errorData = ref();

function errorHandler(error){
    isError.value = true
    errorData.value = error
}

onErrorCaptured(errorHandler);

function clearError(){
  isError.value = false
  errorData.value = null
}
// const errorHandler = (error: unknown, _vm: unknown, _info: unknown): void => {
//   isError.value = true;
//   errorMessage.value = error?.message || 'Unknown error occurred';
//   errorData.value = error;
//   console.error(error);
// };

// // Watch for errors in the component tree
// onErrorCaptured(errorHandler);

// // Function to reset the error state and reload the component
// const clearError = (): void => {
//   isError.value = false;
//   errorData.value = null;
//   errorMessage.value = null;
//   componentKey.value++; // Increment the key to trigger a re-render
// };

</script>

<template>
    <div v-if="isError">
        <div>{{ errorData.message }}</div>
        <button @click="clearError">Повторить запрос</button>
    </div>
    <div v-else>
        <slot></slot>
    </div>
</template>
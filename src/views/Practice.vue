

<script setup>
import { ref } from 'vue'

const fruits = ['apple','lemon','','melon','']


const isActive = ref(true)
</script>

<template>


<div v-for="fruit of fruits" :class="['s-class', {isActive : 'active'}]">{{fruit}}</div>


</template>

<style scope>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 30px;
}

input {
    border: 2px solid #ccc;
    border-radius: 10px;
    font-size: 14px;
    padding: 5px;
}

button {
    padding: 15px 30px;
    text-align: center;
    background: #bd8585;
    color: #fff;
    border-radius: 10px;
    margin: 10px;
}
.no-price {
  background-color: red;
  color: white;
  padding: 10px;
}
</style>
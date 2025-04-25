<template>
  <div class="info">
    <div class="info__container">
      <div class="info__header">
        <div class="info__header--name">
          {{ firstName}} {{ lastName}} {{ middleName}}
        </div>
        <div class="info__edit">
          <button>Редактировать</button>
        </div>
      </div>
      <div class="info__list">
        <div class="info__item">
          <div class="info__name">Email:</div>
          <div class="info__title">{{ email }}</div>
        </div>
        <div class="info__item">
          <div class="info__name">ElibraryId:</div>
          <div class="info__title">{{ elibraryId }}</div>
        </div>
        <div class="info__item">
          <div class="info__name">Дата рождения:</div>
          <div class="info__title">{{ birthdate }}</div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
const props = defineProps({
  firstName:String,
  lastName:String,
  middleName: String,
  email:String,
  elibraryId: Number,
  birthdate:String
})
</script>
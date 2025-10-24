<script setup>
const props = defineProps({
  userInfo:Object
})
</script>
<template>
  <div class="info">
    <div class="info__container">
      <div class="info__header">
        <div class="info__header--name">
          {{ userInfo.firstName}} {{ userInfo.lastName}} {{ userInfo.middleName}}
        </div>
        <div class="info__edit">
          <button>Редактировать</button>
        </div>
      </div>
      <div class="info__list">
        <div class="info__item">
          <div class="info__name">Email:</div>
          <div class="info__title">{{ userInfo.email }}</div>
        </div>
        <div class="info__item">
          <div class="info__name">ElibraryId:</div>
          <div class="info__title">{{ userInfo.elibraryId }}</div>
        </div>
        <div class="info__item">
          <div class="info__name">Дата рождения:</div>
          <div class="info__title">{{ userInfo.birthdate }}</div>
        </div>
        <div class="info__item">
          <div class="info__name">Факультет (Институт):</div>
          <div class="info__title">{{ userInfo.structuralUnit.facultyName }}</div>
        </div>
        <div class="info__item">
          <div class="info__name">Кафедра:</div>
          <div class="info__title">{{ userInfo.structuralUnit.departmentName }} ({{ userInfo.structuralUnit.facultyShortName }})</div>
        </div>
      </div>
    </div>
  </div>
  
</template>


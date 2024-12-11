<template>
  <div class="info">
    <div class="info__container">
      <div class="info__header">
        <div class="info__header--name">
          {{ info.firstName}} {{ info.lastName}} {{ info.middleName}}
        </div>
        <div class="info__edit">
          <button>Редактировать</button>
        </div>
      </div>
      <div class="info__list">
        <div class="info__item">
          <div class="info__name">Email:</div>
          <div class="info__title">{{ info.email }}</div>
        </div>
        <div class="info__item">
          <div class="info__name">ElibraryId:</div>
          <div class="info__title">{{ info.elibraryId }}</div>
        </div>
        <div class="info__item">
          <div class="info__name">Дата рождения:</div>
          <div class="info__title">{{ info.birthdate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'infoPerson',
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<script setup>
const props = defineProps({
  publications: {
    type: Object,
    default: () => ({})
  }
})
</script>
<template>
  <div class="publications">
    <div class="publications__length"> Найдено: {{ publications.length }} статей</div>
    <div class="publications__inner">
      <div v-if="!publications.length">
        <p>Статей не найдено</p>
      </div>
      <div class="publications__box" v-for="publication in publications" :key="publication.id">
        <div class="publications__title">{{ publication.title }}</div>
        <div class="publications__author">{{ publication.author }}</div>
        <div class="publications__journal">{{ publication.journalSource }}</div>
        <div class="publications__year">{{ publication.year }}</div>
      </div>
    </div>
  </div>
</template>

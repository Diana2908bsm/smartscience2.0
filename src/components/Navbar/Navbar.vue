<script setup>
import { manyIcon } from '@/components/icons'
import { computed, ref } from 'vue';

const openDropdown = ref(null)
const links = ref([
  { title: 'Профиль', url: '/', exact: true },
  { title: 'Научные работы', url: '/publications' },
  { title: 'Общие показатели',
    children: [
      { title: "Актуальные показатели", url: "/indicators/actual" },
      { title: "Показатели по годам", url: "/indicators/years" }
    ]
  }
  // { title: 'Результаты интеллектуальной деятельности', url: '/intellectual-activity' },
  // { title: 'Справочник', url: '/directory', requiredUserType: [2, 3] },
  // { title: 'Admin', url: '/admin', requiredUserType: [2, 3] }
])
const toggleDropdown = (title)=> {
  openDropdown.value = openDropdown.value === title ? null : title
}
const isOpen = (title)=>{
  return openDropdown.value === title
}
const filteredLinks = computed(() => links.value)
</script>

<template>
  <div class="navbar">
    <ul class="navbar__links">
      <li v-for="link in filteredLinks" :key="link.url" class="navbar__item">
        <div v-if="link.children" class="navbar__link navbar__link--dropdown" @click="toggleDropdown(link.title)">
          {{ link.title }}
              <many-icon class="navbar__arrow" :class="{ 'navbar__arrow--open': isOpen(link.title) }" name="arrowIcon"></many-icon>
        </div>
        <router-link v-else :to="link.url" class="navbar__link" active-class="active">
          {{ link.title }}
        </router-link>
        <ul v-if="link.children" class="navbar__submenu" :class="{ 'navbar__submenu--open': isOpen(link.title) }">
          <li v-for="child in link.children" :key="child.url" class="navbar__submenu-item">
            <router-link :to="child.url" class="navbar__submenu-link">
              {{ child.title }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

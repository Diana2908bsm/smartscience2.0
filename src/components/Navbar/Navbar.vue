<template>
  <div class="navbar">
    <ul class="navbar__links">
      <li v-for="link in filteredLinks" :key="link.url" class="navbar__item">
        <router-link :to="link.url" class="navbar__link" active-class="active">
          {{ link.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  computed: {
  filteredLinks () {
      const links = [
        { title: 'Профиль', url: '/', exact: true },
        { title: 'Научные работы', url: '/works' },
        { title: 'Общие показатели', url: '/indicators' }
        // { title: 'Результаты интеллектуальной деятельности', url: '/intellectual-activity' },
        // { title: 'Справочник', url: '/directory', requiredUserType: [2, 3] },
        // { title: 'Admin', url: '/admin', requiredUserType: [2, 3] }
      ]
      return links.filter(link =>
        !link.requiredUserTypes || link.requiredUserTypes.includes(this.userType)
      )
    }
  }
}
</script>
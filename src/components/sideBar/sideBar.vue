<script setup>
import { links } from '@/components/sideBar/sideBar'
import { manyIcon } from '@/components/icons'

const openDropdown = ref(null)

const toggleDropdown = (title) => {
    openDropdown.value = openDropdown.value === title ? null : title
}

const isOpen = (title) => openDropdown.value === title
</script>
<template>
    <div class="navbar">
        <ul class="navbar__links">
            <li v-for="link in links" :key="link.title" class="navbar__item">
                <!-- Если есть вложенные -->
                <div v-if="link.children" class="navbar__link navbar__link--dropdown"
                    @click="toggleDropdown(link.title)">
                    {{ link.title }}

                    <many-icon class="navbar__arrow" :class="{ 'navbar__arrow--open': isOpen(link.title) }"
                        name="arrowIcon" />
                </div>

                <router-link v-else :to="link.url" class="navbar__link" active-class="active">
                    {{ link.title }}
                </router-link>

                <ul v-if="link.children && isOpen(link.title)" class="navbar__dropdown">
                    <li v-for="child in link.children" :key="child.title" class="navbar__submenu-item">
                        <router-link :to="child.url" class="navbar__submenu-link" active-class="active">
                            {{ child.title }}
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
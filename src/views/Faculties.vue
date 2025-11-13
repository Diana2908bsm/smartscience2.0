<script setup>
import { ref,onMounted } from 'vue';
import AppLayoutProfile from '@/layouts/AppLayoutProfile.vue';
import Spinner from '@/components/UI/spinner/Spinner.vue';

import { useFacultiesStore } from '@/stores/faculties';
import Faculties from '@/components/Faculties/Faculties.vue';
import Modal from '@/components/Modal/Modal.vue';
import { manyIcon } from '@/components/icons';

const useFacultiesrInfo = useFacultiesStore ()

const isModalOpen = ref(false)
const modalText = ref('')
const modalButton = ref('')
const selectedFucultry = ref(null)

const openModal = () =>{
    isModalOpen.value = true
    selectedFucultry.value = null
    modalText.value = "Добавление нового института"
    modalButton.value = "Добавить"
}
const openEditModal = (faculties) =>{
    isModalOpen.value = true
    modalText.value = "Редактирование института"
    modalButton.value = "Изменить"
    selectedFucultry.value = faculties
}
const closeModal = ()=>{
     isModalOpen.value = false
}
const removeFaculties = (id) =>{
    console.log(id)
    useFacultiesrInfo.removeFaculties(id)
}

onMounted(()=>{
    useFacultiesrInfo.getAllFaculties()
})


</script>

<template>
    <spinner v-if="useFacultiesrInfo.loading" />
    <div else class="faculties">
        <AppLayoutProfile>
            <template #profile-top>
                <h1 class="profile">Структура универститета</h1>
                <button class="faculties-header__button" @click="openModal">
                    <many-icon name="plusIcon"></many-icon>
                    <span>Добавить институт</span>
                </button>
            </template>
            <template #info>
                <div v-for=" faculties in useFacultiesrInfo.faculties" :key="faculties.id">
                    <Faculties :faculties="faculties" @remove-faculties="removeFaculties" @edit-faculties="openEditModal"/>
                </div>
            </template>
        </AppLayoutProfile>
         <Modal v-if="isModalOpen" :title="modalText" :facultyData="selectedFucultry" :buttonName="modalButton" @close-modal="closeModal"/>
    </div>
</template>
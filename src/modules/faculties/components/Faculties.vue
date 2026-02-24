<script setup>
const props = defineProps({
    faculties: Array,
    default: () => ([])
})

const emit = defineEmits(['deleleFaculties'])

function removeFaculties(data){
    emit('deleleFaculties',data.facultyId)
}

// const showAll = ref(false)

// const emit = defineEmits(['removeFaculties', 'editFaculties'])

// const removeFaculties = () => {
//     emit('removeFaculties', id)
// }
// const editFaculties = (id) => {
//     emit('editFaculties', id)
// }
// const toggleShowAll = () => {
//     showAll.value = !showAll.value
// }

// const allDepartments = computed(() => {
//     if (showAll.value) {
//         return props.faculties.departments
//     } else {
//         return props.faculties.departments.slice(0, 7)
//     }
// })

// const hasHiddenList = computed(() => {
//     return props.faculties.departments.length > 7
// })
</script>

<template>
    <div class="faculties" v-for="faculty in faculties" :key="faculty.id">
     
        <div class="faculties__box">
            <div class="faculties__header">
                <div class="faculties__header--title">{{ faculty.name }}</div>
                <div class="faculties__header--buttons">
            
                    <!-- <button @click="editFaculties()" class="faculties__edit">Редактировать</button> -->
                    <button @click="removeFaculties(faculty)" class="faculties__delete">Удалить</button>
                </div>
            </div> 

           <!-- <ul class="faculties__list">
                <li class="faculties__item" v-for="department in allDepartments">{{ department.name }}</li>
            </ul>
            <div class="faculties__toggle-list" v-if="hasHiddenList">
                <button class="faculties__toggle-list--button" @click="toggleShowAll"> {{ showAll ? "Свернуть" :
                    "Открыть все каферды"}}</button>
            </div>-->
        </div> 
    </div>
</template>
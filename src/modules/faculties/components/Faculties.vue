<script setup>
const props = defineProps({
    faculties: Array,
    default: () => ([])
})

const emit = defineEmits(['deleleFaculties','editFaculties'])

function removeFaculties(data){
    emit('deleleFaculties',data.facultyId)
}
function editFaculties(data){
    emit('editFaculties', data)
}

</script>

<template>
    <div class="faculties" v-for="faculty in faculties" :key="faculty.id">
     
        <div class="faculties__box">
            <div class="faculties__header">
                <div class="faculties__header--title">{{ faculty.name }}</div>
                <div class="faculties__header--buttons">
                    <button @click="editFaculties(faculty)" class="faculties__edit">Редактировать</button>
                    <button @click="removeFaculties(faculty)" class="faculties__delete">Удалить</button>
                </div>
            </div> 

            <ul class="faculties__list">
                <li class="faculties__item" v-for="department in faculty.departments">{{ department.name }}</li>
            </ul> 
        </div> 
    </div>
</template>
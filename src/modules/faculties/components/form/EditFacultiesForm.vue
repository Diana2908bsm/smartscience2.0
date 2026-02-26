<script setup>

const props = defineProps({
    faculty: Object,
    default: () => ({})

})

const emit = defineEmits(['submit'])
const formData = ref({
    facultyId: props.faculty.facultyId,
    name: props.faculty.name || '',
    code: props.faculty.code || '',
    shortName: props.faculty.shortName || '',
    departments: props.faculty?.departments
        ? [...props.faculty.departments]
        : []

})
function onSubmit() {
    emit('submit', formData.value)
}
function addDepartment() {
    formData.value.departments.push({
        name: '',
        code: '',
        facultyLinkId: props.faculty.facultyId,
        isDeleted: false,
    })
}
function removeDepartment(index) {
    const department = formData.value.departments[index]

    if (department.id) {
        department.isDeleted = true
    } else {
        formData.value.departments.splice(index, 1)
    }
    console.log(formData.value)
}
const departmentActual = computed(()=>{
    return formData.value.departments.filter(item => !item.isDeleted)
})

</script>

<template>
    <form class="faculty__form" @submit.prevent="onSubmit">
        <div class="form-box">
            <FloatLabel variant="on">
                <InputText id="name" v-model="formData.name" required fluid />
                <label class="form__label" for="name">Название института</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <InputText id="code" v-model="formData.code" fluid />
                <label class="form__label" for="code">Код института</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <InputText id="short_name" v-model="formData.shortName" fluid />
                <label class="form__label" for="short_name">Сокращенное название</label>
            </FloatLabel>
        </div>
        <div v-for="(department, index) in departmentActual" :key="department.id" class="form-box">
            <FloatLabel variant="on">
                <InputText id="department-name" v-model="department.name" fluid required />
                <label class="form__label" for="department-name">Название кафедры</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <InputText id="department-code" v-model="department.code" fluid />
                <label class="form__label" for="department-code">Код кафедры</label>
            </FloatLabel>
            <Button icon="pi pi-times" class="icon-red" text @click="removeDepartment(index)"></Button>
        </div>
        <div style="display: flex; justify-content: end;">
            <Button class="button-add-department" @click="addDepartment" icon="pi pi-plus" label="Добавить кафедру" />

        </div>

        <div class="form-button">
            <slot name="buttons" />
        </div>

    </form>
</template>
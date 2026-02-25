<script setup>
import axios from "@/api";
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast'

const confirm = useConfirm();
const toast = useToast()

const loading = ref(false)

const faculties = ref([])
async function getFaculties() {
    try {
        loading.value = true

        const response = await axios.get('faculties')
        faculties.value = response.data.data

    } catch (error) {
        console.log(error)
    }
    finally {
        loading.value = false
    }
}

const isUpdateFacultiesVisible = ref(false)
const editFaculty = ref()

function editFaculties(faculty) {
    isUpdateFacultiesVisible.value = true
    editFaculty.value = faculty
}

async function updateFaculties(values) {
    try {
        loading.value = true
        await axios.put(`faculties`, values)
        toast.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Институт успешно изменен',
            life: 3000
        })
        isUpdateFacultiesVisible.value = false
        getFaculties()
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const isCreateFacultiesVisible = ref(false)

async function createFaculties(values) {
    try {
        loading.value = true
        await axios.post('faculties', values)

        toast.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Институт успешно добавлен',
            life: 3000
        })
        isCreateFacultiesVisible.value = false
        getFaculties()
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}


function handleDeleteClick(facultyId) {
    confirm.require({
        message: 'Вы уверены, что хотите удалить этот институт?',
        header: 'Подтверждение удаления',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Удалить',
        rejectLabel: 'Отмена',
        accept: async () => {
            await deleteFaculty(facultyId);
        },
    });
}

async function deleteFaculty(facultyId) {
    try {
        loading.value = true
        await axios.delete(`faculties/${facultyId}`)
        toast.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Институт успешно удалён',
            life: 3000
        })
        await getFaculties()
    } catch (error) {
        console.log(error)

    } finally {
        loading.value = false
    }
}

onMounted(async () => {
    await getFaculties()
})

</script>

<template>
    <Spinner v-if="loading" />
    <div v-else class="faculties">
        <AppLayoutProfile title="Структура универститета">
            <template #headerAside>
                <Button @click="isCreateFacultiesVisible = true" icon="pi pi-plus" label="Добавить институт"> </Button>
            </template>
            <template #content>
                <Faculties :faculties="faculties" @delele-faculties="handleDeleteClick"
                    @edit-faculties="editFaculties" />
            </template>
        </AppLayoutProfile>
    </div>
    <Dialog v-model:visible="isUpdateFacultiesVisible" :draggable="false" modal header="Изменить институт"
        style="width: 55vw">
        <EditFacultiesForm :faculty="editFaculty" @submit="updateFaculties">
            <template #buttons>
                <Button severity="secondary" @click="  isUpdateFacultiesVisible = false">Отмена</Button>
                <Button type="submit">Изменить</Button>
            </template>
        </EditFacultiesForm>
    </Dialog>
    <Dialog v-model:visible="isCreateFacultiesVisible" :draggable="false" modal header="Добавить институт"
        style="width: 55vw">
        <CreateFacultiesForm @submit="createFaculties">
            <template #buttons>
                <Button severity="secondary" @click="isCreateFacultiesVisible = false">Отмена</Button>
                <Button type="submit">Добавить</Button>
            </template>
        </CreateFacultiesForm>
    </Dialog>

</template>
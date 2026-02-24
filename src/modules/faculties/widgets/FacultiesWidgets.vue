<script setup>
import axios from "@/api";
import { useConfirm } from 'primevue/useconfirm';

const confirm = useConfirm();

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

function handleDeleteClick(facultyId) {
    console.log(facultyId)
    confirm.require({
        message: 'Вы уверены, что хотите удалить этот факультет ?',
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
    console.log(facultyId)
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
                <Button> Добавить институт</Button>
            </template>
            <template #content>
                <Faculties :faculties="faculties" @delele-faculties="handleDeleteClick" />
            </template>

        </AppLayoutProfile>
    </div>
</template>
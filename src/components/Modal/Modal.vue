<script setup>
import { ref, watch } from 'vue';
import { manyIcon } from '@/components/icons';
import { useFacultiesStore } from '@/stores/faculties';

const useFacultiesInfo = useFacultiesStore ()

const props = defineProps({
    title: String,
    buttonName: String,
    facultyData: Object
})
const emit = defineEmits(['closeModal'])

const closeModal = () => {
    emit('closeModal')
}

const universityName = ref('')
const universityCode = ref('')
const universityShortname = ref('')
const departments = ref([{name: '', code: ''}])

watch(()=>props.facultyData,(newData)=>{
    if (newData) {
      universityName.value = newData.name || '';
      universityCode.value = newData.code || '';
      universityShortname.value = newData.shortName || '';
      departments.value = JSON.parse(JSON.stringify(newData.departments || [{ name: '', code: '' }]));
    } else {
      universityName.value = '';
      universityCode.value = '';
      universityShortname.value = '';
      departments.value = [{ name: '', code: '' }];
    }
} , { immediate: true })
const addDepartment = () =>{
    departments.value.push({name:'',code:''})
}
const deleteDepartment = (index) =>{
    const department = departments.value[index];
    if (department.facultyLinkId){
          department.isDeleted = true;

    } else {
        departments.value.splice(index,1)
    }    
}

const submitFormModal = async() =>{
    const data = {
       name:universityName.value,
       shortName: universityShortname.value,
       code: universityCode.value,
       departments: departments.value.map(dep => ({
        ...dep,
       isDeleted: dep.isDeleted || false
    }))
    }
    if (props.facultyData) {
        data.facultyId = props.facultyData.facultyId
        await useFacultiesInfo.updateFaculties(data)
    } else {
        await useFacultiesInfo.newAddFaculties(data)
    }
    closeModal()
}

</script>

<template>
    <div class="modal">
        <div class="modal__content" @click.self="closeModal">
            <div class="modal__title">{{ title }}</div>
            <form class="modal__form" @submit.prevent="submitFormModal">
                <div class="modal__inputs">
                    <div class="modal__inputs-box">
                        <div class="modal__input-field">
                            <label for="university-name" class="modal__label">Название института</label>
                            <ui-input class="modal__input"  v-model="universityName" required />
                        </div>
                        <div class="modal__input-field">
                            <label for="university-code" class="modal__label">Код института</label>
                            <ui-input class="modal__input"  v-model="universityCode" />
                        </div>
                        <div class="modal__input-field">
                            <label for="university-short-name" class="modal__label">Сокращенное название</label>
                            <ui-input class="modal__input"  v-model="universityShortname"  />
                        </div>
                    </div>
                </div>

                <div class="modal__inputs">
                    <div class="modal__inputs-box" v-for="(department, index) in departments.filter(dep => !dep.isDeleted)" :key="index">
                        <div class="modal__input-field">
                            <label for="departments-name" class="modal__label">Название кафедры</label>
                            <ui-input class="modal__input"  v-model="department.name" required />
                        </div>
                        <div class="modal__input-field">
                            <label for="departments-code" class="modal__label">Код кафедры</label>
                            <ui-input class="modal__input" v-model="department.code"  />
                        </div>
                        <button type="button" @click="deleteDepartment(index)" v-if="departments.length > 1" class="modal__minus">
                            <many-icon name="minusIcon"></many-icon>
                        </button>
                    </div>
                    <div class="button-add-department">
                        <button type="button" @click="addDepartment">+ Добавить еще кафедры </button>
                    </div>
                </div>


                <div class="modal__buttons">
                    <button class="button button-add" type="submit">{{ buttonName }}</button>
                    <button class="button button-close" @click="closeModal">Закрыть</button>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.modal__content {
    max-width: 800px;
    padding: 40px;
    width: 100%;
    background: #fff;
    border-radius: 15px;
    max-height: 90vh;
    overflow-y: auto;
}

.modal__title {
    font-size: 20px;
    margin-bottom: 40px;
}

.modal__inputs-box {
    display: flex;
    gap: 30px;
    margin: 0;
    margin: 10px 0 ;
}

.modal__input {
    width: 100%;
    box-sizing: border-box;
    display: block;
    font-size: 14px;
    border: 1px solid #484340;
    border-radius: 8px;
    background: #fff;
    height: 40px;
    padding: 0.775rem 0.55rem;
}

.modal__label {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #484340;
}

.modal__inputs {
    margin: 15px 0;
}

.modal__buttons {
    margin-top: 30px;
    display: flex;
    gap: 10px;
}

.button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    width: 100%;
    max-width: 160px;
    height: 45px;
    border-radius: 15px;
    transition: all 0.3s;
}

.button-add {
    background: #0d4cd3;
    color: #fff;
}

.button-add:hover {
    background: #093ba8;
}

.button-close {
    color: #484340;

}

.button-close:hover {
    text-decoration: underline;
}

.modal__minus svg {
    margin-top: 20px;
}

.button-add-department {
    font-size: 13px;
    color: #0d4cd3;
    margin-top: 10px;
}

</style>
<template>
    <Card>
        <template #title>Examenes</template>
        <template #body>
            <h2 underline>{{ escuela.value?.name }} - {{ curso.value?.name }}</h2>
            <div flex flex-column>
                <div v-for="(examen, key) in examenes" :key @click="goToExam(examen?.id)" class="mb-4">
                    <div class="examen" flex-center>
                        {{ examen?.name }}
                    </div>
                    <div flex gapped>
                        <Input type="button" value="Resultados" class="mt-3" background="var(--primary)" color="white"
                            @click.stop="resultados(examen?.id)" />
                        <div class="delete mt-3" flex-center radius-border @click.stop="deleteExam(examen?.id)">
                            <box-icon type='solid' name='trash-alt'></box-icon>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup>
import { Input } from 'digitalpower';
import { onMounted, reactive, ref } from 'vue';
import Card from '../../layout/Card.vue';
import { useRoute, useRouter } from 'vue-router';
import { get, post } from '../../utils/apiReq';
import { ConfirmModal } from '../../utils/notification';

const route = useRoute();
const router = useRouter();
const curso = reactive({});
const escuela = reactive({});
const examenes = ref([]);


onMounted(async () => {

    await getEscuela();
    await getCurso();
    await getExamenes();
})

const getEscuela = async () => {
    const id = route.params.escuelaId;
    let response = await get(`/escuelas/${id}`);
    escuela.value = response.data;
}

const getCurso = async () => {
    const id = route.params.cursoId;
    let response = await get(`/cursos/${id}`);
    curso.value = response.data;
}

const getExamenes = async () => {
    const id = route.params.cursoId;
    let response = await post(`/examenes/find/`, { where: { deleted: 0, curso: { id: id } } });
    examenes.value = response.data;
}

const goToExam = (id) => {
    router.push(`/examenes?id=${id}&escuela=${escuela.value.id}&curso=${curso.value.id}&redirect_uri=${route.path}`);
}

const deleteExam = async (id) => {
    const result = await ConfirmModal();
    if (true) {
        let result = await post('/examenes/delete', { id: id });
        if (result?.data?.message) {
            await getExamenes();
        }

    }

}

const resultados = (id) => {

}

</script>

<style scoped>
h2 {
    text-align: left;
}

.examen {
    height: 50px;
    max-width: 400px;
    border-bottom: 1px solid var(--primary);
    transition: var(--duration);
    cursor: pointer;

    &:hover {
        background: var(--primary);
        color: white;
    }
}

.delete {
    background-color: var(--red);
    fill: white;
    width: 44px;
    height: 44px;
}
</style>
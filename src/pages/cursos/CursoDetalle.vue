<template>
    <Card>
        <template #title>{{ escuela?.value?.name }} - {{ curso?.value?.name }}</template>
        <template #body>
            <Input type="button" value="Ver examenes" background="var(--primary)" color="white"
                @action="() => router.push(`/examenes/${escuela.value.id}/${curso?.value.id}`)" />
            <div class="alumnos mt-3" flex flex-column>
                <div class="alumno" v-for="(alumno, key) in alumnos" :key flex-center>
                    {{ alumno?.nombre }} {{ alumno?.apellido }}
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import Card from '../../layout/Card.vue';
import { onMounted, reactive, ref } from 'vue';
import { get, post } from '../../utils/apiReq';
import { Input } from 'digitalpower';

const route = useRoute();
const router = useRouter();

const curso = reactive({});
const escuela = reactive({});
const alumnos = ref([]);

onMounted(async () => {
    await getSchool();
    await getCurso();
    await getAlumnos();
})

const getSchool = async () => {
    const id = route.params.escuelaId;
    let response = await get(`/escuelas/${id}`);
    escuela.value = response.data;
}

const getCurso = async () => {
    const id = route.params.cursoId;
    let response = await get(`/cursos/${id}`);
    curso.value = response.data;
}

const getAlumnos = async () => {
    let response = await post(`/alumnos/curso/`, { id: curso.value?.id });
    alumnos.value = response?.data;
}

</script>

<style scoped>
.alumno {
    border-bottom: 1px solid var(--primary);
    height: 50px;
    width: 100%;
    cursor: pointer;
    transition: var(--duration);
    justify-content: start;
    padding-left: 1em;

    max-width: 400px;

    &:hover {
        background-color: var(--primary);
        color: white;
    }
}
</style>
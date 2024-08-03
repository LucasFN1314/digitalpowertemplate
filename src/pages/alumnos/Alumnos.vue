<template>
    <Card>
        <template #title>Agregar Alumno</template>
        <template #body>
            <Input type="select" v-model="escuela" :options="escuelas" label="Escuela" class="mt-3" />
            <Input type="select" v-model="curso" :options="cursos" label="Curso" class="mt-4"
                v-if="cursos?.length > 0" />

            <div v-if="curso">
                <Input v-model="dni" label="DNI del alumno" placeholder="Ingrese el DNI" class="mt-4" />
                <Input v-model="nombre" label="Nombre del alumno" placeholder="Ingrese el Nombre" class="mt-4" />
                <Input v-model="apellido" label="Apellido del alumno" placeholder="Ingrese el Apellido" class="mt-4" />
                <Input type="button" value="Confirmar" background="var(--primary)" color="var(--font-color)"
                    class="mt-4" @action="confirm" />
            </div>

        </template>
    </Card>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import Card from '../../layout/Card.vue';
import { Input } from 'digitalpower';
import { useUserStore } from '../../store/userStore';
import { get, post } from '../../utils/apiReq';
import { show } from '../../utils/notification';

const userStore = useUserStore();
const user = reactive({});
const escuelas = ref([]);
const cursos = ref([]);

const escuela = ref(0);
const curso = ref();
const dni = ref("");
const nombre = ref("");
const apellido = ref("");

onMounted(async () => {
    user.value = await userStore.info();
    if (user.value?.admin !== 1) location.href = "/";

    await getSchools();
})

const getSchools = async () => {
    let response = await get("/escuelas");
    escuelas.value = response.data?.map((x) => {
        return {
            value: x?.id,
            name: x?.name
        }
    });
}

const getCursos = async () => {
    let response = await get("/cursos");
    cursos.value = response.data?.map((x) => {
        return {
            value: x?.id,
            name: x?.name
        }
    });
}

const confirm = async () => {
    let payload = {
        dni: dni.value,
        nombre: nombre.value,
        apellido: apellido.value,
        admin: 0,
        curso: curso.value
    }
    let response = await post("/alumnos", payload);
    if (response.data?.id) show("Alumno ingresado!");
}

watch(escuela, (new_val) => {
    if (!new_val) return;
    getCursos();
})
</script>

<style scoped>
p {
    text-align: left;
}
</style>
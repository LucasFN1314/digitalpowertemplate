<template>
    <Card>
        <template #title>Agregar Cursos</template>
        <template #body>
            <Input type="select" v-model="escuela" :options="escuelas" label="Escuela" class="mt-3" />
            <Input label="Nombre del curso" placeholder="Ingrese el nombre" v-model="nombre" class="mt-4" />
            <Input type="button" value="Confirmar" background="var(--primary)" color="var(--font-color)" class="mt-4"
                @action="confirm" />
        </template>
    </Card>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import Card from '../../layout/Card.vue';
import { Input } from 'digitalpower';
import { useUserStore } from '../../store/userStore';
import { get, post } from '../../utils/apiReq';
import { show } from '../../utils/notification';

const userStore = useUserStore();
const user = reactive({});
const escuelas = ref([]);

const escuela = ref(0);
const nombre = ref("");


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

const confirm = async () => {
    let response = await post("/cursos", { name: nombre.value, escuela: escuela.value })
    if (response.data?.id) show("Curso guardado");
}
</script>

<style scoped>
p {
    text-align: left;
}
</style>
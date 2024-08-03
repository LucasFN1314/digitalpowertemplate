<template>
    <Card>
        <template #title>Agregar Escuela</template>
        <template #body>
            <Input label="Nombre de la escuela" placeholder="Ingrese el nombre" class="mt-3" v-model="nombre" />
            <Input background="var(--primary)" color="var(--font-color)" class="mt-3" type="button" value="Confirmar"
                @action="confirm" />
        </template>
    </Card>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import Card from '../../layout/Card.vue';
import { Input } from 'digitalpower';
import { useUserStore } from '../../store/userStore';
import { post } from '../../utils/apiReq';
import { show } from '../../utils/notification';

const userStore = useUserStore();

const nombre = ref();
const user = reactive({});

onMounted(async () => {
    user.value = await userStore.info();
    if (!user.value?.admin !== 1) location.href = "/";
})

const confirm = async () => {
    let response = await post("/escuelas", { name: nombre.value });
    if (response.data?.id) show("Escuela agregada!")
}
</script>

<style scoped>
p {
    text-align: left;
}
</style>
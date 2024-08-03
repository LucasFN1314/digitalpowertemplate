<template>
    <Card>
        <template #title>Inicio</template>
        <template #body>
            <p class="mb-4">Hola {{ user.value?.nombre }} {{ user.value?.apellido }}!</p>
            <Escuelas />
        </template>
    </Card>
</template>

<script setup>
import Card from '../../layout/Card.vue';
import Escuelas from './admin/Escuelas.vue';

import { useUserStore } from '../../store/userStore';
import { onMounted, reactive, ref } from 'vue';

const userStore = useUserStore();
let user = reactive({});

onMounted(async () => {
    user.value = (await userStore.get());
})

</script>

<style scoped>
p {
    text-align: left;
}
</style>
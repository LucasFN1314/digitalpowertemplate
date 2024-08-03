<template>
    <div class="home">
        <Card>
            <template #title>Inicio</template>
            <template #body>
                <p>Hola {{ user.value?.nombre }} {{ user.value?.apellido }}!</p>

                <div class="mt-2 mb-4" v-if="user.value?.admin === 0">
                    <p>Escuela: {{ user.value?.curso?.escuela?.name }}</p>
                    <p>Curso: {{ user.value?.curso?.name }}</p>
                </div>

                <div class="mt-4" v-if="user.value?.admin === 1">
                    <h4 underline>Escuelas</h4>
                    <Escuelas />
                </div>

                <Examenes v-if="user.value?.admin === 0" :user />

            </template>
        </Card>
    </div>
</template>

<script setup>
import Card from '../../layout/Card.vue';
import Escuelas from '../../components/home/admin/Escuelas.vue';
import Examenes from '../../components/home/alumno/Examenes.vue';

import { useUserStore } from '../../store/userStore';
import { onMounted, reactive, ref } from 'vue';
import { get } from '../../utils/apiReq';

const userStore = useUserStore();

let user = reactive({});
const curso = reactive({});
const escuela = reactive({});

onMounted(async () => {
    user.value = (await userStore.info());
})

</script>

<style scoped>
p {
    margin: 0;
    text-align: left;
}
</style>
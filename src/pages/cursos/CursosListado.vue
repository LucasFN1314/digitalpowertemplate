<template>
    <Card>
        <template #title>{{ school.value?.name }}</template>
        <template #body>
            <div class="cursos">
                <div class="mt-3" flex flex-column gapped>
                    <div class="curso" v-for="(curso, key) in cursos" :key flex-center radius-border
                        @click="() => router.push(`/cursos/${route.params.escuelaId}/${curso?.id}`)">
                        <p>
                            {{ curso?.name }}
                        </p>
                    </div>
                </div>
            </div>
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
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const user = reactive({});
const school = reactive({});
const cursos = ref([]);

onMounted(async () => {
    user.value = await userStore.info();
    if (user.value?.admin !== 1) location.href = "/";

    await getSchool();
    await getCursos();
})

const getSchool = async () => {
    let response = await get(`/escuelas/${route.params.escuelaId}`);
    school.value = response.data;
}

const getCursos = async () => {
    let response = await post(`/cursos/escuela`, {
        where: {
            escuela: school.value?.id
        }
    });
    cursos.value = response.data;
}

</script>

<style scoped lang="scss">
p {
    text-align: left;
    margin: 0;
}

.curso {
    border: 1px solid var(--primary);
    width: 100%;
    height: 50px;
    transition: var(--duration);

    max-width: 400px;
    cursor: pointer;

    &:hover {
        background: var(--primary);
        color: var(--font-color);
    }
}

.cursos {
    height: 100%;
    overflow-y: auto;
    padding: 0 1em;
}
</style>
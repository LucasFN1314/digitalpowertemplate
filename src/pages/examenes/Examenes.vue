<template>
    <Card>
        <template #title>{{ id_uri ? 'Editar' : 'Agregar' }} Examen</template>
        <template #body>
            <Input type="select" v-model="escuela" :value="escuela" :options="escuelas" label="Escuela" class="mt-3" />
            <Input type="select" v-model="curso" :options="cursos" :value="curso" label="Curso" class="mt-4"
                v-if="cursos?.length > 0" />

            <div v-if="curso">
                <Input type="text" v-model="nombre" :value="nombre" label="Nombre del examen"
                    placeholder="Ingrese el nombre" class="mt-4" />

                <!--Modal creacion puntos-->
                <PuntosModal v-if="puntosModal" @close="updatePoint" :puntos :pKey />
                <div class="lista-puntos mt-4" flex flex-column gapped>
                    <div class="" v-for="(punto, key) in puntos" radius-border>
                        <div class="punto p-3" @click="getPunto(punto?.key)">
                            {{ key + 1 }}) {{ punto?.contenido ?? punto?.name }}
                        </div>
                        <Input type="button" value="Eliminar" class="mt-2" color="white" background=var(--red)
                            @action="deletePoint(punto)" />
                    </div>
                </div>

                <Input type="button" value="Agregar punto" background="var(--primary)" color="var(--font-color)"
                    class="mt-5" @action="getPunto" />

                <Input type="button" value="Confirmar Examen" background="var(--primary)" color="var(--font-color)"
                    class="mt-4" @action="confirm" />

            </div>

        </template>
    </Card>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import Card from '../../layout/Card.vue';
import PuntosModal from '../../components/Examenes/PuntosModal.vue';
import { Input, Modal } from 'digitalpower';
import { useUserStore } from '../../store/userStore';
import { get, post } from '../../utils/apiReq';
import { ConfirmModal, show } from '../../utils/notification';
import { useRoute, useRouter } from 'vue-router';

const route = useRouter();
const rout = useRoute();

const userStore = useUserStore();
const user = reactive({});
const escuelas = ref([]);
const cursos = ref([]);

const escuela = ref();
const curso = ref();
const nombre = ref();

const pKey = ref(-1);
const puntos = ref([]);
const puntosModal = ref(false);

const id_uri = rout.query.id;
const escuela_uri = rout.query.escuela;
const curso_uri = rout.query.curso;
const redirect_uri = rout.query.redirect_uri;

onMounted(async () => {
    user.value = await userStore.info();
    if (user.value?.admin !== 1) location.href = "/";

    await getSchools();

    getSchool();

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

const getSchool = () => {
    if (!id_uri) return;
    let index = escuelas.value.find((x) => x.value === parseInt(escuela_uri));
    escuela.value = index?.value;
}

const getCursos = async () => {
    let response = await get("/cursos");
    cursos.value = response.data?.map((x) => {
        return {
            value: x?.id,
            name: x?.name
        }
    });

    if (curso_uri) {
        let index = cursos.value.find((x) => x.value === parseInt(curso_uri));
        curso.value = index?.value;
        await getExam();
    }
}

const getExam = async () => {
    let response = await get(`/examenes/${id_uri}`);
    nombre.value = response?.data?.name;

    response = await post(`/puntos-examen/find`, { where: { examen: { id: id_uri } } });

    puntos.value = response.data;
    puntos.value.forEach((x, key) => {
        x.respuestas = JSON.parse(x.respuestas);
        x.correcta = atob(x.correcta);
        x.cantidad = x.respuestas.length;
        x.name = x.contenido;
        x.key = key;
    })
}

const getPunto = (key) => {

    if (!key && key !== 0) {
        pKey.value = puntos.value.length;
        console.log(pKey.value);

        puntos.value.push({ key: pKey.value, respuestas: [], name: '', correcta: '', cantidad: 1, });
    }
    else {
        pKey.value = key;
    }

    openModal();
}

const updatePoint = (payload) => {
    if (!payload) { closeModal(); return; };
    puntos.value[payload.key] = payload;
    closeModal();
}

const openModal = () => {
    puntosModal.value = true;
}

const closeModal = () => {
    puntosModal.value = false;
}

const confirm = async () => {
    try {
        const examID = await saveExam({ name: nombre.value, available: 1, curso: curso.value, id: parseInt(id_uri) });
        if (!examID) { show("Error al guardar"); return; }

        //const pointsPayload = puntos.value.map((x) => { return { contenido: x?.name, examen: examID } });
        let savedPoints = await savePoints(puntos.value, examID);

    } catch (error) {
    }
}

// || Guardado de examen
const saveExam = async (payload) => {
    let url = id_uri ? '/examenes/update' : '/examenes';
    let response = await post(url, payload);
    if (response?.data?.id) return response?.data?.id;
    return false;
}

const savePoints = async (puntos, id) => {
    const sPuntos = puntos.map((x) => {
        return {
            contenido: x.name,
            examen: id,
            respuestas: JSON.stringify(x?.respuestas),
            correcta: btoa(x.correcta),
            id: x?.id
        }
    })
    let response = await post("/puntos-examen/multiple", sPuntos);
    if (response?.data?.puntos) {
        show("Examen guardado");
        const url = redirect_uri ? redirect_uri : `/cursos/${escuela.value}/${curso.value}`;
        route.push(url);
    }
}

const deletePoint = async (punto) => {
    let confirm = await ConfirmModal();
    if (confirm) {
        // || delete server
        if (punto.id) {
            await post('/puntos-examen/delete', { id: punto.id })
        }

        // || delete array
        puntos.value = puntos.value.filter((x) => x?.key !== punto.key)
    }
}

watch(escuela, (new_val) => {
    if (!new_val && new_val !== 0) return;
    getCursos();
})
</script>

<style scoped>
p {
    text-align: left;
}

.punto {
    max-width: 400px;
    transition: var(--duration);
    border: 1px solid var(--primary);
    cursor: pointer;

    &:hover {
        background: var(--primary);
        color: white;
    }
}
</style>
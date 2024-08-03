<template>
    <h2 underline>Examenes</h2>
    <p class="alert" shadow>
        En caso de cerrar la aplicacion durante evaluacion, cambiar de aplicacion, dividir la pantalla o rotarla, el
        examen sera
        automaticamente
        inhabilitado.
    </p>

    <p class="alert blue" shadow>Por problemas de conexion, comuniquese con su profesor.</p>

    <div class="examenes" flex-column flex>
        <div class="mt-3" v-for="(examen, key) in examenes" :key>
            <p class="inhabilitado" v-if="inhabilitado(examen)">Inhabilitado</p>
            <div class="examen" :class="{ disabled: inhabilitado(examen) }" flex-center radius-border>
                {{ examen?.name }}
            </div>
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { post } from '../../../utils/apiReq';

const props = defineProps(['user']);
const examenes = ref([]);

onMounted(async () => {
    // Recordatorio, guardar en localstorage respuestas (por si se va el internet)
    let response = await post("/examenes/alumno", { user: props.user.value });
    examenes.value = response.data;
})

const inhabilitado = (examen) => {
    if (!examen.estados) return false;

    const en_curso = examen.estados.filter((x) => x.status === 1);
    return en_curso.length > 0;
}
</script>

<style scoped>
p {}

.alert {
    text-align: left;
    background: var(--red);
    color: white;
}

.blue {
    background: #fcbf49;
    color: black;
}

.examen {
    height: 50px;
    position: relative;
    border: 1px solid var(--primary);
    transition: var(--duration);
    cursor: pointer;

    &:hover {
        background-color: var(--primary);
        color: white;
    }
}

.inhabilitado {
    color: black !important;
}

.disabled {
    background: gray;
    color: white;
    border: none;

    &:hover {
        background: gray;
        color: white;
    }
}
</style>
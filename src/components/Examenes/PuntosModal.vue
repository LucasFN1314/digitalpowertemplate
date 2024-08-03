<template>
    <Modal class="puntosModal" title="Añadir punto al examen" @close="emits('close')">
        <Input label="Pregunta del punto" placeholder="Ingrese la pregunta" type="textarea" v-model="name"
            :value="name" />

        <Input class="mt-4" type="number" label="Cantidad de respuestas" placeholder="Ingrese la cantidad de respuestas"
            v-model="cantidad" :value="cantidad" />

        <Input type="button" value="Confirmar" class="confirm mt-4" background="var(--primary)" color="white"
            @action="close" />

        <div class="respuesta mt-4" v-for="(respuesta, key) in cantidad" :key>
            <Input :label="`Respuesta ${key + 1})`" placeholder="Ingrese la respuesta" v-model="respuestas[key]"
                :value="respuestas[key]" />
        </div>

        <Input class="mt-4" label="Respuesta correcta" placeholder="Ingrese la respuesta correcta" v-model="correcta"
            :value="correcta" />
    </Modal>
</template>

<script setup>
import { Modal, Input } from 'digitalpower';
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue';

const props = defineProps(['modelValue', 'pKey', 'puntos']);
const emits = defineEmits(['update:modelValue', 'close']);

const punto = reactive({});

const name = ref("");
const correcta = ref("");
const respuestas = ref([]);
const cantidad = ref(0);

onBeforeMount(() => {
    punto.value = props.puntos[props.pKey];
    name.value = punto.value.name;
    respuestas.value = punto.value.respuestas;
    correcta.value = punto.value.correcta;
    cantidad.value = punto.value.cantidad;
})

const close = () => {
    emits('close', { name: name.value, key: props.pKey, correcta: correcta.value, respuestas: respuestas.value, cantidad: cantidad.value });
}

watch(cantidad, (value) => {


    if (punto.value.respuestas.length < value) {
        while (respuestas.value.length < value) respuestas.value.push('');
    }

    if (respuestas.value.length > value) {

        const temp = respuestas.value;
        respuestas.value = [];

        for (let i = 0; i < value; i++) {
            respuestas.value.push(temp[i]);
        }
    }

})

</script>

<style scoped></style>
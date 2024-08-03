<template>
    <div class="escuelas" bordered radius-border>
        <ul>
            <li v-for="(escuela, key) in escuelas">
                <EscuelaItem :escuela />
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import EscuelaItem from '../../Escuelas/EscuelaItem.vue';
import { get, post } from '../../../utils/apiReq';

const escuelas = ref([]);

onMounted(async () => {

    let response = await get("/escuelas");
    escuelas.value = response.data;
})
</script>

<style scoped>
ul {
    margin: 0;
    padding: 0;
    list-style: none;
    margin-bottom: 1em;
}

.escuelas {
    padding: 1em;
    height: 400px;
    max-width: 400px;
    overflow-y: auto;
}
</style>
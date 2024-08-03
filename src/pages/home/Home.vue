<template>
    <Card>
        <template #title>Inicio</template>
        <template #body>
            <p class="mb-4">Hola usuario! Bienvenido a Digital Power Template.</p>
            <Input type="text" label="Buscar Módulos" value="" placeholder="Nombre del modulo" />
        </template>
    </Card>
</template>

<script setup>
import Card from '../../layout/Card.vue';
import { Input } from 'digitalpower';
</script>

<style scoped>
p {
    text-align: left;
}
</style>
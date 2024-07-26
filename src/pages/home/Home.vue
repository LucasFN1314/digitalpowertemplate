<template>
    <Card>
        <template #title>Inicio</template>
        <template #body>
            <p>Hola usuario! Bienvenido a Digital Power Managment.</p>
            <Input type="text" label="Buscar Módulos" value="" placeholder="Nombre del modulo" class="mt-6" />
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
<template>
    <Card>
        <template #title>Inicio</template>
        <template #body>
            <p>Hola usuario! Bienvenido a Digital Power Managment.</p>
            <Input type="text" label="Buscar Módulos" value="value" class="mt-6" />
        </template>
    </Card>
</template>

<script setup>
import Card from '../../layout/Card.vue';
import { Input } from 'vuedigitalpowerui';
</script>

<style scoped>
p {
    text-align: left;
}
</style>
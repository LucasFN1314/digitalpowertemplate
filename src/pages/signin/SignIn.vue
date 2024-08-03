<template>
    <Card>
        <template #title>Iniciar Sesion</template>
        <template #body>
            <form @submit.prevent="login">
                <Input placeholder="Ingresa tu DNI" label="DNI del alumno" class="mt-4 col-lg-4 col-md-6"
                    v-model="dni" />
                <Input type="button" value="Ingresar" background="var(--primary)" color="var(--font-color)" class="mt-3"
                    @action="login" />
            </form>
        </template>
    </Card>
</template>

<script setup>
import { ref } from 'vue';
import Card from '../../layout/Card.vue';
import { Input } from 'digitalpower';
import { useUserStore } from '../../store/userStore';

const user = useUserStore();
const dni = ref();

const login = async () => {
    let response = await user.login({ dni: dni.value });
    if (response) {
        location.href = "/";
    }
}
</script>

<style scoped>
p {
    text-align: left;
}
</style>
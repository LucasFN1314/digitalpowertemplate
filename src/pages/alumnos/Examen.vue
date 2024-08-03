<template>

</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) router.push("/");
    })


})
</script>
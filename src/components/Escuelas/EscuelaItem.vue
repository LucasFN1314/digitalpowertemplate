<template>
    <router-link :to="`/cursos/${escuela?.id}`" class="escuela mb-3" radius-border flex-center>
        <p>
            {{ escuela?.name }}
        </p>
    </router-link>
</template>

<script setup>
const props = defineProps(["escuela"]);
</script>

<style scoped lang="scss">
.escuela {
    height: 50px;
    width: 100%;

    border: 1px solid var(--primary);
    transition: var(--duration);

    &:hover {
        background-color: var(--primary);

        p {
            color: var(--font-color);
        }
    }
}

p {
    margin: 0;
    color: var(--primary);
    transition: var(--duration);
}
</style>
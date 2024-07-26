<script setup>
import Sidebar from "./components/Sidebar/Sidebar.vue";
</script>

<template>
    <div class="app" flex>
        <Sidebar />
        <div class="app-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
.app {
    width: 100vw;
    height: 100vh;
}

.app-container {
    width: 100%;
    height: 100vh;
    padding: 2em;
    padding-left: 6em;
    overflow-y: auto;
    color: black;

    position: absolute;
    top: 0;
    right: 0;
}
</style>
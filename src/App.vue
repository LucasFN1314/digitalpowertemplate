<script setup>
import { onMounted } from "vue";
import Sidebar from "./components/Sidebar/Sidebar.vue";
import { useUserStore } from "./store/userStore";

const user = useUserStore();
onMounted(async () => {
    if (!await user.get() && !['/signin'].includes(location.pathname)) location.href = "/signin";
}); 
</script>

<template>
    <div class="app" flex>
        <Sidebar />
        <div class="app-container">
            <div id="notification-container"></div>
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

#notification-container {
    position: fixed;
    top: 0;
    right: 0;
    margin-right: 1em;
    z-index: 1000;
}

@media screen and (max-width: 600px) {
    .app-container {
        padding: 0;
        width: 80%;
    }
}
</style>
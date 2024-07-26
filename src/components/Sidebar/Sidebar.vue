<script setup>
import { onMounted, computed } from "vue";
import { Sidebar } from "digitalpower";
import items from "../../controllers/sidebarController.js";
import { useRouter } from "vue-router";

const router = useRouter();

const action = (link) => {
    router.push(link);
}

</script>
<template>
    <div class="sidebar">
        <Sidebar id="mobileSidebar" :items="items" @action="action"></Sidebar>
    </div>
</template>

<style scoped lang="scss">
.sidebar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    background: var(--primary);
    background: var(--background);

    overflow-y: auto;
    z-index: 20;
    background: var(--primary);
}

.sitem {
    padding: .8em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.308);

    cursor: pointer;
    user-select: none;

    transition: var(--duration);

    &:hover {
        background: rgba(0, 0, 0, 0.3);
    }
}

.sidebar-mobile {
    background: var(--primary);
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 20;

    color: white;
}
</style>
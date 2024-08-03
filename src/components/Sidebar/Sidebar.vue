<script setup>
import { onMounted, computed, ref } from "vue";
import { Sidebar } from "digitalpower";
import getItems from "../../controllers/sidebarController.js";
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/userStore.js";

const user = useUserStore();
const router = useRouter();
const items = ref([]);

const action = (link) => {
    router.push(link);
}


onMounted(async () => {
    const userinfo = await user.info();
    items.value = getItems(userinfo);
})

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
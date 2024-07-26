<script setup>
import { onMounted, computed } from "vue";
import TreeItem from "./TreeItem.vue";
import { Sidebar } from "digitalpower";
import items from "../../controllers/sidebarController.js";

onMounted(() => {
});

const itemsMobile = computed(() => {
    let Items = items.map((x) => {
        let item = {
            label: x?.title,
            icon: x?.icon,
            url: x?.target,
            fill: "white"
        };

        if (x?.children) {
            item.children = x?.children.map((y) => {
                return {
                    label: y?.title,
                    icon: y?.icon,
                    url: y?.target,
                    fill: "white"
                };
            });
        }
        return item;
    });
    console.log(Items);
    return Items;
});

</script>
<template>
    <div class="sidebar desktop">
        <Sidebar id="mobileSidebar" :items="items"></Sidebar>
    </div>
    <div class="sidebar-mobile mobile">
        <Sidebar id="mobileSidebar" :items="items"></Sidebar>
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
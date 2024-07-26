<template>
    <v-treeview :items="items">
        <template v-slot:prepend="{ item }">
            <v-list-item-prepend v-if="item?.icon">
                <v-icon :icon="item?.icon"></v-icon>
            </v-list-item-prepend>
        </template>
        <template v-slot:title="{ item }">
            <v-list-item-title @click="action(item)" :key="item.id" flex-center>
                {{ item?.title }}
            </v-list-item-title>
        </template>
    </v-treeview>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps(["items"]);
const router = useRouter();

function action(item) {
    if (item?.target) {
        router.push(item?.target);
    }
}

</script>
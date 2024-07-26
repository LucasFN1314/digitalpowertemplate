import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
    state: () => { },
    getters: {},
    actions: {
        showAlert(message) {
            alert(message);
        }
    },
});
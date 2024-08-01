import { defineStore } from "pinia";
import { post } from "../utils/apiReq";

export const useUserStore = defineStore("user", {
    state: () => { },
    getters: {},
    actions: {
        async info() {
            // || Request to server
            let localUser = localStorage.getItem("user")
            if (localUser !== "undefined" && localUser !== null) {
                let user = JSON.parse(localStorage.getItem("user"));
                return await post("/alumnos/info", { id: user?.id });
            }
        },
        async login(payload) {
            // || Request auth and save storage local
            let response = await post("/alumnos/signin", payload);
            if (response.data?.user) {
                localStorage.clear();
                localStorage.setItem("user", JSON.stringify(response.data.user));
                return response.data.user;
            }
        },
        async get() {
            let localUser = localStorage.getItem("user")
            if (localUser !== "undefined" && localUser !== null) {
                return JSON.parse(localStorage.getItem("user"));
            }
        },
        logout() {
            localStorage.clear();
            location.href = "/";
        }
    },
});
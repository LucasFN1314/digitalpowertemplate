import axios from "axios";
import { show } from "./notification.js";

export const backendUrl = "http://localhost:3000";

const service = axios.create({
    baseURL: `${backendUrl}`
});

let user = "";
if (localStorage.getItem("user") !== "undefined")
    user = JSON.parse(localStorage.getItem("user"));
const config = {
    headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    },
};

export const get = (path, body) => {
    return new Promise(async (resolve) => {
        service
            .get(path, config)
            .then((response) => {
                if (response.data.data) response.data = response.data.data;
                let message = response?.message ?? response.data?.message;
                let status = response?.status ?? response.data?.status;

                if (message) {
                    show(message);
                }
                setTimeout(() => {
                    if (response?.data?.redirect) {
                        location.href = response?.data?.redirect;
                    }
                }, 1000);

                if (status === 401) {
                    location.href = "/admin";
                }
                resolve(response);
            })
            .catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    localStorage.removeItem("dp_user");
                    location.href = "/login";
                }
                show("Ha ocurrido un error, intente mas tarde");
            })
            .finally(() => { });
    });
};

export const post = (path, body) => {
    return new Promise(async (resolve) => {
        service
            .post(path, body, config)
            .then((response) => {
                if (response.data.data) response.data = response.data.data;
                let message = response?.message ?? response.data?.message;
                let status = response?.status ?? response.data?.status;

                if (message) {
                    show(message);
                }
                setTimeout(() => {
                    if (response?.data?.redirect) {
                        location.href = response?.data?.redirect;
                    }
                }, 1000);

                if (status === 401) {
                    location.href = "/admin";
                }
                resolve(response);
            })
            .catch((err) => {

                if (err.response.status === 401) {
                    localStorage.removeItem("dp_user");
                    location.href = "/login";
                }
                else if (typeof err.response?.data?.message !== "string") {
                    for (const msg of err.response?.data?.message) {
                        show(msg);
                    }
                }
                else
                    show("Ha ocurrido un error, intente mas tarde");
            })
            .finally(() => { });
    });
};
export const files = (path, body) => {
    return new Promise((resolve) => {
        service
            .post(path, body, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${user?.token}`,
                    Accept: "application/json",
                },
            })
            .then((response) => {
                if (response.data?.message) {
                    show(response.data.message);
                }
                setTimeout(() => {
                    if (response?.data?.data?.redirect)
                        location.href = response?.data?.data?.redirect;
                }, 1000);

                if (response.data?.status === 401) {
                    location.href = "/admin";
                }

                resolve(response.data);
            })
            .catch((err) => {
                if (err?.response?.status === 401) {
                    location.href = "/login";
                }
                show("Ha ocurrido un error, intente mas tarde");
            })
            .finally(() => { });
    });
};
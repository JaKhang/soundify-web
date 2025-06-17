import axios, { AxiosRequestConfig } from "axios";
import store from "@redux/store.ts";

const DOMAIN = import.meta.env.VITE_API_BASE_URL || "https://soundifies.space";

const axiosInstance = axios.create({
    proxy: false,
    baseURL: "http://localhost:8080",
    withCredentials:true
});
axiosInstance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        if (error === null) throw new Error("Unrecoverable error!! Error is null!");
        if (axios.isAxiosError(error)) {
            const response = error?.response;
            const request = error?.request;
            if (error.code === "ERR_NETWORK") {
                console.log("connection problems..");
            } else if (error.code === "ERR_CANCELED") {
                console.log("connection canceled..");
            }
            if (response) {
                return Promise.reject(response.data);
            } else if (request) {
                console.log(request)
            }
        }
    }
);

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default {
    async get<T>(
        endpoint: string,
        option?: AxiosRequestConfig<never>
    ): Promise<T> {
        return await axiosInstance.get(endpoint, option);
    },
    async post<T, D>(
        endpoint: string,
        data?: D,
        option?: AxiosRequestConfig<never>
    ): Promise<T> {
        return await axiosInstance.post(endpoint, data, option);
    },
    async put<T, D>(
        endpoint: string,
        data?: D,
        option?: AxiosRequestConfig<never>
    ): Promise<T> {
        return await axiosInstance.put(endpoint, data, option);
    },
    async delete<T>(
        endpoint: string,
        option?: AxiosRequestConfig<never>
    ): Promise<T> {
        return axiosInstance.delete(endpoint, option);
    },

};


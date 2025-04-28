import axios, { AxiosRequestConfig } from "axios";

const DOMAIN = process.env.REACT_APP_API_URL || "https://api.muemp3.site";

const request = axios.create({
    proxy: false,
    baseURL: DOMAIN,
});
request.interceptors.response.use(
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

export default {
    async get<T>(
        endpoint: string,
        option?: AxiosRequestConfig<never>
    ): Promise<ApiResponse<T>> {
        return await request.get(endpoint, option);
    },
    async post<T, D>(
        endpoint: string,
        data?: D,
        option?: AxiosRequestConfig<never>
    ): Promise<ApiResponse<T>> {
        return await request.post(endpoint, data, option);
    },
    async put<T, D>(
        endpoint: string,
        data?: D,
        option?: AxiosRequestConfig<never>
    ): Promise<ApiResponse<T>> {
        return await request.put(endpoint, data, option);
    },
    async delete<T>(
        endpoint: string,
        option?: AxiosRequestConfig<never>
    ): Promise<ApiResponse<T>> {
        return request.delete(endpoint, option);
    },

};


export interface ApiResponse<T> {
    data: T
    message: string
}
import api from "./api.ts";
import Principal from "@features/auth/Principal.ts";
import {Device} from "@models/Account.ts";

class AccountApi {
    async getPrincipal() {
        return api.get<Principal>("/v1/accounts/principal")
    }

    async logout() {
        return await api.post("/v1/accounts/logout");
    }

    async getDevices() {
        return await api.get<Device[]>("/v1/accounts/devices");
    }

    async logoutDevice(id: string) {
        return await api.post(`/v1/accounts/devices/${id}/logout`);

    }
}

export default new AccountApi();
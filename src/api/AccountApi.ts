import api from "./api.ts";
import Principal from "@features/auth/Principal.ts";

class AccountApi {
    async getPrincipal() {
        return api.get<Principal>("/v1/accounts/principal")
    }

    async logout() {
        return await api.post("/api/v1/accounts/logout");
    }

    async getDevices() {
        return await api.get("/v1/accounts/devices");
    }
}

export default new AccountApi();
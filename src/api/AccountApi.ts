import api from "./api.ts";
import Principal from "@features/auth/Principal.ts";

class AccountApi {
    async getPrincipal() {
        return await api.get<Principal>("/api/v1/account/principal");
    }

    async logout() {
        return await api.post("/api/v1/account/logout");
    }
}

export default new AccountApi();
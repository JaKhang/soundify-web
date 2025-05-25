import api from "./api.ts";
import Principal from "@features/auth/Principal.ts";

class AccountApi {
    async getPrincipal() {
        // return await api.get<Principal>("/api/v1/account/principal");
        return new Promise<Principal>(resolve => {
            setTimeout(() => {
                const tmp: Principal = {
                    avatar: [
                        {
                            url: "https://i.scdn.co/image/ab67616d0000b273d0e2168c8f5e545b621ad549",
                            height: 640,
                            width: 640,
                        },
                        {
                            url: "https://i.scdn.co/image/ab67616d00001e02d0e2168c8f5e545b621ad549",
                            height: 300,
                            width: 300,
                        },
                        {
                            url: "https://i.scdn.co/image/ab67616d00004851d0e2168c8f5e545b621ad549",
                            height: 64,
                            width: 64,
                        },
                    ]
                }

                resolve(tmp);
            }, 1000)
        })
    }

    async logout() {
        return await api.post("/api/v1/account/logout");
    }
}

export default new AccountApi();
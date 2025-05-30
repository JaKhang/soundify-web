import {TokenResponse} from "@models/Auth.ts";
import api from "./api.ts";

interface AuthRequest{
    usernameOrEmail: string,
    password: string
}

export class AuthApi {
    login(email:string, password:string){
        return api.post< TokenResponse, AuthRequest>("/v1/auth/authenticate", {usernameOrEmail: email, password}, {withCredentials: true})
    }

    getAccessToken(){
        return api.get<TokenResponse>("/v1/auth/access-token", {withCredentials: true})

    }

}

export default new AuthApi;
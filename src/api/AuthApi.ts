import {TokenResponse} from "@models/Auth.ts";


export class AuthApi {
    login(email, password){
        return new Promise<TokenResponse>((resolve, reject) => {
            setTimeout(() => {
                resolve({token: 'token', type: 'bearer'} as TokenResponse);
            }, 1000)
        })
    }

}

export default new AuthApi;
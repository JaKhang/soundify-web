import {Authority} from "@features/auth/Authority.ts";
import ImageModel from "@models/ImageModel.ts";
import {UserStatus} from "@features/auth/UserStatus.ts";

export default interface Principal {
    id: string;
    name: string;
    email: string;
    username: string;
    avatar: ImageModel[]
    authorities: Authority[];
    verified: boolean;
    status: UserStatus;
}
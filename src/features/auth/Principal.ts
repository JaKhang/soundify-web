import {UserStatus} from "@features/auth/UserStatus.ts";
import {Image} from "@models/Image.ts";

export default interface Principal {
    name: string;
    username: string;
    avatar: Image[]; // Array type, can be refined based on the actual content of the avatar
    dob: string; // ISO 8601 date string format
    locale: string;
    email: string;
    isVerified: boolean;
    status: UserStatus;
}
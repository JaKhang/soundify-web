import React, {FC, useEffect} from 'react';
import {useAuthSelector} from "@redux/selector.ts";
import {useAuthAction} from "@redux/action.ts";
import OnlyChildrenProps from "../../utils/OnlyChildrenProps.ts";
import {useCookies} from "react-cookie";
import authApi from "../../api/AuthApi.ts";
import {getPrincipal} from "@features/auth/authSlice.ts";
import accountApi from "../../api/AccountApi.ts";
import {useAppDispatch} from "@redux/store.ts";

const AuthMiddleware: FC<OnlyChildrenProps> = ({children}) => {
    const {principal, loading, accessToken} = useAuthSelector()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (principal) return
        authApi.getAccessToken()
            .then(t => dispatch(getPrincipal(t.token)))
            .then(() => accountApi.getDevices())
            .then(p => console.log(p))
            .catch((e) => console.log(e))
    }, [principal]);



    if (principal)
        return children
    if (loading)
        return <div>loading</div>

    return children;
};

export default AuthMiddleware;

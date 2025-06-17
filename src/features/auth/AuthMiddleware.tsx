import React, {FC, useEffect, useState} from 'react';
import {useAuthSelector} from "@redux/selector.ts";
import {useAuthAction} from "@redux/action.ts";
import OnlyChildrenProps from "../../utils/OnlyChildrenProps.ts";
import {useCookies} from "react-cookie";
import authApi from "../../api/AuthApi.ts";
import {getPrincipal} from "@features/auth/authSlice.ts";
import accountApi from "../../api/AccountApi.ts";
import {useAppDispatch} from "@redux/store.ts";

const AuthMiddleware: FC<OnlyChildrenProps> = ({children}) => {
    const {principal, accessToken} = useAuthSelector()
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        if (principal) return
        authApi.getAccessToken()
            .then(t => dispatch(getPrincipal(t.token)))
            .catch((e) => console.log(e))
            .finally(() => setLoading(false))
    }, [principal]);


    if (principal)
        return children
    if (loading)
        return <div>loading</div>
    return children
};

export default AuthMiddleware;

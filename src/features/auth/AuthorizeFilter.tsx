import React, {FC, JSX} from 'react';
import {useAuthSelector} from "@redux/selector.ts";
import {Navigate} from "react-router";

interface AuthFilterProps {
    authenticated: boolean
    children?: JSX.Element
}

const AuthorizeFilter: FC<AuthFilterProps> = ({children, authenticated}) => {
    const {principal} = useAuthSelector()
    if (!authenticated)
        return children;
    if (!principal)
        return <Navigate to="/login" />;

};

export default AuthorizeFilter;

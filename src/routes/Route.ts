import {JSX} from "react";

export interface Route {
    path: string;
    redirect?: string;
    component: JSX.Element;
    layout: boolean;
}
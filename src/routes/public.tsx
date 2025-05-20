import {Route} from "@routes/Route.ts";
import Home from "../pages/Home";
import Login from "../pages/Login";

export const publicRoutes: Route[]= [
    {
        path: "/",
        component: <Home/>,
        layout: true
    },
    {
        path: "/login",
        component: <Login/>,
        layout: false
    }
];
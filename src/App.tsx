import React from 'react';
import Layout from "@layout/Layout.tsx";
import {Route, Routes} from "react-router";
import Home from "@pages/Home";
import Login from "@pages/Login";
import AuthorizeFilter from "@features/auth/AuthorizeFilter.tsx";
import AuthMiddleware from "@features/auth/AuthMiddleware.tsx";

// Import Swiper styles
const App = () => {
    return (
        <AuthMiddleware>
            <Routes>
                <Route element={<Layout/>} >
                    <Route index element={<AuthorizeFilter authenticated={false}><Home/></AuthorizeFilter>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>

            </Routes>
        </AuthMiddleware>
    );
};

export default App;

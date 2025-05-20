import React from 'react';
import Layout from "@layout/Layout.tsx";
import {Route, Routes} from "react-router";
import Home from "@pages/Home";
import Login from "@pages/Login";
import AuthFilter from "@features/auth/AuthFilter.tsx";

const App = () => {
    return (
        <Routes>
            <Route element={<Layout/>} >
                <Route index element={<AuthFilter authenticated={false}><Home/></AuthFilter>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>

        </Routes>
    );
};

export default App;

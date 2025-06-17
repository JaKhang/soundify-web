import React from 'react';
import Layout from "@layout/Layout.tsx";
import {Route, Routes} from "react-router";
import Home from "@pages/Home";
import Login from "@pages/Login";
import AuthorizeFilter from "@features/auth/AuthorizeFilter.tsx";
import AuthMiddleware from "@features/auth/AuthMiddleware.tsx";
import Register from "@pages/register";
import AlbumDetails from "@pages/AlbumDetails";
import Account from "@pages/Account";
import DeviceDetails from "@pages/DeviceDetails";
import Setting from "@pages/Setting";
import Search from '@pages/Search';

// Import Swiper styles
const App = () => {

    return (
        <AuthMiddleware>
            <Routes>
                <Route element={<Layout/>} >
                    <Route index element={<AuthorizeFilter authenticated={false}><Home/></AuthorizeFilter>}/>
                    <Route path="/albums/:id" element={<AuthorizeFilter authenticated={false}><AlbumDetails/></AuthorizeFilter>}/>
                    <Route path="/accounts" element={<AuthorizeFilter authenticated={true}><Account/></AuthorizeFilter>}/>
                    <Route path="/devices" element={<AuthorizeFilter authenticated={true}><DeviceDetails/></AuthorizeFilter>}/>
                    <Route path="/search" element={<AuthorizeFilter authenticated={false}><Search/></AuthorizeFilter>}/>
                    <Route path="/settings" element={<AuthorizeFilter authenticated={true}><Setting/></AuthorizeFilter>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </AuthMiddleware>
    );
};

export default App;

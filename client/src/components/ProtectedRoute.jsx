import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const Router = () => {
    const token = Cookies.get('token');
    console.log("login token",token);
    const user = token ? true : false;

    return user ? <Outlet /> : <Navigate to="/adminLogin" />
}

export default Router

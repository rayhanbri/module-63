import {
    createBrowserRouter,
} from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import { Component } from "react";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Login/Register";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            }
        ]
    },
    {
        path:'/',
        Component:AuthLayout,
        children:[
            {
            path:'/login',
            Component:Login
        },
        {
            path:'/register',
            Component:Register
        }
    ]
    }
]);
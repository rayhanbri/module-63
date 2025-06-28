import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Home/Home/Shared/Navbar';
import Footer from '../pages/Home/Home/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;
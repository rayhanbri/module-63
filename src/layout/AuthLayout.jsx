import React from 'react';
import { Outlet } from 'react-router';
import image from '../assets/authImage.png'
import ProFastLogo from '../pages/Home/Home/Shared/ProFastLogo/ProFastLogo';

const AuthLayout = () => {
    return (
        <div className="p-12  ">
            <div>
            <ProFastLogo></ProFastLogo>
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <img
                    src={image}
                    className="max-w-sm "
                />
                </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
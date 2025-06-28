import React from 'react';
import logo from '../../../../../assets/logo.png'
const ProFastLogo = () => {
    return (
        <div className='flex items-center text-4xl font-bold gap-1'>
            <img src={logo} alt="" />
            <p><strong>Pro Fast</strong></p>
        </div>
    );
};

export default ProFastLogo;
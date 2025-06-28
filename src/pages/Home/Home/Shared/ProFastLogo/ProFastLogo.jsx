import React from 'react';
import logo from '../../../../../assets/logo.png'
const ProFastLogo = () => {
    return (
        <div className='flex items-end'>
            <img className='mb-2' src={logo} alt="" />
            <p><strong className='text-4xl font-bold'>Profast</strong></p>
        </div>
    );
};

export default ProFastLogo;
import React from 'react';
import merchatLocation from '../../../../assets/merchat/location-merchant.png'

const BeMerchant = () => {
    return (
        <div data-aos="flip-left"  className="bg-[#03373D] bg-[url('assets/merchat/be-a-merchant-bg.png')] bg-no-repeat p-20 rounded-4xl ">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={merchatLocation}
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-4xl  text-white font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-[#DADADA]">
                        We offer the lowest delivery charge with the highest value <span className='text-primary'>along</span> with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <button className="btn btn-primary text-black rounded-full">Be Come A Merchant</button>
                    <button className="btn btn-primary btn-outline ms-4 rounded-full text-primary">Earn with Profast Courier</button>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;
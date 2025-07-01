import React from 'react';
import CoverageMap from './CoverageMap';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const serviceCenters = useLoaderData();
    // console.log(serviceCenters)
    // send it  to map   and destructure it 
    return (
        <div className='max-w-4xl mx-auto px-4 py-10 '>
            <h1 className='text-3xl font-bold text-center mb-6'>
                We are availabel in 64 districts
            </h1>
            <CoverageMap serviceCenters={serviceCenters}></CoverageMap>
            
        </div>
    );
};

export default Coverage;
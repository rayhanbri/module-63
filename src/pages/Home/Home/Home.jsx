import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import BrandMarquee from './BrandMarquee/BrandMarquee';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <Services></Services>
          <BrandMarquee></BrandMarquee>
        </div>
    );
};

export default Home;
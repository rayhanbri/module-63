import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import BrandMarquee from './BrandMarquee/BrandMarquee';
import FeatureCards from './FeatureCards/FeatureCards';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <Services></Services>
          <BrandMarquee></BrandMarquee>
          <FeatureCards></FeatureCards>
        </div>
    );
};

export default Home;
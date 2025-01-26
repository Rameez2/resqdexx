import React from 'react';
import Banner from '../components/pages/homePage/Banner';
import PetAvailable from '../components/pages/homePage/PetAvailable';
import ExploreVCAnimals from '../components/pages/homePage/ExploreVCAnimals';
import Testimonials from '../components/pages/homePage/Testimonials';
import LearnMore from '../components/pages/homePage/LearnMore';


const Home = () => {
    return (
        <div>
            <Banner/>
            <PetAvailable/>
            <ExploreVCAnimals/>
            <Testimonials/>
            <LearnMore/>
        </div>
    );
}

export default Home;

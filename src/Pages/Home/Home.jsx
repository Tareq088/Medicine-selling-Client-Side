import React from 'react';
import Slider from './Slider';
import HomeCategories from './HomeCategories';
import Discount from './Discount';
import ExtraSection1 from './ExtraSection1';
import ExtraSection2 from './ExtraSection2';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <HomeCategories></HomeCategories>
            <Discount> </Discount>
            <ExtraSection1></ExtraSection1>
            <ExtraSection2></ExtraSection2>
        </div>
    );
};

export default Home;
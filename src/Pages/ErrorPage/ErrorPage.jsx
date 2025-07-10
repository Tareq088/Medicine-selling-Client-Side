import React from 'react';
import { Link } from 'react-router';

import errorImage from "../../assets/errorImage.png"
import Button from './../../Components/Button/Button';

const ErrorPage = () => {
    return (
            <div className='w-11/12 mx-auto p-5 text-center'>
                            {/* <Helmet>
                                <title>FindMate | Error</title>
                            </Helmet> */}
                <div className='flex flex-col justify-center items-center'>
                    <img className='max-w-md' src={errorImage} alt="" />
              
                <p className='mb-5'>Oops! The page You are looking for doesn't exist.</p>
                <Link to='/'><Button label='Go Back Home'></Button></Link>
                </div>
            </div>
    );
};

export default ErrorPage;
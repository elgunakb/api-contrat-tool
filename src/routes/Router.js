import React from 'react';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import Features from '../pages/Features/Features';
import FeaturesDetails from '../pages/FeaturesDetails/FeaturesDetails';

const Router = () => {

    return (
        <Routes>
            <Route path='/' element={<Navigate to='/features' />} />
            <Route path='/features' element={<Features />} />
            <Route path='/features/:id' element={<FeaturesDetails />} />
        </Routes>
    );
};

export default Router;

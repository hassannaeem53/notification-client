import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PreviewPage } from '../pages/PreviewPage';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<PreviewPage />} />
    {/* Define more routes as needed */}
  </Routes>
);

export default AppRouter;


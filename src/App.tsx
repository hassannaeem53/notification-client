import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes';

const App = () => (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);

export default App;

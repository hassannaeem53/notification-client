import { Route, Routes } from 'react-router-dom';
import PreviewPage from '../pages/PreviewPage';
import Wrapper from '../common/HOC/Wrapper';
import DashboardPage from '../pages/DashboardPage';
import Login from '../pages/Login';

const AppRouter = () => (
  <Routes>
    <Route
      path='/notification-preview'
      element={
        <Wrapper>
          <PreviewPage />
        </Wrapper>
      }
    />
    <Route
      path='/'
      element={
        <Wrapper>
          <DashboardPage />
        </Wrapper>
      }
    />
    <Route path='/login' element={<Login />} />
    <Route path='*' element={<h1>Not Found</h1>} />
    {/* Define more routes as needed */}
  </Routes>
);

export default AppRouter;

import { Route, Routes } from 'react-router-dom';
import PreviewPage from '../pages/PreviewPage';
import Wrapper from '../common/HOC/Wrapper';
import DashboardPage from '../pages/DashboardPage';
import Login from '../pages/Login';
import NotFoundPage from '../pages/NotFound';

const AppRouter = () => (
  <Routes>
    <Route
      path='/notification-preview/:eventId'
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
    <Route path='*' element={<NotFoundPage />} />
    {/* Define more routes as needed */}
  </Routes>
);

export default AppRouter;

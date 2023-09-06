import { Route, Routes } from 'react-router-dom';
import PreviewPage from '../pages/PreviewPage';
import Wrapper from '../common/HOC/Wrapper';

const AppRouter = () => (
  <Routes>
    <Route
      path='/'
      element={
        <Wrapper>
          <PreviewPage />
        </Wrapper>
      }
    />
    {/* Define more routes as needed */}
  </Routes>
);

export default AppRouter;

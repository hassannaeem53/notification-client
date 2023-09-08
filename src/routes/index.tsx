import { Route, Routes } from "react-router-dom";
import PreviewPage from "../pages/PreviewPage";
import Wrapper from "../common/Wrapper";
import DashboardPage from "../pages/DashboardPage";

const AppRouter = () => (
  <Routes>
    <Route
      path="/notification-preview"
      element={
        <Wrapper>
          <PreviewPage />
        </Wrapper>
      }
    />
    <Route
      path="/"
      element={
        <Wrapper>
          <DashboardPage />
        </Wrapper>
      }
    />
    {/* Define more routes as needed */}
  </Routes>
);

export default AppRouter;

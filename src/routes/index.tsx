import { Route, Routes } from "react-router-dom";
import PreviewPage from "../pages/PreviewPage";
import Wrapper from "../common/HOC/Wrapper";
import DashboardPage from "../pages/DashboardPage";
import Login from "../pages/Login";
import NotFoundPage from "../pages/NotFound";
import { Auth } from "../components/Auth";

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
    <Route element={<Auth />}>
      <Route
        path="/"
        element={
          <Wrapper>
            <DashboardPage />
          </Wrapper>
        }
      />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<NotFoundPage />} />
    {/* Define more routes as needed */}
  </Routes>
);

export default AppRouter;

import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import MainLayout from "../Layout/MainLayout";
import Products from "../components/Products/Products";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import ActivateAccount from "../components/Registrations/ActivateAccount";
import DashboardLayout from "../Layout/DashboardLayout";
import Profile from "../pages/Profile";
import ResendActivation from "../pages/ResendActivation";
import ResetPasswordConfirm from "../components/PasswordReset/ResetPasswordConfirm";
import AddTuition from "../components/Tuitions/AddTuition";
import MyTuitions from "../components/Tuitions/MyTuitions";
import EditTuition from "../components/Tuitions/EditTuition";
import Tuition from "../components/Tuitions/Tuition";
import TuitionDetails from "../components/Tuitions/TuitionDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/tuitions" element={<Tuition />} />
        <Route path="/tuitions/:id" element={<TuitionDetails />} />
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
        <Route path="/resend-activation" element={<ResendActivation />} />
        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
      </Route>
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="tuitions" element={<MyTuitions />} />
        <Route path="tuitions/new" element={<AddTuition />} />
        <Route path="tuitions/:id/edit" element={<EditTuition />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

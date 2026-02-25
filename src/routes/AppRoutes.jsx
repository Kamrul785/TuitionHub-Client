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
import Applications from "../pages/Applications";
import EnrollmentList from "../components/Enrollments/EnrollmentList";
import EnrollmentDetails from "../components/Enrollments/EnrollmentDetails";
import EnrollmentAssignments from "../components/Enrollments/EnrollmentAssignments";
import EnrollmentTopics from "../components/Enrollments/EnrollmentTopics";
import StudentEnrollmentList from "../components/Enrollments/StudentEnrollmentList";
import StudentEnrollmentDetails from "../components/Enrollments/StudentEnrollmentDetails";
import StudentEnrollmentAssignments from "../components/Enrollments/StudentEnrollmentAssignments";
import StudentEnrollmentTopics from "../components/Enrollments/StudentEnrollmentTopics";
import StudentProgress from "../pages/StudentProgress";
import Reviews from "../pages/Reviews";
import HowItWorks from "../pages/HowItWorks";
import FAQ from "../pages/FAQ";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/tuitions" element={<Tuition />} />
        <Route path="/tuitions/:id" element={<TuitionDetails />} />
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
        <Route path="/resend-activation" element={<ResendActivation />} />
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<ResetPasswordConfirm />}
        />
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
        <Route path="applications" element={<Applications />} />
        <Route path="enrollment" element={<EnrollmentList />} />
        <Route path="enrollment/:id" element={<EnrollmentDetails />} />
        <Route path="enrollment/:id/assignments" element={<EnrollmentAssignments />} />
        <Route path="enrollment/:id/topics" element={<EnrollmentTopics />}  />
        <Route path="my-enrollments" element={<StudentEnrollmentList />} />
        <Route path="my-enrollments/:id"  element={<StudentEnrollmentDetails />}  />
        <Route path="my-enrollments/:id/assignments"  element={<StudentEnrollmentAssignments />}  />
        <Route path="my-enrollments/:id/topics" element={<StudentEnrollmentTopics />}  />
        <Route path="progress" element={<StudentProgress />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

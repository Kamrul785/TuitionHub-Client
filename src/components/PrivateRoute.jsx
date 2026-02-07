import useAuthContext from "../hooks/useAuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loadingUser } = useAuthContext();

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner"></span>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

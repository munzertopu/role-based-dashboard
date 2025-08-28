// @ts-nocheck
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, role: userRole } = useSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to={`/login/${role}`} replace />;
  }

  if (userRole !== role) {
    return <Navigate to={`/login/${role}`} replace />;
  }

  return children;
};

export default ProtectedRoute;

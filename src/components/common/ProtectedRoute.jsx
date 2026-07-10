import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useRole } from "../../hooks/useRole";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner"; 
const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, loading } = useAuth();
  const { role } = useRole();
 
  if (loading) {
    return <LoadingSpinner />;
  }
 
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
 
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/not-found" replace />;
  }
 
  return children;
};
 
export default ProtectedRoute;
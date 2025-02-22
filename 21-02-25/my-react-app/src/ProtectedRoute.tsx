import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
};

const ProtectedRoute = ({ isAuthenticated }: ProtectedRouteProps) => {
  return <>{isAuthenticated ? <Outlet /> : <Navigate to="/about" />}</>;
};

export default ProtectedRoute;

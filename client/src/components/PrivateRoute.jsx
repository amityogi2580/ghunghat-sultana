import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Check if the admin token exists in local storage
  const token = localStorage.getItem("adminToken");

  // If token exists, render the child routes (Dashboard, etc.)
  // If no token, redirect to the login page
  return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;

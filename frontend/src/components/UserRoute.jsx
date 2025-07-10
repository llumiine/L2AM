import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user || user.role !== 0) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserRoute;
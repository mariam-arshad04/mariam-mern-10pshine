// import { Navigate } from "react-router-dom";

// function PrivateRoute({ children }) {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/login" />;
// }

// export default PrivateRoute;
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;

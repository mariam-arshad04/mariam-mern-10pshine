import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <Link to="/dashboard">Notes App</Link>

      <span style={{ float: "right" }}>
        {token ? (
          <>
            <Link to="/profile" style={{ marginRight: "10px" }}>
              Account
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: "10px" }}>
              Login
            </Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </span>
    </nav>
  );
}

export default Navbar;

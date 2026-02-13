import { Link, useNavigate } from "react-router-dom";
import "../../styles/style.css";
import nav_logo from "../../assets/nav_logo.png"; 

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ paddingLeft: "40px", paddingBottom:"5px" }}>
      {/* <img src={nav_logo} alt="Edit" style={{height:"60px", width:"70px"}}></img> */}
      <Link to="/dashboard"><img src={nav_logo} alt="Edit" style={{height:"60px", width:"70px"}}></img></Link>

      <span style={{ float: "right", paddingTop:"20px", paddingRight:"20px"}}>
        {token ? (
          <>
            <Link to="/profile" style={{ marginRight: "20px" }} className="nav-item">
              ACCOUNT
            </Link>
            <button onClick={handleLogout} className="logout-btn" style={{width:"100px"}}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: "30px" }} className="nav-item">
              LOGIN
            </Link>
            <Link to="/signup" style={{ marginRight: "20px" }} className="nav-item">SIGNUP</Link>
          </>
        )}
      </span>
    </nav>
  );
}

export default Navbar;

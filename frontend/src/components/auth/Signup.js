import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";
import login from "../../assets/login.png"; 
import account_logo from "../../assets/account_logo.png"; 

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ correct way

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", { name, email, password });

      toast.success(res.data?.message || "Registered successfully. Please login");

      // small delay so toast is visible
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-content"> 
      <div  className="round-design">
        <div className="inside-round">
          <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <img src={account_logo} alt="Edit" style={{height:"110px", width:"110px"}}></img>
            <h1 style={{color:"#273623"}}>CREATE ACCOUNT</h1>
            <h2 style={{color:"white"}}>SignUp to start taking notes</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="auth-input-box"
              required
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="auth-input-box"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="auth-input-box"
              required
            />

            <button type="submit" style={{display:"flex", justifyContent:"center"}} className="auth-btn">
              Signup
            </button>

            <p style={{ marginTop: "10px" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "blue" }}>
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>

      <div className="login-img-container">
        <img src={login} alt="Edit" style={{height:"500px", width:"700px"}}></img>
      </div>
    </div>
    
  );
}

export default Signup;

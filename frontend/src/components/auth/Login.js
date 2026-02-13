import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";
import login from "../../assets/login.png"; 
import account_logo from "../../assets/account_logo.png"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔐 If already logged in, redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // ✅ VERY IMPORTANT (logout/navbar depends on this)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", email); // ✅ ADD THIS for user account page
      localStorage.setItem("userName", res.data.name); // 👈 THIS

      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-content">
      <div  className="round-design">
        <div className="inside-round">
          <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <img src={account_logo} alt="Edit" style={{height:"110px", width:"110px"}}></img>
            <h1 style={{color:"#273623"}}>WELCOME BACK !</h1>
            <h2 style={{color:"white"}}>Login to continue taking notes</h2>
          </div>
          {/* <h2 style={{color:"white"}}>Login to continue taking notes</h2> */}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input-box"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input-box"
            />

            <div style={{display:"flex", justifyContent:"center"}}>
              <button
                type="submit"
                disabled={loading}
                className="auth-btn"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <p style={{ marginTop: "10px" }}>
            Don’t have an account?{" "}
            <Link to="/signup" style={{ color: "blue" }}>
              Sign up
            </Link>
          </p>

          <p>
            <Link to="/forgot-password" style={{ color: "blue" }}>
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>

      <div className="login-img-container">
        <img src={login} alt="Edit" style={{height:"500px", width:"700px"}}></img>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../services/api";
import forgot from "../../assets/forgot.png"; 
import account_logo from "../../assets/account_logo.png"; 

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/forgot-password", { email });
      toast.success(res.data.message || "OTP sent to your email!");
      navigate("/reset-password"); // <-- redirect
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
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
            <h1 style={{color:"#273623"}}>FORGOT PASSWORD</h1>
            <h2 style={{color:"white"}}>Enter Your Email and Click on Send OTP to Proceed</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input-box"
              required
            />
            <button type="submit" disabled={loading} className="auth-btn">
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>

      <div className="login-img-container">
        <img src={forgot} alt="Edit" style={{height:"500px", width:"700px"}}></img>
      </div>
    </div>
  );
}

export default ForgotPassword;

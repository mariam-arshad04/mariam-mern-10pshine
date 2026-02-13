// import { useState } from "react";
// import { toast } from "react-toastify";
// import API from "../../services/api";

// function ResetPassword() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !otp || !password || !confirmPassword) {
//       toast.error("All fields are required");
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await API.post("/auth/reset-password", { email, otp, password });
//       toast.success(res.data.message || "Password reset successful!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to reset password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
//         />
//         <input
//           type="text"
//           placeholder="OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           required
//           style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
//         />
//         <input
//           type="password"
//           placeholder="New password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
//         />
//         <input
//           type="password"
//           placeholder="Confirm password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//           style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
//         />
//         <button type="submit" disabled={loading} style={{ width: "100%", padding: "8px" }}>
//           {loading ? "Resetting..." : "Reset Password"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ResetPassword;

import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import API from "../../services/api";
import reset from "../../assets/reset.png"; 
import account_logo from "../../assets/account_logo.png"; 

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/reset-password", { email, otp, password });
      toast.success(res.data.message || "Password reset successful!");

      // ✅ Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-content">
      <div  className="round-design" style={{height:"650px"}}>
        <div className="inside-round">
          <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <img src={account_logo} alt="Edit" style={{height:"110px", width:"110px"}}></img>
                <h1 style={{color:"#273623"}}>RESET PASSWORD</h1>
                <h2 style={{color:"white"}}>Fill the Fields Below to Proceed</h2>
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
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="auth-input-box"
              required
            />
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input-box"
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="auth-input-box"
              required
            />
            <button type="submit" disabled={loading} className="auth-btn">
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>

      <div className="login-img-container">
        <img src={reset} alt="Edit" style={{height:"500px", width:"700px"}}></img>
      </div>
    </div>
  );
}

export default ResetPassword;

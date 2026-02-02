import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();

  const email = localStorage.getItem("userEmail"); // optional

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>User Profile</h2>

      <p><strong>Email:</strong> {email || "Not available"}</p>

      <button onClick={handleLogout} style={{ width: "100%", padding: "8px" }}>
        Logout
      </button>
    </div>
  );
}

export default UserProfile;

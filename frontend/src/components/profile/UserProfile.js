// import { useNavigate } from "react-router-dom";

// function UserProfile() {
//   const navigate = useNavigate();

//   const email = localStorage.getItem("userEmail"); // optional
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
//       <h2>User Profile</h2>

//       <p><strong>Email:</strong> {email || "Not available"}</p>

//       <button onClick={handleLogout} style={{ width: "100%", padding: "8px" }}>
//         Logout
//       </button>
//     </div>
//   );
// }

// export default UserProfile;
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/style.css";
import profile_page from "../../assets/profile_page.png"; 

function UserProfile() {
  const navigate = useNavigate();

  const email = localStorage.getItem("userEmail");
  const username = localStorage.getItem("userName");

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem(`profileImage_${email}`)
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem(`profileImage_${email}`, reader.result);
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile-content">
      
      <div className="login-img-container">
        <img src={profile_page} alt="Edit" style={{height:"500px", width:"700px"}}></img>
      </div>

      <div  className="profile-design">
        <div className="profile-round">
          <div>
            <h1 style={{ textAlign: "center", color:"#4b6f45" }}>
              {username ? `${username}'s NoteHive Profile` : "My NoteHive Profile"}
            </h1>
          </div>

          {/* Profile Image */}
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <img
              src={profileImage || "https://via.placeholder.com/120"}
              alt="Profile"
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            {/* <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ marginTop: "10px" }}
            /> */}
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              id="profileUpload"
              onChange={handleImageUpload}
              style={{ display:"none" }}
            />

            {/* Custom upload button */}
            <label
              htmlFor="profileUpload"
              className="profile-upload-btn"
            >
              Change Profile Picture
            </label>
          </div>
          
          <div>
            <h3 style={{color:"black"}}>Email: <span style={{color:"#7b9e61"}}>{email || "Not available"}</span></h3>
          </div>
          
          <div>
            <button
              onClick={handleLogout}
              className="profile-logout-btn"
            >
              Logout
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

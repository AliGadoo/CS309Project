import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import Signup from "./Signup";

const Profile = ({ currentUser, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleDeleteAccount = () => {
    alert("Account deleted successfully!");
    setUser(null);
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div>
      {currentUser ? (
        <div className="ground">
          <div className="profile-container">
            <div className="profile-header">
              <img
                className="profile-image"
                src={currentUser.user.image ? currentUser.user.image : "./default-profile-img.jpg"}
                alt="Profile"
                onError={(e) => {
                  e.target.src = "./default-profile-img.jpg";
                }}
              />
              <div>
                <div className="profile-name">{currentUser.user.name}</div>
                <div className="profile-email">{currentUser.user.email}</div>
              </div>
            </div>

            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" defaultValue={currentUser.user.name} />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input type="text" defaultValue={currentUser.user.image} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="text" defaultValue={currentUser.user.phone} />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" defaultValue={currentUser.user.address} />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="Enter new password" />
              </div>
              <button type="submit" className="btn">
                Update Profile
              </button>
            </form>

            <div className="action-buttons">
              <button onClick={handleLogout} className="btn btn-logout">
                Logout
              </button>
              <button onClick={handleDeleteAccount} className="btn btn-delete">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Signup setUser={setUser} />
      )}
    </div>
  );
};

export default Profile;

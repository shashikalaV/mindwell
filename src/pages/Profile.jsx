import { useState, useEffect } from "react";
import "../Profile.css";

export default function Profile() {

  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const [moodCount, setMoodCount] = useState(0);
  const [journalCount, setJournalCount] = useState(0);
  const [breathingCount, setBreathingCount] = useState(0);

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};

    setUser(storedUser);
    setUsername(storedUser.username || "");
    setBio(storedUser.bio || "");
    setImage(storedUser.image || "");

    const moods = JSON.parse(localStorage.getItem("moods")) || [];
    const journals = JSON.parse(localStorage.getItem("journals")) || [];
    const breathing = JSON.parse(localStorage.getItem("breathingSessions")) || [];

    setMoodCount(moods.length);
    setJournalCount(journals.length);
    setBreathingCount(breathing.length);

  }, []);

  const handleSave = () => {

    const updatedUser = {
      ...user,
      username,
      bio,
      image
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setUser(updatedUser);
    setEditMode(false);

    alert("Profile updated successfully!");
  };

  const logout = () => {

  // remove logged in user
  localStorage.removeItem("mindwell_user");

  // redirect to login page using HashRouter path
  window.location.href = "#/login";
};

  const deleteAccount = () => {

    if (window.confirm("Delete your account permanently?")) {

      localStorage.removeItem("user");
      localStorage.removeItem("moods");
      localStorage.removeItem("journals");
      localStorage.removeItem("breathingSessions");

      window.location.href = "/signup";
    }
  };

  return (

    <div className="profile-container">

      <div className="profile-card">

        {/* LEFT SIDE */}

        <div className="profile-left">

          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {

              const file = e.target.files[0];

              if (file) {

                const reader = new FileReader();

                reader.onloadend = () => {

                  const uploadedImage = reader.result;

                  setImage(uploadedImage);

                  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

                  const updatedUser = {
                    ...storedUser,
                    image: uploadedImage
                  };

                  localStorage.setItem("user", JSON.stringify(updatedUser));

                  setUser(updatedUser);
                };

                reader.readAsDataURL(file);
              }
            }}
          />

          <img
            src={image || "https://via.placeholder.com/150"}
            alt="profile"
            className="profile-img"
            onClick={() => document.getElementById("profileUpload").click()}
            style={{ cursor: "pointer" }}
          />

          <h2>{user.username}</h2>
          <p>{user.bio}</p>

          {!editMode && (
            <button
              className="edit-btn"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}

        </div>

        {/* RIGHT SIDE */}

        <div className="profile-right">

          {editMode && (

            <>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <label>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />

              <p style={{color:"#777",fontSize:"14px"}}>
                🌱 Your personal space for mental wellness
              </p>

              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>

            </>
          )}

          {/* STATS */}

          <div className="stats">

            <div className="stat">Mood Entries: {moodCount}</div>
            <div className="stat">Journal Entries: {journalCount}</div>
            <div className="stat">Breathing Sessions: {breathingCount}</div>
            <div className="stat">
              Mindfulness Activity: {moodCount + journalCount + breathingCount}
            </div>

          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

          <button
            className="delete-btn"
            onClick={deleteAccount}
          >
            Delete Account
          </button>

        </div>

      </div>

    </div>
  );
}
import React, { useState, useContext, useEffect } from 'react';
import './Profile.css';
import { AuthContext } from '../auth/AuthContext';
import { UpdateProfile } from '/src/components/user/UpdateProfile.jsx';

const Profile = () => {
  const { userInfo } = useContext(AuthContext);
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem("profilePhoto") || userInfo.profilePhoto);

  useEffect(() => {
    // Update localStorage whenever profilePhoto state changes
    if (profilePhoto) {
      localStorage.setItem("profilePhoto", profilePhoto);
    }
  }, [profilePhoto]);

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={profilePhoto} alt="Profile" className="profile-photo" />
        <label htmlFor="profilePhotoInput" className="upload-btn">Change Photo</label>
        <input
          type="file"
          id="profilePhotoInput"
          style={{ display: 'none' }}
          onChange={handleProfilePhotoChange}
        />
      </div>
      <h2>{userInfo.fullName}</h2>
      <p>{userInfo.email}</p>

      <UpdateProfile />
    </div>
  );
};

export default Profile;

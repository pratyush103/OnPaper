import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './UpdateProfile.css'; // Make sure to create this CSS file and add styles as described below
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // This imports the default CSS


const updateproileuser = "https://onpaper-auth.wonderfultree-e5f4d080.centralindia.azurecontainerapps.io/User/UpdateUserProfile";
const profilepic = "gs://onpaper-auth.appspot.com/User-ProfileIcons";

export const UpdateProfile = () => {
  const { authToken, userInfo, setUserInfo } = useContext(AuthContext);
  const [email, setEmail] = useState(userInfo.email);
  const [fullName, setFullName] = useState(userInfo.fullName);
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(userInfo.profilePicture);
  const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber);

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const storageRef = `User-ProfileIcons/${file.name}`;
      const metadata = { contentType: file.type };

      try {
        const response = await axios.post(
          `https://firebasestorage.googleapis.com/v0/b/onpaper-auth.appspot.com/o?name=${encodeURIComponent(storageRef)}`,
          file,
          {
            headers: {
              'Content-Type': file.type,
              'Authorization': `Bearer ${authToken}`,
            },
            params: metadata,
          }
        );

        const downloadURL = `https://firebasestorage.googleapis.com/v0/b/onpaper-auth.appspot.com/o/${encodeURIComponent(storageRef)}?alt=media&token=${response.data.downloadTokens}`;
        setProfilePicture(downloadURL);
        await axios.post(updateproileuser, { idToken: authToken, profilePicture: downloadURL });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedFields = { idToken: authToken };
  
    if (email && email !== userInfo.email) updatedFields.email = email;
    if (fullName && fullName !== userInfo.fullName) updatedFields.fullName = fullName;
    if (password) updatedFields.password = password;
    if (profilePicture && profilePicture !== userInfo.profilePicture) updatedFields.profilePicture = profilePicture;
    if (phoneNumber && phoneNumber !== userInfo.phoneNumber) updatedFields.phoneNumber = phoneNumber;
  
    try {
      const response = await axios.post(updateproileuser, updatedFields);
      setUserInfo(response.data);
      
      // Show SweetAlert2 toast on success
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Profile has been updated',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
  
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Full Name:</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Profile Picture:</label>
        <input type="file" onChange={handleProfilePictureChange} />
        {profilePicture && <img src={profilePicture} alt="Profile" className="profile-preview" />}
      </div>
      <div className="form-group">
        <label>Phone Number:</label>
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <button type="submit" className="update-button">Update Profile</button>
    </form>
  );
};

export default UpdateProfile;

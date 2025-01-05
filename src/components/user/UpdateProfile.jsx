import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './UpdateProfile.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const UPDATE_PROFILE_URL = "https://onpaper-auth.wonderfultree-e5f4d080.centralindia.azurecontainerapps.io/User/UpdateUserProfile";

export const UpdateProfile = () => {
  const { authToken, userInfo, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: userInfo?.email || '',
    fullName: userInfo?.displayName || '',
    password: '',
    profilePicture: userInfo?.profilePicture || '',
    phoneNumber: userInfo?.phoneNumber || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const requestBody = {
      idToken: authToken?.idToken,
      ...formData
    };

    // Remove empty fields
    Object.keys(requestBody).forEach(key => 
      !requestBody[key] && delete requestBody[key]
    );

    try {
      const response = await axios.post(UPDATE_PROFILE_URL, requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      updateUser(response.data);
      
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Profile updated successfully',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error('Update profile error:', error.response?.data || error.message);
      
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.error?.message || 'Failed to update profile',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <button 
        type="submit" 
        className="update-button"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
};

export default UpdateProfile;
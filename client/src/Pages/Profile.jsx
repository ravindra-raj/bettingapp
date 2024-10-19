import React, { useState } from 'react';
import './Profile.css';
import { FaGift, FaUserFriends, FaDollarSign, FaTrophy, FaCamera, FaHistory, FaChartLine } from 'react-icons/fa';

const Profile = () => {
  const [profileImage, setProfileImage] = useState('https://example.com/default-profile.jpg'); // Default profile image
  const [username, setUsername] = useState('John Doe');
  const [password, setPassword] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        // Handle file upload to server if necessary
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission to update username and password
    console.log('Updated username:', username);
    console.log('Updated password:', password);
  };

  const user = {
    referrals: 25,
    bonuses: '$500',
    winnings: '$1500',
    currentBets: '3 Active Bets',
    bettingHistory: '10 Past Bets',
    bettingStats: 'Win Rate: 60%',
  };

  return (
    <div className="profile-background">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image-container">
            <img src={profileImage} alt="Profile" className="profile-image" />
            <label htmlFor="file-upload" className="profile-image-change">
              <FaCamera />
            </label>
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
          <h1>{username}'s Profile</h1>
        </div>
        <form className="profile-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
          </div>
         
        </form>
        <div className="profile-details">
          <div className="profile-card">
            <FaUserFriends className="profile-icon" />
            <h3 className="profile-title">Referrals</h3>
            <p className="profile-content">{user.referrals} Referrals</p>
          </div>
          <div className="profile-card">
            <FaGift className="profile-icon" />
            <h3 className="profile-title">Bonuses</h3>
            <p className="profile-content">{user.bonuses}</p>
          </div>
          <div className="profile-card">
            <FaDollarSign className="profile-icon" />
            <h3 className="profile-title">Winnings</h3>
            <p className="profile-content">{user.winnings}</p>
          </div>
          <div className="profile-card">
            <FaTrophy className="profile-icon" />
            <h3 className="profile-title">Achievements</h3>
            <p className="profile-content">No Achievements Yet</p>
          </div>
          <div className="profile-card">
            <FaHistory className="profile-icon" />
            <h3 className="profile-title">Current Bets</h3>
            <p className="profile-content">{user.currentBets}</p>
          </div>
          <div className="profile-card">
            <FaHistory className="profile-icon" />
            <h3 className="profile-title">Betting History</h3>
            <p className="profile-content">{user.bettingHistory}</p>
          </div>
          <div className="profile-card">
            <FaChartLine className="profile-icon" />
            <h3 className="profile-title">Betting Stats</h3>
            <p className="profile-content">{user.bettingStats}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

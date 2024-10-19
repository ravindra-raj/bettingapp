

// import React, { useState, useEffect } from 'react';
// import './ProfileForm.css';
// import { RiLogoutCircleLine } from "react-icons/ri";

// const ProfileForm = ({ onClose }) => {
//   const [profile, setProfile] = useState({
//     username: '',
//     email: '',
//     primary_name: '',
//     secondary_name: '',
//     managing_admin: '',
//     contact_number: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const user_id = localStorage.getItem('user_id');
//     if (user_id) {
//       // Fetch profile data from the API using user ID
//       fetch(`http://localhost:5000/api/profile/${user_id}`)
//         .then(response => response.json())
//         .then(data => {
//           if (data.length > 0) {
//             setProfile(data[0]);
//           }
//         })
//         .catch(error => {
//           console.error('Error fetching profile data:', error);
//         });
//     }
//   }, []);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile({
//       ...profile,
//       [name]: value
//     });
//   };

//   const handleSaveClick = () => {
//     const user_id = localStorage.getItem('user_id');
//     if (user_id) {
//       // Handle form submission logic here
//       fetch(`http://localhost:5000/api/profile/${user_id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(profile),
//       })
//         .then(response => response.text())
//         .then(data => {
//           console.log('Profile updated:', data);
//           setIsEditing(false); // Set back to non-editing mode
//           // Optionally re-fetch the profile data to update the state
//           fetch(`http://localhost:5000/api/profile/${user_id}`)
//             .then(response => response.json())
//             .then(data => {
//               if (data.length > 0) {
//                 setProfile(data[0]);
//               }
//             })
//             .catch(error => {
//               console.error('Error fetching updated profile data:', error);
//             });
//           alert("Update successfully");
//         })
//         .catch(error => {
//           console.error('Error updating profile:', error);
//         });
//     }
//   };

//   const handleLogout = () => {
//     const user_id = localStorage.getItem('user_id');
//     const loginTime = localStorage.getItem('login_time');
//     const currentTime = new Date().getTime();
//     const sessionDuration = loginTime ? (currentTime - parseInt(loginTime)) / 1000 : null;

//     // Handle logout logic here
//     fetch('http://localhost:5000/logout-history', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         userId: user_id,
//         logoutTime: currentTime,
//         sessionDuration: sessionDuration
//       })
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Logout history recorded:', data);
//         localStorage.removeItem('user_id');
//         localStorage.removeItem('login_time');
//         alert(`Logged out successfully. Session duration: ${sessionDuration} seconds`);
//         window.location.href = '/'; // Redirect to login page or perform any other necessary action
//       })
//       .catch(error => {
//         console.error('Error recording logout history:', error);
//       });
//   };

//   return (
//     <div className="profile-form-container">
//       <div className="profile-form">
//         <h2>Profile Details</h2>
//         {isEditing ? (
//           <>
//             <div className="form-group">
//               <label htmlFor="username">Username:</label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={profile.username}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="email">Email:</label>
//               <input
//                 type="text"
//                 id="email"
//                 name="email"
//                 value={profile.email}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="primary_name">Primary Name:</label>
//               <input
//                 type="text"
//                 id="primary_name"
//                 name="primary_name"
//                 value={profile.primary_name}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="secondary_name">Secondary Name:</label>
//               <input
//                 type="text"
//                 id="secondary_name"
//                 name="secondary_name"
//                 value={profile.secondary_name}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="managing_admin">Managing Admin:</label>
//               <input
//                 type="text"
//                 id="managing_admin"
//                 name="managing_admin"
//                 value={profile.managing_admin}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="contact_number">Contact Number:</label>
//               <input
//                 type="text"
//                 id="contact_number"
//                 name="contact_number"
//                 value={profile.contact_number}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <button type="button" className="btn-submit" onClick={handleSaveClick}>Save</button>
//           </>
//         ) : (
//           <>
//             <div className="form-group">
//               <p><strong>Username:</strong> {profile.username}</p>
//             </div>
//             <div className="form-group">
//               <p><strong>Email:</strong> {profile.email}</p>
//             </div>
//             <div className="form-group">
//               <p><strong>Primary Name:</strong> {profile.primary_name}</p>
//             </div>
//             <div className="form-group">
//               <p><strong>Secondary Name:</strong> {profile.secondary_name}</p>
//             </div>
//             <div className="form-group">
//               <p><strong>Managing Admin:</strong> {profile.managing_admin}</p>
//             </div>
//             <div className="form-group">
//               <p><strong>Contact Number:</strong> {profile.contact_number}</p>
//             </div>
//             <button type="button" className="btn-edit" onClick={handleEditClick}>Update</button>
//           </>
//         )}
//         <button type="button" className="btn-logout" onClick={handleLogout}>Logout</button>
//       </div>
//     </div>
//   );
// };

// export default ProfileForm;


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckAlt, faUniversity, faExchangeAlt, faCreditCard, faArrowDown, faHistory, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './ProfileForm.css';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

  const navigate = useNavigate();

  const handledeposit = () => {
    navigate('/Transcation');
  };
  const handleTranscation = () => {
    navigate('/transcationProfile');
  };
  const handleWithdraw = () => {
    navigate('/withdraw'); 
  };

  return (
    <div className="dashboard">
      <div className="menu">
        <div className="menu-item" onClick={handledeposit}>
          <FontAwesomeIcon icon={faMoneyCheckAlt} />
          <span>Deposit</span>
        </div>
        <div className="menu-item">
          <FontAwesomeIcon icon={faUniversity} />
          <span>Local Bank Transfer Deposit</span>
        </div>
        <div className="menu-item" onClick={handleTranscation} >
          <FontAwesomeIcon icon={faExchangeAlt} />
          <span>Transfer</span>
        </div>
        <div className="menu-item">
          <FontAwesomeIcon icon={faCreditCard} />
          <span>Payment Option</span>
        </div>
        <div className="menu-item" onClick={handleWithdraw}>
          <FontAwesomeIcon icon={faArrowDown} />
          <span>Withdraw</span>
        </div>
        <div className="menu-item">
          <FontAwesomeIcon icon={faHistory} />
          <span>History</span>
        </div>
        <div className="menu-item new-item">
          <FontAwesomeIcon icon={faInfoCircle} />
          <span>Bank Details</span>
        </div>
      </div>

      <div className="credit-history">
        <h2>Recent Credit History</h2>
        <div className="credit-item">
          <span>Last deposit</span>
          <span>1000/-</span>
        </div>
        <div className="credit-item">
          <span>Present Balance</span>
          <span>500/-</span>
        </div>
        <div className="credit-item available-credit">
          <span>Available credit</span>
          <span>500/-</span>
        </div>
      </div>

      <div className="get-it">
        <h2>Get it</h2>
        <div className="logo"> 
          <img src="./image2.jpg" alt="betting Logo" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

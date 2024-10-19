// import React from 'react';
// import { FaMoneyBillWave, FaCreditCard, FaGift, FaCoins, FaUser, FaWallet, FaBell, FaCog, FaHandsHelping, FaInfoCircle, FaChevronRight } from 'react-icons/fa';
// import './User.css';
// import { useNavigate } from 'react-router-dom';
 
// function User() {
//   const userId = localStorage.getItem('userId');
//   const navigate = useNavigate();
 
//   const handlenotification = () => {
//     navigate('/Notification'); // Navigate to the bet page
//   };
//   const Transaction = () => {
//     navigate('/Transcation'); // Navigate to the bet page
//   };
//   const handleabout = () => {
//     navigate('/About-us'); // Navigate to the bet page
//   };
//   return (
//     <div>
//     <div className="user-container">
//       {userId ? (
//         <div>
//           <div className="user-avatar">
//             {userId.charAt(0).toUpperCase()} {/* Avatar Icon */}
//           </div>
//           <span>Cricbet player</span>
//           <h5 style={{color:'black'}}>ID: {userId}</h5>
         
//           <div className="user-options">
//             <div className="option" id="deposit">
//               <FaMoneyBillWave className="option-icon" />
//               <span>Deposit</span>
//             </div>
//             <div className="option" id="withdraw">
//               <FaCreditCard className="option-icon" />
//               <span>Withdraw</span>
//             </div>
//             <div className="option" id="cashback">
//               <FaGift className="option-icon" />
//               <span>Cashback</span>
//             </div>
//             <div className="option" id="rewards">
//               <FaCoins className="option-icon" />
//               <span>Rewards</span>
//             </div>
//           </div>
//         </div>
//       ) : (<div>
//         <h5 style={{color:'black'}}>No User ID found.</h5>
       
//         </div>
//       )}
     
//     </div>
//     <div className="user-details">
//         <div className="detail-row">
            
//           <FaUser className="detail-icon" />
//           <span>Profile</span>
//           <FaChevronRight className="chevron-icon" />
//         </div>
//         <div className="detail-row" onClick={Transaction}>
//           <FaCreditCard className="detail-icon" />
//           <span>Transactions</span>
//           <FaChevronRight className="chevron-icon" />
//         </div>
//         <div className="detail-row">
//           <FaWallet className="detail-icon" />
//           <span>Wallet</span>
//           <FaChevronRight className="chevron-icon" />
//         </div>
//         <div className="detail-row" onClick={handlenotification}>
//           <FaBell className="detail-icon" />
//           <span>Notifications</span>
//           <FaChevronRight className="chevron-icon" />
//         </div>
//         <div className="detail-row">
//           <FaCog className="detail-icon" />
//           <span>Settings</span>
//           <FaChevronRight className="chevron-icon" />
//         </div>
//         <div className="detail-row">
//           <FaHandsHelping className="detail-icon" />
//           <span>Affiliate</span>
//           <FaChevronRight className="chevron-icon" />
//         </div>
//         <div className="detail-row" onClick={handleabout}>
//           <FaInfoCircle className="detail-icon" />
//           <span>About Us</span>
//           <FaChevronRight className="chevron-icon" />
//         </div>
//       </div>
//     </div>
//   );
// }
 
// export default User;
 
// import React, { useState, useEffect } from 'react';
// import { FaMoneyBillWave, FaCreditCard, FaGift, FaCoins, FaUser, FaWallet, FaBell, FaCog, FaHandsHelping, FaInfoCircle, FaChevronRight } from 'react-icons/fa';
// import './User.css';
// import { useNavigate } from 'react-router-dom';
// import { FaUserCircle } from 'react-icons/fa';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function User() {

//   const [userData, setUserData] = useState(null);
//   const { username } = useParams();

//   useEffect(() => {
//     console.log("Fetched username:", username);  // Log username for debugging
//     const fetchAdminUserDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/userdetails`);
//         setUserData(response.data);
//       } catch (error) {
//         console.error('Error fetching admin user details:', error);
//       }
//     };
  
//     fetchAdminUserDetails();
//   }, [username]);
  
//   const navigate = useNavigate();

//   const handlenotification = () => {
//     navigate('/notification');
//   };

//   const handledeposit = () => {
//     navigate('/Transcation');
//   };

//   const handleprofile = () => {
//     navigate('/profile');
//   };

//   const handleabout = () => {
//     navigate('/about'); 
//   };

//   const handletransaction = () => {
//     navigate('/TranscationProfile'); 
//   };

//   const handleWithdraw = () => {
//     navigate('/withdraw'); 
//   };

//   return (
//     <div className='space'>
//     <div className="user-container">
      
//         <div>
//           <div className="user-avatar">
//           <FaUserCircle className="avatar-icon" size={50} />
//           </div>
//           <span>Cricbet player</span>
//           {userData && (
//             <div>
//               <p>{userData.username}</p> 
//             </div>
//           )}
//           <div className="user-options">
//             <div className="option" id="deposit" onClick={handledeposit}>
//               <FaMoneyBillWave className="option-icon" />
//               <span>Deposit</span>
//             </div>
//             <div className="option" id="withdraw" onClick={handleWithdraw}>
//               <FaCreditCard className="option-icon" />
//               <span>Withdraw</span>
//             </div>
//             <div className="option" id="cashback">
//               <FaGift className="option-icon" />
//               <span>Cashback</span>
//             </div>
//             <div className="option" id="rewards">
//               <FaCoins className="option-icon" />
//               <span>Rewards</span>
//             </div>
//           </div>
//         </div>
     
//     </div>
//     <div className="user-details">
//         <div className="detail-row" onClick={handleprofile}>
//           <FaUser className="detail-icon" />
//           <span>Profile</span>
//           <FaChevronRight className="chevron-icon" />
//         </div>
//         <div className="detail-row" onClick={handletransaction}>
//           <FaCreditCard className="detail-icon" />
//           <span>Transactions</span>
//           <FaChevronRight className="chevron-icon" />
//         </div>
//         <div className="detail-row">
//           <FaWallet className="detail-icon" />
//           <span>Wallet</span>
//           <FaChevronRight className="chevron-icon" />
//         </div>
//         <div className="detail-row" onClick={handlenotification}>
//           <FaBell className="detail-icon" />
//           <span>Notifications</span>
//           <FaChevronRight className="chevron-icon" />
//         </div>
//         <div className="detail-row">
//           <FaCog className="detail-icon" />
//           <span>Settings</span>
//           <FaChevronRight className="chevron-icon" />
//         </div>
//         <div className="detail-row">
//           <FaHandsHelping className="detail-icon" />
//           <span>Affiliate</span>
//           <FaChevronRight className="chevron-icon" />
//         </div>
//         <div className="detail-row" onClick={handleabout}>
//           <FaInfoCircle className="detail-icon" />
//           <span>About Us</span>
//           <FaChevronRight className="chevron-icon" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default User;
import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaCreditCard, FaGift, FaCoins, FaUser, FaWallet, FaBell, FaCog, FaHandsHelping, FaInfoCircle, FaChevronRight } from 'react-icons/fa';
import './User.css';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

function User() {
  const [userData, setUserData] = useState(null); // State for user details
  const [depositAmount, setDepositAmount] = useState({ deposit_amount: 0 }); // State for deposit amount
  const userId = localStorage.getItem('user_id'); // Get logged-in user's ID from local storage

  // Fetch user details and deposit amount on component mount
  useEffect(() => {
    if (!userId) return; // If there's no userId, exit

    // Function to fetch user details based on userId
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/userdetails/${userId}`);
        setUserData(response.data); // Set fetched user details
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    // Function to fetch deposit amount based on userId
    const fetchDepositAmount = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/deposit1/${userId}`);
        setDepositAmount(response.data[0]); // If the response is an array
      } catch (error) {
        console.error('Error fetching deposit details:', error);
      }
    };
    

    fetchUserDetails();
    fetchDepositAmount();
  }, [userId]); // Dependencies include userId

  const navigate = useNavigate();

  // Handlers for navigation to different pages
  const handlenotification = () => {
    navigate('/notification');
  };

  const handledeposit = () => {
    navigate('/Transcation');
  };

  const handleprofile = () => {
    navigate('/profile');
  };

  const handleabout = () => {
    navigate('/about');
  };

  const handletransaction = () => {
    navigate('/TranscationProfile');
  };

  const handleWithdraw = () => {
    navigate('/withdraw');
  };
  const handleLogout = () => {
    localStorage.clear();  // Clear localStorage on logout
    window.location.href = '/login';  // Redirect to login page
  };
  return (
    <div className='space'>
      <div className="user-container">
        <div>
          <div className="user-avatar">
            <FaUserCircle className="avatar-icon" size={50} />
          </div>
          <span>Cricbet Player</span>
          {userData && (
            <div>
              <p>{userData.username}</p> {/* Display username */}
            </div>
          )}
         {depositAmount && (
  <div>
    <h5 style={{ color: 'black' }}>
      Deposit Amount: ${depositAmount.deposit_amount}
    </h5>
  </div>
)}

          <div className="user-options">
            <div className="option" id="deposit" onClick={handledeposit}>
              <FaMoneyBillWave className="option-icon" />
              <span>Deposit</span>
            </div>
            <div className="option" id="withdraw" onClick={handleWithdraw}>
              <FaCreditCard className="option-icon" />
              <span>Withdraw</span>
            </div>
            <div className="option" id="cashback">
              <FaGift className="option-icon" />
              <span>Cashback</span>
            </div>
            <div className="option" id="rewards">
              <FaCoins className="option-icon" />
              <span>Rewards</span>
            </div>
          </div>
        </div>
      </div>
      <div className="user-details">
        <div className="detail-row" onClick={handleprofile}>
          <FaUser className="detail-icon" />
          <span>Profile</span>
          <FaChevronRight className="chevron-icon" />
        </div>
        <div className="detail-row" onClick={handletransaction}>
          <FaCreditCard className="detail-icon" />
          <span>Transactions</span>
          <FaChevronRight className="chevron-icon" />
        </div>
        <div className="detail-row">
          <FaWallet className="detail-icon" />
          <span>Wallet</span>
          <FaChevronRight className="chevron-icon" />
        </div>
        <div className="detail-row" onClick={handlenotification}>
          <FaBell className="detail-icon" />
          <span>Notifications</span>
          <FaChevronRight className="chevron-icon" />
        </div>
        <div className="detail-row">
          <FaCog className="detail-icon" />
          <span>Settings</span>
          <FaChevronRight className="chevron-icon" />
        </div>
        <div className="detail-row">
          <FaHandsHelping className="detail-icon" />
          <span>Affiliate</span>
          <FaChevronRight className="chevron-icon" />
        </div>
        <div className="detail-row" onClick={handleabout}>
          <FaInfoCircle className="detail-icon" />
          <span>About Us</span>
          <FaChevronRight className="chevron-icon" />
        </div>
        <div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>

        </div>
      </div>
    </div>
  );
}

export default User;

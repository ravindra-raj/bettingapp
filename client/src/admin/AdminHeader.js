// import React, { useState } from 'react';
// import './AdminHeader.css';
// import { FaBars, FaSearch, FaBell, FaUserCircle, FaTachometerAlt, FaClipboardList, FaChartBar } from 'react-icons/fa';
// import { FaListUl } from "react-icons/fa6";

// const AdminHeader = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleToggle = () => {
//     console.log("Toggle button clicked"); // Check if toggle works
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleOverlayClick = () => {
//     setIsSidebarOpen(false);
//   };

//   return (
//     <>
//       <header className="admin-header">
//         <div className="toggle-bar" onClick={handleToggle}>
//           <FaBars />
//         </div>
//         {/* <div className="navbar-search1">
//           <div className="search-bar1">
//             <FaSearch className="search-icon1" />
//             <input type="text" placeholder="Search..." />
//           </div>
//         </div> */}
//         <div className="icons">
//           <div className="notification-icon">
//             <FaBell />
//           </div>
//           <div className="profile-icon">
//             <FaUserCircle />
//           </div>
//         </div>
//       </header>

//       {isSidebarOpen && (
//         <>
//           <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
//             <ul className="sidebar-menu">
//               <li>
//                 <FaTachometerAlt />
//                 <a href="/AdminDashboard1">Dashboard</a>
//               </li>
//               <li>
//                 <FaClipboardList />
//                 <a href="/Adminbet">Betting</a>
//               </li>
//               <li>
//                 <FaChartBar />
//                 <a href="/Report12">Report</a>
//               </li>
//               <li>
//               <FaListUl />
//                 <a href="/list">List</a>
//               </li>
//             </ul>
//           </div>
//           <div className="sidebar-overlay" onClick={handleOverlayClick}></div>
//         </>
//       )}
//     </>
//   );
// };

// export default AdminHeader;

import React, { useState, useEffect } from 'react';
import './AdminHeader.css';
import { FaBars, FaBell, FaUserCircle, FaTachometerAlt, FaClipboardList, FaChartBar } from 'react-icons/fa';
import { FaListUl } from "react-icons/fa6";
import axios from 'axios';

const AdminHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null); // State for user details
  // const [profileData, setProfileData] = useState({ username: '', contactNumber: '' });
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

 
    

    fetchUserDetails();
   
  }, [userId]); // Dependencies include userId

  

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOverlayClick = () => {
    setIsSidebarOpen(false);
  };

  const toggleNotificationPopup = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    localStorage.clear();  // Clear localStorage on logout
    window.location.href = '/login';  // Redirect to login page
  };

  return (
    <>
      <header className="admin-header">
        <div className="toggle-bar" onClick={handleToggle}>
          <FaBars />
        </div>
        <div className="icons">
          <div className="notification-icon" onClick={toggleNotificationPopup}>
            <FaBell />
          </div>
          <div className="profile-icon" onClick={toggleProfilePopup}>
            <FaUserCircle />
          </div>
        </div>
      </header>

      {isSidebarOpen && (
        <>
          <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <ul className="sidebar-menu">
              <li>
                <FaTachometerAlt />
                <a href="/AdminDashboard1">Dashboard</a>
              </li>
              <li>
                <FaClipboardList />
                <a href="/Adminbet">Betting</a>
              </li>
              <li>
                <FaChartBar />
                <a href="/Report12">Report</a>
              </li>
              <li>
                <FaListUl />
                <a href="/list">List</a>
              </li>
            </ul>
          </div>
          <div className="sidebar-overlay" onClick={handleOverlayClick}></div>
        </>
      )}

      {isNotificationOpen && (
        <div className="notification-popup">
          <h3>New Notifications</h3>
          <ul>
            <li>No new notifications</li>
          </ul>
        </div>
      )}

      {isProfileOpen && (
        <div className="profile-popup">
          <h3>Profile Details</h3>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Contact:</strong> {userData.contact_number}</p>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
};

export default AdminHeader;

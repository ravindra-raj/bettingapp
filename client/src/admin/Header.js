


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import image from '../Component/assets/img1.jpg';
import { RiLogoutCircleLine } from "react-icons/ri";

function Header({ OpenSidebar }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile1');
  };

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        {/* <div className='search-bar'>
          <input type='text' placeholder='Search...' />
          <BsSearch className='search-icon' />
        </div> */}
      </div>
      <div className='header-right'>
        <div className='profile'>
          <div className="navbar-item navbar-profile" onClick={toggleProfileDropdown}>
            <img src={image} alt="Profile" className="navbar-profile-img" />
            {isProfileOpen && (
              <ul className="profile-dropdown">
                <li className="profile-dropdown-item" onClick={handleProfile}>
                 <BsPersonCircle/> My Profile
                </li>
                <li className="profile-dropdown-item" onClick={handleLogout}>
                <RiLogoutCircleLine /> Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

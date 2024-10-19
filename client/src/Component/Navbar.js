import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWallet, FaBell, FaCog, FaComments, FaInfoCircle, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import './Navbar.css';
import { Button } from '@mui/material';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleNavItemClick = () => {
    closeSidebar();
  };

  return (
    <nav className="navbar">
      <div className="navbar-hamburger" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className="navbar-logo">
        <Link to="/" className="navbar-link">
          <span>CRICBET</span>
        </Link>
      </div>
      <div className="navbar-buttons">
        <Button className='size'>
          <Link to="/login"  className="navbar-button" onClick={handleNavItemClick}>
            Login
          </Link>
        </Button>
        <Button>
          <Link to="/signup" className="navbar-button" onClick={handleNavItemClick}>
            Signup
          </Link>
        </Button>
      </div>
      <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <li className="navbar-item">
          <FaUser className="navbar-icon" />
          <Link to="/profile" className="navbar-link" onClick={handleNavItemClick}>
            {isOpen && <span>Profile</span>}
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/transcationProfile" className="navbar-link" onClick={handleNavItemClick}>
            <FaWallet className="navbar-icon" />
            {isOpen && <span>Transaction</span>}
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/notification" className="navbar-link" onClick={handleNavItemClick}>
            <FaBell className="navbar-icon" />
            {isOpen && <span>Notification</span>}
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/settings" className="navbar-link" onClick={handleNavItemClick}>
            <FaCog className="navbar-icon" />
            {isOpen && <span>Settings</span>}
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/creditscore" className="navbar-link" onClick={handleNavItemClick}>
            <FaComments className="navbar-icon" />
            {isOpen && <span>Credit score</span>}
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/about-us" className="navbar-link" onClick={handleNavItemClick}>
            <FaInfoCircle className="navbar-icon" />
            {isOpen && <span>About Us</span>}
          </Link>
        </li>
      </ul>

    </nav>
  );
};

export default Navbar;

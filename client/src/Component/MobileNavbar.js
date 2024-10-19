import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChartLine, FaUser, FaComments } from 'react-icons/fa';
import './MobileNavbar.css';

const MobileNavbar = () => {
  return (
    <nav className="mobile-navbar">
      <ul className="mobile-navbar-menu">
        <li className="mobile-navbar-item">
          <Link to="/" className="mobile-navbar-link">
            <FaHome className="mobile-navbar-icon" />
            <span>Home</span>
          </Link>
        </li>
        <li className="mobile-navbar-item">
          <Link to="/live-chat" className="mobile-navbar-link">
            <FaComments className="mobile-navbar-icon" />
            <span> Chat</span>
          </Link>
        </li>
        <li className="mobile-navbar-item">
          <Link to="/me/:username" className="mobile-navbar-link">
            <FaUser className="mobile-navbar-icon" />
            <span>Me</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavbar;

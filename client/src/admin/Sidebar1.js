import React from 'react';
import './Sidebar1.css';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <nav className="sidebar-nav">
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/betting">Betting</a></li>
            <li><a href="/report">Report</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

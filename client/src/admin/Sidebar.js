
// Sidebar.js
import React, { useState } from 'react';
import { BsFillGrid3X3GapFill, BsPeopleFill, BsFillCaretDownFill } from 'react-icons/bs';
import { TiDocumentText } from 'react-icons/ti';
import { TbReport } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  const toggleUsersDropdown = (e) => {
    e.preventDefault();
    setShowUsersDropdown(!showUsersDropdown);
  };

  const toggleAdminDropdown = (e) => {
    e.preventDefault();
    setShowAdminDropdown(!showAdminDropdown);
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          Admin Dashboard
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to='/AdminDashboard'>
          <MdDashboardCustomize className='icon' /><strong>Dashboard</strong>
          </Link>
        </li>
        
         <li className='sidebar-list-item'>
          <Link to='/catergories'>
          <MdCategory className='icon'/><strong>Categories</strong>
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='/Report'>
            <TbReport className='icon' />Report
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;

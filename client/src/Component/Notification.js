import React, { useState } from 'react';
import './Notification.css';

const Notification = () => {
  const [activeTab, setActiveTab] = useState('All');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="notification">
      <header className="notification-header">
        <h1>Notifications</h1>
      </header>

      <div className="transaction-tabs">
        <div
          className={`tab-item ${activeTab === 'All' ? 'active' : ''}`}
          onClick={() => handleTabChange('All')}
        >
        All
        </div>
        <div
          className={`tab-item ${activeTab === 'New' ? 'active' : ''}`}
          onClick={() => handleTabChange('New')}
        >
        New
        </div>
        <div
          className={`tab-item ${activeTab === 'Read' ? 'active' : ''}`}
          onClick={() => handleTabChange('Read')}
        >
        Read
        </div>
      </div>

      <div className="notification-content">
        {/* Content will be based on the active tab */}
        {activeTab === 'All' && <div className="no-data">No data found</div>}
        {activeTab === 'New' && <div className="no-data">No data found</div>}
        {activeTab === 'Read' && <div className="no-data">No data found</div>}
      </div>
    </div>
  );
};

export default Notification;

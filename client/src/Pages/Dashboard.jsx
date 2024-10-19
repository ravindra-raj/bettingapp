import React from 'react';
import './Dashboard.css';
import { FaChartLine, FaUserAlt, FaBell, FaHome, FaMoneyBillWave,FaSignInAlt } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-item">
          <FaHome size={20} />
          <span style={{ marginLeft: '10px' }}>Home</span>
        </div>
        <div className="sidebar-item">
          <FaChartLine size={20} />
          <span style={{ marginLeft: '10px' }}>Live Bets</span>
        </div>
        <div className="sidebar-item">
          <FaMoneyBillWave size={20} />
          <span style={{ marginLeft: '10px' }}>Upcoming Events</span>
        </div>
      </div>
      <div className="main-content">
      <div className="top-bar">
  <div className="top-bar-content">
    <h2 className="betting-name">BetMaster </h2>
    <p className="quote">"Be smart win more"</p>
  </div>
  <div className="user-section">
  <FaSignInAlt className="login-icon" />
  <span className="login-text">Login</span>
  
  <FaBell className="notification-icon" />
  <FaUserAlt className="notification-icon" />
</div>

</div>


        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://img.freepik.com/free-vector/realistic-sports-betting-poster-sport-betting-headline-smartphone-screen-bet-now-button-vector-illustration_1284-77971.jpg?size=626&ext=jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://img.freepik.com/free-vector/realistic-sports-betting-poster-sport-betting-headline-smartphone-screen-bet-now-button-vector-illustration_1284-77971.jpg?size=626&ext=jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://img.freepik.com/free-vector/realistic-sports-betting-poster-sport-betting-headline-smartphone-screen-bet-now-button-vector-illustration_1284-77971.jpg?size=626&ext=jpg" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="card-section">
          <div className="card">
            <h3 className="card-title">Upcoming Match</h3>
            <p className="card-content">Team A vs. Team B</p>
          </div>
          <div className="card">
            <h3 className="card-title">Live Odds</h3>
            <p className="card-content">Team A: 1.5 | Team B: 2.8</p>
          </div>
          <div className="card">
            <h3 className="card-title">Your Bet</h3>
            <p className="card-content">$100 on Team A</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

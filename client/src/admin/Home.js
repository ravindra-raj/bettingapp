import React from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import the Bootstrap CSS

function Home() {
  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h5>PRODUCTS</h5>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h4>300</h4>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h5>CATEGORIES</h5>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h4>12</h4>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h5>CUSTOMERS</h5>
            <BsPeopleFill className='card_icon' />
          </div>
          <h4>33</h4>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h5>ALERTS</h5>
            <BsFillBellFill className='card_icon' />
          </div>
          <h4>42</h4>
        </div>
      </div>
    </main>
  );
}

export default Home;

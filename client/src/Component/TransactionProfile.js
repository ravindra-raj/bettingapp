// // TransactionProfile.js

// import React, { useState } from 'react';
// import './TransactionProfile.css';

// const TransactionProfile = () => {
//   const [activeTab, setActiveTab] = useState('Deposit');

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="transaction-profile">
//       <header className="transaction-header">
//         <h1>Transaction Details</h1>
//         <div className="transaction-date-range">
//           <input type="date" className="date-input" />
//           <span className="date-separator">to</span>
//           <input type="date" className="date-input" />
//           <button className="date-range-button">Apply</button>
//         </div>
//       </header>

//       <div className="transaction-tabs">
//         <div
//           className={`tab-item ${activeTab === 'Deposit' ? 'active' : ''}`}
//           onClick={() => handleTabChange('Deposit')}
//         >
//           Deposit
//         </div>
//         <div
//           className={`tab-item ${activeTab === 'Withdraw' ? 'active' : ''}`}
//           onClick={() => handleTabChange('Withdraw')}
//         >
//           Withdraw
//         </div>
//         <div
//           className={`tab-item ${activeTab === 'Other' ? 'active' : ''}`}
//           onClick={() => handleTabChange('Other')}
//         >
//           Other
//         </div>
//       </div>

//       <div className="transaction-cards">
//         {/* Sample card data */}
//         {activeTab === 'Deposit' && (
//           <>
//             <div className="transaction-card">
//               <div className="card-id">ID: 001</div>
//               <div className="card-amount">Amount: $100</div>
//               <div className="card-status">Status: Completed</div>
//             </div>
//             <div className="transaction-card">
//               <div className="card-id">ID: 002</div>
//               <div className="card-amount">Amount: $200</div>
//               <div className="card-status">Status: Pending</div>
//             </div>
//           </>
//         )}
//         {activeTab === 'Withdraw' && (
//           <>
//             <div className="transaction-card">
//               <div className="card-id">ID: 101</div>
//               <div className="card-amount">Amount: $50</div>
//               <div className="card-status">Status: Completed</div>
//             </div>
//             <div className="transaction-card">
//               <div className="card-id">ID: 102</div>
//               <div className="card-amount">Amount: $75</div>
//               <div className="card-status">Status: Pending</div>
//             </div>
//           </>
//         )}
//         {activeTab === 'Other' && (
//           <>
//             <div className="transaction-card">
//               <div className="card-id">ID: 201</div>
//               <div className="card-amount">Amount: $30</div>
//               <div className="card-status">Status: Completed</div>
//             </div>
//             <div className="transaction-card">
//               <div className="card-id">ID: 202</div>
//               <div className="card-amount">Amount: $120</div>
//               <div className="card-status">Status: Pending</div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TransactionProfile;


// import React, { useState, useEffect } from 'react';
// import './TransactionProfile.css';

// const TransactionProfile = () => {
//   const [activeTab, setActiveTab] = useState('Deposit');
//   const [transactions, setTransactions] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const userId = localStorage.getItem('user_id'); // Get user ID from local storage

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleFetchData = () => {
//     let url = '';
//     switch (activeTab) {
//       case 'Deposit':
//         url = `http://localhost:5000/api/transactions/${userId}`;
//         break;
//       case 'Withdraw':
//         url = `http://localhost:5000/api/withdrawals/${userId}`;
//         break;
//       case 'Other':
//         url = `http://localhost:5000/api/bets/${userId}`;
//         break;
//       default:
//         return;
//     }

//     // Append date filter if both dates are selected
//     if (startDate && endDate) {
//       url += `?startDate=${startDate}&endDate=${endDate}`;
//     }

//     // Fetch data based on active tab and date range
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => setTransactions(data))
//       .catch((error) => console.error('Error fetching data:', error));
//   };

//   // Fetch data when the active tab changes or date range is applied
//   useEffect(() => {
//     handleFetchData();
//   }, [activeTab]);

//   const handleApplyFilter = () => {
//     handleFetchData();
//   };

//   return (
//     <div className="transaction-profile">
//       <header className="transaction-header">
//         <h1>Transaction Details</h1>
//         <div className="transaction-date-range">
//           <input
//             type="date"
//             className="date-input"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//           <span className="date-separator">to</span>
//           <input
//             type="date"
//             className="date-input"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//           <button className="date-range-button" onClick={handleApplyFilter}>
//             Apply
//           </button>
//         </div>
//       </header>

//       <div className="transaction-tabs">
//         <div
//           className={`tab-item ${activeTab === 'Deposit' ? 'active' : ''}`}
//           onClick={() => handleTabChange('Deposit')}
//         >
//           Deposit
//         </div>
//         <div
//           className={`tab-item ${activeTab === 'Withdraw' ? 'active' : ''}`}
//           onClick={() => handleTabChange('Withdraw')}
//         >
//           Withdraw
//         </div>
//         <div
//           className={`tab-item ${activeTab === 'Other' ? 'active' : ''}`}
//           onClick={() => handleTabChange('Other')}
//         >
//           Other
//         </div>
//       </div>

//       <div className="transaction-cards">
//         {transactions.length === 0 ? (
//           <p>No transactions found</p>
//         ) : (
//           transactions.map((transaction) => (
//             <div key={transaction.id} className="transaction-card">
//               <div className="card-id">Date: {transaction.transaction_date}</div>
//               <div className="card-amount">Amount: ${transaction.amount}</div>
//               {/* <div className="card-status">Status: {transaction.status}</div> */}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default TransactionProfile;


import React, { useState, useEffect } from 'react';
import './TransactionProfile.css';

const TransactionProfile = () => {
  const [activeTab, setActiveTab] = useState('Deposit');
  const [deposits, setDeposits] = useState([]); // Separate array for deposits
  const [withdrawals, setWithdrawals] = useState([]); // Separate array for withdrawals
  const [bets, setBets] = useState([]); // Separate array for bets
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const userId = localStorage.getItem('user_id'); // Get user ID from local storage

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    handleFetchData(tab); // Fetch data when tab changes
  };

  const handleFetchData = (tab) => {
    let url = '';
    switch (tab) {
      case 'Deposit':
        url = `http://localhost:5000/api/transactions/${userId}`;
        break;
      case 'Withdraw':
        url = `http://localhost:5000/api/withdrawals/${userId}`;
        break;
      case 'Other':
        url = `http://localhost:5000/api/bets/${userId}`;
        break;
      default:
        return;
    }

    // Append date filter if both dates are selected
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }

    // Fetch data based on active tab and date range
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (tab === 'Deposit') {
          setDeposits(data);
        } else if (tab === 'Withdraw') {
          setWithdrawals(data);
        } else if (tab === 'Other') {
          setBets(data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  // Fetch data when the active tab changes
  useEffect(() => {
    handleFetchData(activeTab);
  }, [activeTab]);

  const handleApplyFilter = () => {
    handleFetchData(activeTab);
  };

  return (
    <div className="transaction-profile">
      <header className="transaction-header">
        <h1>Transaction Details</h1>
        <div className="transaction-date-range">
          <input
            type="date"
            className="date-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="date-separator">to</span>
          <input
            type="date"
            className="date-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button className="date-range-button" onClick={handleApplyFilter}>
            Apply
          </button>
        </div>
      </header>

      <div className="transaction-tabs">
        <div
          className={`tab-item ${activeTab === 'Deposit' ? 'active' : ''}`}
          onClick={() => handleTabChange('Deposit')}
        >
          Deposit
        </div>
        <div
          className={`tab-item ${activeTab === 'Withdraw' ? 'active' : ''}`}
          onClick={() => handleTabChange('Withdraw')}
        >
          Withdraw
        </div>
        <div
          className={`tab-item ${activeTab === 'Other' ? 'active' : ''}`}
          onClick={() => handleTabChange('Other')}
        >
          Other
        </div>
      </div>

      {/* Transaction Cards */}
      <div className="transaction-cards">
        {activeTab === 'Deposit' && (
          deposits.length === 0 ? (
            <p>No deposit transactions found</p>
          ) : (
            deposits.map((transaction) => (
              <div key={transaction.id} className="transaction-card">
                <div className="card-id"> Date: {new Date(transaction.transaction_date).toLocaleDateString()} {new Date(transaction.transaction_date).toLocaleTimeString()}</div>
                <div className="card-amount">Amount: ${transaction.amount}</div>
              </div>
            ))
          )
        )}

        {activeTab === 'Withdraw' && (
          withdrawals.length === 0 ? (
            <p>No withdrawal transactions found</p>
          ) : (
            withdrawals.map((transaction) => (
              <div key={transaction.id} className="transaction-card">
                <div className="card-id"> Date: {new Date(transaction.created_at).toLocaleDateString()} {new Date(transaction.created_at).toLocaleTimeString()}</div>
                <div className="card-amount">Amount: ${transaction.withdrawal_amount}</div>
              </div>
            ))
          )
        )}

        {activeTab === 'Other' && (
          bets.length === 0 ? (
            <p>No bet transactions found</p>
          ) : (
            bets.map((transaction) => (
              <div key={transaction.id} className="transaction-card">
                <div className="card-id"> Date: {new Date(transaction.created_at).toLocaleDateString()} {new Date(transaction.created_at).toLocaleTimeString()}</div>
                <div className="card-amount">Amount: ${transaction.bet_amount}</div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default TransactionProfile;

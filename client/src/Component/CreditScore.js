// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import './CreditScore.css'; // Import the CSS file for styling

// // // const CreditScore = () => {
// // //     const [data, setData] = useState(null);
// // //     const [loading, setLoading] = useState(true);
// // //     const [error, setError] = useState(null);

// // //     // Fetch userId from localStorage
// // //     const userId = localStorage.getItem('user_id');

// // //     useEffect(() => {
// // //         if (userId) {
// // //             axios.get(`http://localhost:5000/api/user/${userId}/creditscore-today`)
// // //                 .then(response => {
// // //                     setData(response.data);
// // //                     setLoading(false);
// // //                 })
// // //                 .catch(error => {
// // //                     setError('Error fetching data');
// // //                     setLoading(false);
// // //                 });
// // //         } else {
// // //             setError('No user logged in');
// // //             setLoading(false);
// // //         }
// // //     }, [userId]);

// // //     if (loading) return <div>Loading...</div>;
// // //     if (error) return <div>{error}</div>;

// // //     const { creditScore, totalDeposits, totalWithdrawals, totalBets, totalWins, totalProfitLoss, transactions, withdrawals, bets } = data;

// // //     return (
// // //         <div className="credit-score-container">
// // //             <h2>Credit Score: {creditScore.toFixed(2)}</h2>
// // //             <div className="summary">
// // //                 <p>Total Deposits: {totalDeposits.toFixed(2)}</p>
// // //                 <p>Total Withdrawals: {totalWithdrawals.toFixed(2)}</p>
               
// // //             </div>
// // //             <h3>Transactions</h3>
// // //             <ul className="transaction-list">
// // //                 {transactions.map((transaction, index) => (
// // //                     <li key={index} className="transaction-item">
// // //                         <strong>{transaction.transaction_type}:</strong> {transaction.transaction_amount} ({transaction.transaction_date})
// // //                     </li>
// // //                 ))}
// // //             </ul>
// // //             <h3>Withdrawals</h3>
// // //             <ul className="withdrawal-list">
// // //                 {withdrawals.map((withdrawal, index) => (
// // //                     <li key={index} className="withdrawal-item">
// // //                         <strong>Amount:</strong> {withdrawal.withdrawal_amount} ({withdrawal.created_at})
// // //                     </li>
// // //                 ))}
// // //             </ul>
// // //             <h3>Bets</h3>
// // //             <ul className="bet-list">
// // //                 {bets.map((bet, index) => (
// // //                     <li key={index} className="bet-item">
// // //                         <strong>Bet:</strong> {bet.bet_amount} ({bet.status}, {bet.created_at})
// // //                     </li>
// // //                 ))}
// // //             </ul>
// // //         </div>
// // //     );
// // // };

// // // export default CreditScore;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CreditScore.css'; // Import the CSS file for styling

// const CreditScore = () => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [activeTab, setActiveTab] = useState('today'); // State for the active tab

//     // Fetch userId from localStorage
//     const userId = localStorage.getItem('user_id');

//     // Function to fetch data based on the active tab
//     const fetchData = () => {
//         if (userId) {
//             const urlMap = {
//                 today: `http://localhost:5000/api/user/${userId}/creditscore-today`,
//                 month: `http://localhost:5000/api/user/${userId}/creditscore-this-month`,
//                 year: `http://localhost:5000/api/user/${userId}/creditscore-this-year`,
//                 total: `http://localhost:5000/api/user/${userId}/totalcreditscore`
//             };

//             // Fetching all data needed for the tab
//             axios.get(urlMap[activeTab])
//                 .then(response => {
//                     setData(response.data);
//                     setLoading(false);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching data:', error); // Log error for debugging
//                     setError('Error fetching data');
//                     setLoading(false);
//                 });
//         } else {
//             setError('No user logged in');
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData(); // Fetch data whenever the active tab changes
//     }, [activeTab, userId]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     // Destructure values from data with defaults to prevent undefined errors
//     const {
//         creditScore = 0,
//         totalDeposits = 0,
//         totalWithdrawals = 0,
//         transactions = [],
//         withdrawals = []
//     } = data;

//     return (
//         <div className="credit-score-container">
//             <h2>Credit Score: {creditScore.toFixed(2)}</h2>
//             <div className="tabs">
//                 <button onClick={() => setActiveTab('today')} className={activeTab === 'today' ? 'active' : ''}>Today</button>
//                 <button onClick={() => setActiveTab('month')} className={activeTab === 'month' ? 'active' : ''}>Month</button>
//                 <button onClick={() => setActiveTab('year')} className={activeTab === 'year' ? 'active' : ''}>Year</button>
//                 <button onClick={() => setActiveTab('total')} className={activeTab === 'total' ? 'active' : ''}>Total</button>
//             </div>
//             <div className="summary">
//                 <p>Total Deposits: {totalDeposits.toFixed(2)}</p>
//                 <p>Total Withdrawals: {totalWithdrawals.toFixed(2)}</p>
//             </div>
//             <h3>Transactions</h3>

//             <ul className="transaction-list">
//                 {transactions.map((transaction, index) => (
//                     <li key={index} className="transaction-item">
//                         <strong>{transaction.transaction_type}:</strong> {transaction.transaction_amount} ({transaction.transaction_date})
//                     </li>
//                 ))}
//             </ul>
//             <h3>Withdrawals</h3>
//             <ul className="withdrawal-list">
//                 {withdrawals.map((withdrawal, index) => (
//                     <li key={index} className="withdrawal-item">
//                         <strong>Amount:</strong> {withdrawal.withdrawal_amount} ({withdrawal.created_at})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default CreditScore;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreditScore.css'; // Import the CSS file for styling

const CreditScore = () => {
    const [data, setData] = useState({}); // Initialize data as an object
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('today'); // State for the active tab
    const {
      
        transactions = [],
        withdrawals = []
    } = data;
    // Fetch userId from localStorage
    const userId = localStorage.getItem('user_id');

    // Function to fetch data based on the active tab
    const fetchData = () => {
        if (userId) {
            let url;

            // Using a switch statement to set the URL based on the active tab
            switch (activeTab) {
                case 'today':
                    url = `http://localhost:5000/api/user/${userId}/creditscore-today`;
                    break;
                case 'month':
                    url = `http://localhost:5000/api/user/${userId}/creditscore-this-month`;
                    break;
                case 'year':
                    url = `http://localhost:5000/api/user/${userId}/creditscore-this-year`;
                    break;
                case 'total':
                    url = `http://localhost:5000/api/user/${userId}/totalcreditscore`;
                    break;
                default:
                    url = `http://localhost:5000/api/user/${userId}/creditscore-today`; // Default to today
            }

            // Fetching data from the selected URL
            axios.get(url)
                .then(response => {
                    setData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error); // Log error for debugging
                    setError('Error fetching data');
                    setLoading(false);
                });
        } else {
            setError('User ID not found.');
            setLoading(false);
        }
    };

    // Fetch data whenever the activeTab changes
    useEffect(() => {
        fetchData();
    }, [activeTab]);

    // Function to handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Render the component
    return (
        <div className="credit-score-container">
            <div className="tab-container">
                <button onClick={() => handleTabChange('today')} className={activeTab === 'today' ? 'active' : ''}>Today</button>
                <button onClick={() => handleTabChange('month')} className={activeTab === 'month' ? 'active' : ''}>This Month</button>
                <button onClick={() => handleTabChange('year')} className={activeTab === 'year' ? 'active' : ''}>This Year</button>
                <button onClick={() => handleTabChange('total')} className={activeTab === 'total' ? 'active' : ''}>Total</button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
                <div className="credit-score-data">
                    <h2>Credit Score: {data.creditScoreToday || data.creditScore || data.creditScoreThisMonth || data.creditScoreThisYear}</h2>
                    <p>Total Deposits: {data.totalDepositsToday || data.totalDepositsThisMonth || data.totalDepositsThisYear || data.totalDeposits}</p>
                    <p>Total Withdrawals: {data.totalWithdrawalsToday || data.totalWithdrawalsThisMonth || data.totalWithdrawalsThisYear || data.totalWithdrawals}</p>
                    {/* Add more data display as necessary */}
                </div>
            )}
             {/* <h3>Transactions</h3>
            <ul className="transaction-list">
                {transactions.map((transaction, index) => (
                    <li key={index} className="transaction-item">
                        <strong>{transaction.transaction_type}:</strong> {transaction.transaction_amount} ({transaction.transaction_date})
                    </li>
                ))}
            </ul>
            <h3>Withdrawals</h3>
            <ul className="withdrawal-list">
                 {withdrawals.map((withdrawal, index) => (
                    <li key={index} className="withdrawal-item">
                        <strong>Amount:</strong> {withdrawal.withdrawal_amount} ({withdrawal.created_at})
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default CreditScore;

// import React from 'react';
// import './BettingApp.css';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// ChartJS.register(Title, Tooltip, Legend, ArcElement);

// const BettingApp = () => {
//   const matches = [
//     {
//       name: 'IND vs PAK',
//       data: {
//         labels: ['India', 'Pakistan'],
//         datasets: [
//           {
//             data: [250000, 52222],
//             backgroundColor: ['#FF6384', '#36A2EB'],
//           },
//         ],
//       },
//       bets: [
//         { name: 'John Doe', amount: 10000, match: 'IND vs PAK', country: 'India', depositId: 'D1234' },
//         { name: 'Jane Smith', amount: 15000, match: 'IND vs PAK', country: 'India', depositId: 'D1235' },
//         { name: 'Mike Johnson', amount: 20000, match: 'IND vs PAK', country: 'Pakistan', depositId: 'D1236' },
//       ],
//     },
//     {
//       name: 'SL vs BAN',
//       data: {
//         labels: ['Sri Lanka', 'Bangladesh'],
//         datasets: [
//           {
//             data: [150000, 80000],
//             backgroundColor: ['#FFCE56', '#4BC0C0'],
//           },
//         ],
//       },
//       bets: [
//         { name: 'Sara Wilson', amount: 5000, match: 'SL vs BAN', country: 'Sri Lanka', depositId: 'D1237' },
//         { name: 'Tom Brown', amount: 7000, match: 'SL vs BAN', country: 'Bangladesh', depositId: 'D1238' },
//       ],
//     },
//     {
//       name: 'AUS vs SA',
//       data: {
//         labels: ['Australia', 'South Africa'],
//         datasets: [
//           {
//             data: [300000, 150000],
//             backgroundColor: ['#FF6384', '#36A2EB'],
//           },
//         ],
//       },
//       bets: [
//         { name: 'Emily Davis', amount: 20000, match: 'AUS vs SA', country: 'Australia', depositId: 'D1239' },
//         { name: 'James Wilson', amount: 25000, match: 'AUS vs SA', country: 'South Africa', depositId: 'D1240' },
//       ],
//     },
//     {
//       name: 'NZ vs ENG',
//       data: {
//         labels: ['New Zealand', 'England'],
//         datasets: [
//           {
//             data: [180000, 220000],
//             backgroundColor: ['#FFCE56', '#4BC0C0'],
//           },
//         ],
//       },
//       bets: [
//         { name: 'Alice Johnson', amount: 12000, match: 'NZ vs ENG', country: 'New Zealand', depositId: 'D1241' },
//         { name: 'Bob Smith', amount: 30000, match: 'NZ vs ENG', country: 'England', depositId: 'D1242' },
//       ],
//     },
//   ];

//   return (
//     <div className="betting-app">
//       {matches.map((match, index) => (
//         <div key={index} className="match-section">
//           <h2>{match.name}</h2>
//           <div className="pie-chart">
//             <Pie data={match.data} />
//           </div>
//           <div className="betting-table">
//             <h3>Bet Details</h3>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Amount</th>
//                   <th>Match</th>
//                   <th>Country</th>
//                   <th>Deposit ID</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {match.bets.map((bet, index) => (
//                   <tr key={index}>
//                     <td>{bet.name}</td>
//                     <td>{bet.amount}</td>
//                     <td>{bet.match}</td>
//                     <td>{bet.country}</td>
//                     <td>{bet.depositId}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BettingApp;


import React, { useEffect, useState } from 'react';
import './BettingApp.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import AdminHeader from './AdminHeader';
 
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const BettingApp = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  // Normalize team names to lowercase and remove spaces for consistency
  const normalizeTeamName = (teamName) => teamName.toLowerCase().replace(/\s+/g, '');

  // Extend team colors
  const teamColors = {
    ind: '#1C5FA3',
    pak: '#006600',
    aus: '#FFCE56',
    eng: '#1F6D99',
    sa: '#006840',
    nz:'#00000',
    wi:'#7F1E57',
    sl:  '#FFD700 ',
    ban: '#006400 ',
    af: '#1F3C88',
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bets/today-matchs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setMatches(data);
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
        setError(error.message);
      }
    };

    fetchMatches();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
  
    <div className="betting-app">
      {matches.length === 0 ? (
        <p>No matches found for today.</p>
      ) : (
        matches.map((match, index) => {
          // Create pie chart data based on teams
          const pieData = {
            labels: match.bets.map(bet => bet.team),
          datasets: [
            {
              label: 'Bet Amount',
              data: match.bets.map(bet => bet.amount),
              backgroundColor: match.bets.map(bet => 
                teamColors[normalizeTeamName(bet.team)] || '#CCCCCC' // Use team colors or fallback
              ),
            }
          ]
        };

        return (
          <div key={index} className="match-section">
            <h2>{match.match_name}</h2>
            <div className="pie-chart">
              <Pie data={pieData} />
            </div>
            <div className="betting-table">
              <h3>Bet Details</h3>
              <table>
                <thead>
                  <tr>
                    <th>Team</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {match.bets.map((bet, betIndex) => (
                    <tr key={betIndex}>
                      <td>{bet.team}</td>
                      <td>{bet.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })
    )}
  </div>
  
);
};
export default BettingApp;
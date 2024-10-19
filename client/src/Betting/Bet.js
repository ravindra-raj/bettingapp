// import React, { useState } from 'react';
// import './Bet.css';

// function Matches() {
//   const [selectedTab, setSelectedTab] = useState('Matches');
//   const [expandedLeagues, setExpandedLeagues] = useState({});

//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);
//   };

//   const toggleLeague = (leagueId) => {
//     setExpandedLeagues((prevExpanded) => ({
//       ...prevExpanded,
//       [leagueId]: !prevExpanded[leagueId],
//     }));
//   };

//   const tabs = ['Matches', 'Competitions', 'Outrights'];
//   const leagues = [
//         {
//           id: 1,
//           name: 'International - T20 Series West Indies vs South Africa',
//           flag: 'af',
//           matches: [
//             {
//               teams: ['West Indies', 'South Africa'],
//               time: 'Tomorrow 00:00',
//               odds: {
//                 'o 5.5': 1.84,
//                 'u 5.5': 1.90,
//                 'o 47.5': 1.88,
//                 'u 47.5': 1.83,
//                 'H2H': [1.61, 2.32],
//               },
//             },
//           ],
//         },
//         {
//           id: 2,
//           name: 'India - T20 Delhi Premier League',
//           flag: 'in',
//           matches: [
//             {
//               teams: ['South Delhi Superstarz', 'West Delhi Lions'],
//               time: 'Today 13:30',
//               odds: {
//                 'o 6.5': 2.04,
//                 'u 6.5': 1.73,
//                 'H2H': [1.49, 2.64],
//               },
//             },
//             {
//               teams: ['East Delhi Riders', 'North Delhi Strikers'],
//               time: 'Today 18:30',
//               odds: {
//                 'H2H': [1.49, 2.64],
//               },
//             },
//           ],
//         },
//         {
//           id: 3,
//           name: 'International - T20 Series West Indies vs South Africa',
//           flag: 'gd',
//           matches: [
//             {
//               teams: ['West Indies', 'South Africa'],
//               time: 'Tomorrow 00:00',
//               odds: {
//                 'o 5.5': 1.84,
//                 'u 5.5': 1.90,
//                 'o 47.5': 1.88,
//                 'u 47.5': 1.83,
//                 'H2H': [1.61, 2.32],
//               },
//             },
//           ],
//         },
//         {
//           id: 4,
//           name: 'India - T20 Delhi Premier League',
//           flag: 'in',
//           matches: [
//             {
//               teams: ['South Delhi Superstarz', 'West Delhi Lions'],
//               time: 'Today 13:30',
//               odds: {
//                 'o 6.5': 2.04,
//                 'u 6.5': 1.73,
//                 'H2H': [1.49, 2.64],
//               },
//             },
//             {
//               teams: ['East Delhi Riders', 'North Delhi Strikers'],
//               time: 'Today 18:30',
//               odds: {
//                 'H2H': [1.49, 2.64],
//               },
//             },
//           ],
//         },
//         {
//           id: 5,
//           name: 'International - T20 Series West Indies vs South Africa',
//           flag: 'ar',
//           matches: [
//             {
//               teams: ['West Indies', 'South Africa'],
//               time: 'Tomorrow 00:00',
//               odds: {
//                 'o 5.5': 1.84,
//                 'u 5.5': 1.90,
//                 'o 47.5': 1.88,
//                 'u 47.5': 1.83,
//                 'H2H': [1.61, 2.32],
//               },
//             },
//           ],
//         },
//         {
//           id: 6,
//           name: 'India - T20 Delhi Premier League',
//           flag: 'ca',
//           matches: [
//             {
//               teams: ['South Delhi Superstarz', 'West Delhi Lions'],
//               time: 'Today 13:30',
//               odds: {
//                 'o 6.5': 2.04,
//                 'u 6.5': 1.73,
//                 'H2H': [1.49, 2.64], 
//               },
//             },
//             {
//               teams: ['East Delhi Riders', 'North Delhi Strikers'],
//               time: 'Today 18:30',
//               odds: {
//                 'H2H': [1.49, 2.64],
//               },
//             },
//           ],
//         },
//         {
//           id: 7,
//           name: 'International - T20 Series West Indies vs South Africa',
//           flag: 'lk',
//           matches: [
//             {
//               teams: ['West Indies', 'South Africa'],
//               time: 'Tomorrow 00:00',
//               odds: {
//                 'o 5.5': 1.84,
//                 'u 5.5': 1.90,
//                 'o 47.5': 1.88,
//                 'u 47.5': 1.83,
//                 'H2H': [1.61, 2.32],
//               },
//             },
//           ],
//         },
//         {
//           id: 8,
//           name: 'India - T20 Delhi Premier League',
//           flag: 'in',
//           matches: [
//             {
//               teams: ['South Delhi Superstarz', 'West Delhi Lions'],
//               time: 'Today 13:30',
//               odds: {
//                 'o 6.5': 2.04,
//                 'u 6.5': 1.73,
//                 'H2H': [1.49, 2.64],
//               },
//             },
//             {
//               teams: ['East Delhi Riders', 'North Delhi Strikers'],
//               time: 'Today 18:30',
//               odds: {
//                 'H2H': [1.49, 2.64],
//               },
//             },
//           ],
//         },
//         {
//           id: 9,
//           name: 'International - T20 Series West Indies vs South Africa',
//           flag: 'gd',
//           matches: [
//             {
//               teams: ['West Indies', 'South Africa'],
//               time: 'Tomorrow 00:00',
//               odds: {
//                 'o 5.5': 1.84,
//                 'u 5.5': 1.90,
//                 'o 47.5': 1.88,
//                 'u 47.5': 1.83,
//                 'H2H': [1.61, 2.32],
//               },
//             },
//           ],
//         },
//         {
//           id: 10,
//           name: 'India - T20 Delhi Premier League',
//           flag: 'in',
//           matches: [
//             {
//               teams: ['South Delhi Superstarz', 'West Delhi Lions'],
//               time: 'Today 13:30',
//               odds: {
//                 'o 6.5': 2.04,
//                 'u 6.5': 1.73,
//                 'H2H': [1.49, 2.64],
//               },
//             },
//             {
//               teams: ['East Delhi Riders', 'North Delhi Strikers'],
//               time: 'Today 18:30',
//               odds: {
//                 'H2H': [1.49, 2.64],
//               },
//             },
//           ],
//         },
//         {
//           id: 11,
//           name: 'international - T20 Series West Indies vs South Africa',
//           flag: 'za',
//           matches: [
//             {
//               teams: ['West Indies', 'South Africa'],
//               time: 'Tomorrow 00:00',
//               odds: {
//                 'o 5.5': 1.84,
//                 'u 5.5': 1.90,
//                 'o 47.5': 1.88,
//                 'u 47.5': 1.83,
//                 'H2H': [1.61, 2.32],
//               },
//             },
//           ],
//         },
//         {
//           id: 12,
//           name: 'India - T20 Delhi Premier League',
//           flag: 'in',
//           matches: [
//             {
//               teams: ['South Delhi Superstarz', 'West Delhi Lions'],
//               time: 'Today 13:30',
//               odds: {
//                 'o 6.5': 2.04,
//                 'u 6.5': 1.73,
//                 'H2H': [1.49, 2.64],
//               },
//             },
//             {
//               teams: ['East Delhi Riders', 'North Delhi Strikers'],
//               time: 'Today 18:30',
//               odds: {
//                 'H2H': [1.49, 2.64],
//               },
//             },
//           ],
//         },
//       ];
    

//   return (
//     <div className="container">
//       <div className="tabs">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             className={`tab ${selectedTab === tab ? 'active' : ''}`}
//             onClick={() => handleTabChange(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search (Leagues, Teams/..."
//           className="search-input"
//         />
//         <button className="top-button">Top</button>
//       </div>
//       <div className="time-options">
//         <button className="time-option">1hr</button>
//         <button className="time-option">3hr</button>
//         <button className="time-option">12hr</button>
//       </div>
//       <div className="league-list">
//         {leagues.map((league) => (
//           <div
//             key={league.id}
//             className={`league-item ${expandedLeagues[league.id] ? 'expanded' : ''}`}
//             onClick={() => toggleLeague(league.id)}
//           >
//             <div className="league-header">
//               {/* <img
//                 src={league.flag === 'globe' ? 'https://path-to-your-globe-image.png' : 'https://flagcdn.com/48x36/za.png' }
//                 alt={league.flag}
//                 className="flag"
//               /> */}
//               <img
//                 src={
//                   league.flag === 'globe'
//                     ? 'https://path-to-your-globe-image.png'
//                     : `https://flagcdn.com/48x36/${league.flag.toLowerCase()}.png`
//                 }
//                 alt={league.flag}
//                 className="flag"
//               />
//               <span className="league-name">{league.name}</span>
//               <span className="dropdown-icon">&#9662;</span>
//             </div>
//             {expandedLeagues[league.id] && (
//               <div className="league-details">
//                 <ul className="match-list">
//                   {league.matches.map((match, matchIndex) => (
//                     <li key={matchIndex} className="match-item">
//                       <div className="match-info">
//                         <span className="match-teams">
//                           {match.teams.join(' vs ')}
//                         </span>
//                         <span className="match-time">{match.time}</span>
//                       </div>
//                       <div className="match-odds">
//                         {Object.entries(match.odds).map(([key, value]) => (
//                           <div key={key} className="odd-item">
//                             {key === 'H2H' ? (
//                               <div className="odd-h2h">
//                                 {value.map((odd, index) => (
//                                   <button key={index} className="odd-button">
//                                     {odd}
//                                   </button>
//                                 ))}
//                               </div>
//                             ) : (
//                               <>
//                                 <span className="odd-key">{key}</span>
//                                 <div className="odd-buttons">
//                                   <button className="odd-button">{value}</button>
//                                 </div>
//                               </>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Matches;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Bet.css';

// function Matches() {
//   const [matchesData, setMatchesData] = useState([]);
//   const [selectedMatches, setSelectedMatches] = useState([]);

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/matches');
//         setMatchesData(response.data);
//       } catch (error) {
//         console.error('Error fetching match data:', error);
//       }
//     };

//     fetchMatches();
//   }, []);

//   const handleSelectMatch = async (matchId) => {
//     try {
//       await axios.post('http://localhost:5000/api/selected-matches', { userId: 1, matchId }); // Example userId
//       setSelectedMatches([...selectedMatches, matchId]);
//       alert('Match selected successfully');
//     } catch (error) {
//       console.error('Error selecting match:', error);
//     }
//   };

//   return (
//     <div className="container">
//       {/* Ensure matchesData is not undefined before mapping */}
//       {matchesData && matchesData.length > 0 ? (
//         matchesData.map((league) => (
//           <div key={league.id}>
//             <h3>{league.name}</h3>
//             {/* Ensure league.matches is defined before mapping */}
//             {league.matches && league.matches.length > 0 ? (
//               league.matches.map((match) => (
//                 <div key={match.id}>
//                   <p>{match.teams}</p>
//                   <button onClick={() => handleSelectMatch(match.id)}>
//                     Select Match
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p>No matches available for this league.</p>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No leagues available.</p>
//       )}
//     </div>
//   );
// }

// export default Matches;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Bet.css';

// function Matches() {
//   const [matchesData, setMatchesData] = useState([]);
//   const [expandedLeagues, setExpandedLeagues] = useState({});
//   const [selectedMatches, setSelectedMatches] = useState([]);

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/matches');
//         console.log('Fetched matches data:', response.data); // Log the fetched data for debugging
//         setMatchesData(response.data);
//       } catch (error) {
//         console.error('Error fetching match data:', error);
//       }
//     };
//     fetchMatches();
//   }, []);

//   const toggleLeague = (leagueId) => {
//     setExpandedLeagues((prev) => ({
//       ...prev,
//       [leagueId]: !prev[leagueId],
//     }));
//   };

//   const handleSelectMatch = async (matchId) => {
//     try {
//       await axios.post('http://localhost:5000/api/selected-matches', { matchId });
//       setSelectedMatches([...selectedMatches, matchId]);
//       alert('Match selected successfully');
//     } catch (error) {
//       console.error('Error selecting match:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="tabs">
//         <button className="tab active">Matches</button>
//         <button className="tab">Competitions</button>
//         <button className="tab">Outrights</button>
//       </div>

//       <div className="search-bar">
//         <input type="text" placeholder="Search (Leagues, Teams/..." className="search-input" />
//         {/* <button className="top-button">Top</button> */}
//       </div>

//       {/* <div className="time-options">
//         <button className="time-option">1hr</button>
//         <button className="time-option">3hr</button>
//         <button className="time-option">12hr</button>
//       </div> */}

//       <div className="league-list">
//         {matchesData.length > 0 ? (
//           matchesData.map((league) => (
//             <div
//               key={league.id}
//               className={`league-item ${expandedLeagues[league.id] ? 'expanded' : ''}`}
//               onClick={() => toggleLeague(league.id)}
//             >
//               <div className="league-header">
//                 {league.flag ? (
//                   <img
//                     src={`https://flagcdn.com/48x36/${league.flag.toLowerCase()}.png`}
//                     alt={league.flag}
//                     className="flag"
//                   />
//                 ) : (
//                   <span>No flag available</span>
//                 )}
//                 <span className="league-name">{league.name}</span>
//                 <span className="dropdown-icon">&#9662;</span>
//               </div>

//               {expandedLeagues[league.id] && (
//                 <div className="league-details">
//                   <ul className="match-list">
//                     {league.matches.map((match) => {
//                       console.log('Match data:', match);
                      
//                       return (
//                         <li key={match.id} className="match-item">
//                           <div className="match-info">
//                             <p>
//                               {Array.isArray(match.teams) 
//                                 ? match.teams.join(' vs ') 
//                                 : `${JSON.stringify(match.teams)}`}
//                             </p>
//                             <p>{match.time}</p>
//                             <div className="odds-info">
//                               {match.odds && Object.entries(match.odds).map(([type, value]) => (
//                                 <p key={type}>
//                                   {type}: {Array.isArray(value) ? value.join(' / ') : value}
//                                 </p>
//                               ))}
//                             </div>
//                           </div>
//                           <button onClick={() => handleSelectMatch(match.id)}>Select Match</button>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No leagues available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Matches;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Bet.css';

// function Matches() {
//   const [matchesData, setMatchesData] = useState([]);
//   const [expandedLeagues, setExpandedLeagues] = useState({});
//   const [selectedMatches, setSelectedMatches] = useState({});
//   const [bettingAmounts, setBettingAmounts] = useState({});

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/matches');
//         console.log('Fetched matches data:', response.data);
//         setMatchesData(response.data);
//       } catch (error) {
//         console.error('Error fetching match data:', error);
//       }
//     };
//     fetchMatches();
//   }, []);

//   const toggleLeague = (leagueId) => {
//     setExpandedLeagues((prev) => ({
//       ...prev,
//       [leagueId]: !prev[leagueId],
//     }));
//   };

//   const handleBettingAmountChange = (matchId, amount) => {
//     setBettingAmounts((prev) => ({
//       ...prev,
//       [matchId]: amount,
//     }));
//   };

//   const handleSelectMatch = async (matchId) => {
//     try {
//       const bettingAmount = bettingAmounts[matchId];
//       if (!bettingAmount) {
//         alert('Please enter a betting amount.');
//         return;
//       }

//       await axios.post('http://localhost:5000/api/selected-matches', { userId: 1, matchId, bettingAmount });
//       setSelectedMatches((prev) => ({
//         ...prev,
//         [matchId]: true,
//       }));
//       alert('Match selected successfully with betting amount');
//     } catch (error) {
//       console.error('Error selecting match:', error);
//     }
//   };

//   // Function to format date and time
//   const formatDateTime = (isoString) => {
//     const date = new Date(isoString);
//     const formattedDate = date.toLocaleDateString(); // Format the date
//     const formattedTime = date.toLocaleTimeString(); // Format the time
//     return `${formattedDate} ${formattedTime}`; // Combine date and time
//   };

//   return (
//     <div className="container">
//       <div className="tabs">
//         <button className="tab active">Matches</button>
//         <button className="tab">Competitions</button>
//         <button className="tab">Outrights</button>
//       </div>

//       <div className="search-bar">
//         <input type="text" placeholder="Search (Leagues, Teams/..." className="search-input" />
//       </div>

//       <div className="league-list">
//         {matchesData.length > 0 ? (
//           matchesData.map((league) => (
//             <div
//               key={league.id}
//               className={`league-item ${expandedLeagues[league.id] ? 'expanded' : ''}`}
//               onClick={() => toggleLeague(league.id)}
//             >
//               <div className="league-header">
//                 {league.flag ? (
//                   <img
//                     src={`https://flagcdn.com/48x36/${league.flag.toLowerCase()}.png`}
//                     alt={league.flag}
//                     className="flag"
//                   />
//                 ) : (
//                   <span>No flag available</span>
//                 )}
//                 <span className="league-name">{league.name}</span>
//                 <span className="dropdown-icon">&#9662;</span>
//               </div>

//               {expandedLeagues[league.id] && (
//                 <div className="league-details">
//                   <ul className="match-list">
//                     {league.matches.map((match) => {
//                       return (
//                         <li key={match.id} className="match-item">
//                           <div className="match-info">
//                             <p>{Array.isArray(match.teams) ? match.teams.join(' vs ') : `${JSON.stringify(match.teams)}`}</p>
//                             <p>{formatDateTime(match.match_time)}</p> 
//                             <div className="odds-info">
//                               {match.odds && Object.entries(match.odds).map(([type, value]) => (
//                                 <p key={type}>
//                                   {type}: {Array.isArray(value) ? value.join(' / ') : value}
//                                 </p>
//                               ))}
//                             </div>
//                           </div>
//                           <div className="betting-input">
//                             <input
//                               type="number"
//                               placeholder="Enter betting amount"
//                               value={bettingAmounts[match.id] || ''}
//                               onChange={(e) => handleBettingAmountChange(match.id, e.target.value)}
//                               className="betting-amount"
//                             />
//                           </div>
//                           <button onClick={() => handleSelectMatch(match.id)}>Select Match</button>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No leagues available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Matches;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Bet.css';

// function Matches() {
//   const [matchesData, setMatchesData] = useState([]);
//   const [expandedLeagues, setExpandedLeagues] = useState({});
//   const [selectedMatches, setSelectedMatches] = useState({});
//   const [bettingAmounts, setBettingAmounts] = useState({});

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/matches');
//         console.log('Fetched matches data:', response.data);
//         setMatchesData(response.data);
//       } catch (error) {
//         console.error('Error fetching match data:', error);
//       }
//     };
//     fetchMatches();
//   }, []);

//   const toggleLeague = (leagueId) => {
//     setExpandedLeagues((prev) => ({
//       ...prev,
//       [leagueId]: !prev[leagueId],
//     }));
//   };

//   const handleBettingAmountChange = (matchId, amount) => {
//     setBettingAmounts((prev) => ({
//       ...prev,
//       [matchId]: amount,
//     }));
//   };

//   const handleSelectMatch = async (matchId) => {
//     try {
//       const bettingAmount = bettingAmounts[matchId];
//       if (!bettingAmount) {
//         alert('Please enter a betting amount.');
//         return;
//       }

//       await axios.post('http://localhost:5000/api/selected-matches', { userId: 1, matchId, bettingAmount });
//       setSelectedMatches((prev) => ({
//         ...prev,
//         [matchId]: true,
//       }));
//       alert('Match selected successfully with betting amount');
//     } catch (error) {
//       console.error('Error selecting match:', error);
//     }
//   };

//   // Function to format date and time
//   const formatDateTime = (isoString) => {
//     const date = new Date(isoString);
//     const formattedDate = date.toLocaleDateString(); // Format the date
//     const formattedTime = date.toLocaleTimeString(); // Format the time
//     return `${formattedDate} ${formattedTime}`; // Combine date and time
//   };

//   return (
//     <div className="container">
//       {/* <div className="tabs">
//         <button className="tab active">Matches</button>
//         <button className="tab">Competitions</button>
//         <button className="tab">Outrights</button>
//         <input type="text" placeholder="Search (Leagues, Teams/..." className="search-input" />
//       </div> */}
//       <div className="tabs">
//         <div className="tab-container">
//           <button className="tab active">Matches</button>
//           <input type="text" placeholder="Search (Leagues, Teams/..." className="search-input" />
//         </div>
//       </div>


//       <div className="league-list">
//         {matchesData.length > 0 ? (
//           matchesData.map((league) => (
//             <div
//               key={league.id}
//               className={`league-item ${expandedLeagues[league.id] ? 'expanded' : ''}`}
//               onClick={() => toggleLeague(league.id)}
//             >
//               <div className="league-header">
//                 {league.flag ? (
//                   <img
//                     src={`https://flagcdn.com/48x36/${league.flag.toLowerCase()}.png`}
//                     alt={league.flag}
//                     className="flag"
//                   />
//                 ) : (
//                   <span>No flag available</span>
//                 )}
//                 <span className="league-name">{league.name}</span>
//                 <span className="dropdown-icon">&#9662;</span>
//               </div>

//               {expandedLeagues[league.id] && (
//                 <div className="league-details">
//                   <ul className="match-list">
//                     {league.matches.map((match) => (
//                       <li key={match.id} className="match-item">
//                         <div className="match-info">
//                           <p>{Array.isArray(match.teams) ? match.teams.join(' vs ') : `${JSON.stringify(match.teams)}`}</p>
//                           <p>{formatDateTime(match.match_time)}</p> 
//                           <div className="odds-info">
//                             {match.odds && Object.entries(match.odds).map(([type, value]) => (
//                               <p key={type}>
//                                 {type}: {Array.isArray(value) ? value.join(' / ') : value}
//                               </p>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="betting-input">
//                           <input
//                             type="number"
//                             placeholder="Enter betting amount"
//                             value={bettingAmounts[match.id] || ''}
//                             onChange={(e) => handleBettingAmountChange(match.id, e.target.value)}
//                             onClick={(e) => e.stopPropagation()} 
//                             className="betting-amount"
//                           />
//                         </div>
//                         <button onClick={() => handleSelectMatch(match.id)}>Select Match</button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No leagues available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Matches;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Bet.css';

// function Matches() {
//   const [matchesData, setMatchesData] = useState([]);
//   const [expandedLeagues, setExpandedLeagues] = useState({});
//   const [selectedMatches, setSelectedMatches] = useState({});
//   const [bettingAmounts, setBettingAmounts] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/matches');
//         console.log('Fetched matches data:', response.data);
//         setMatchesData(response.data);
//       } catch (error) {
//         console.error('Error fetching match data:', error);
//       }
//     };
//     fetchMatches();
//   }, []);

//   const toggleLeague = (leagueId) => {
//     setExpandedLeagues((prev) => ({
//       ...prev,
//       [leagueId]: !prev[leagueId],
//     }));
//   };

//   const handleBettingAmountChange = (matchId, amount) => {
//     setBettingAmounts((prev) => ({
//       ...prev,
//       [matchId]: amount,
//     }));
//   };

//   const handleSelectMatch = async (matchId) => {
//     try {
//       const bettingAmount = bettingAmounts[matchId];
//       if (!bettingAmount) {
//         alert('Please enter a betting amount.');
//         return;
//       }

//       await axios.post('http://localhost:5000/api/selected-matches', { userId: 1, matchId, bettingAmount });
//       setSelectedMatches((prev) => ({
//         ...prev,
//         [matchId]: true,
//       }));
//       alert('Match selected successfully with betting amount');
//     } catch (error) {
//       console.error('Error selecting match:', error);
//     }
//   };

//   // Function to format date and time
//   const formatDateTime = (isoString) => {
//     const date = new Date(isoString);
//     const formattedDate = date.toLocaleDateString(); // Format the date
//     const formattedTime = date.toLocaleTimeString(); // Format the time
//     return `${formattedDate} ${formattedTime}`; // Combine date and time
//   };

//   // Filter leagues and matches based on the search term
//   const filteredLeagues = matchesData.filter((league) =>
//     league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     league.matches.some((match) =>
//       Array.isArray(match.teams)
//         ? match.teams.some((team) => team.toLowerCase().includes(searchTerm.toLowerCase()))
//         : (match.teams || '').toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   return (
//     <div className="container">
//       <div className="tabs">
//         <div className="tab-container">
//           <button className="tab active">Matches</button>
//           <input
//             type="text"
//             placeholder="Search (Leagues, Teams/..."
//             className="search-input"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="league-list">
//         {filteredLeagues.length > 0 ? (
//           filteredLeagues.map((league) => (
//             <div
//               key={league.id}
//               className={`league-item ${expandedLeagues[league.id] ? 'expanded' : ''}`}
//               onClick={() => toggleLeague(league.id)}
//             >
//               <div className="league-header">
//                 {league.flag ? (
//                   <img
//                     src={`https://flagcdn.com/48x36/${league.flag.toLowerCase()}.png`}
//                     alt={league.flag}
//                     className="flag"
//                   />
//                 ) : (
//                   <span>No flag available</span>
//                 )}
//                 <span className="league-name">{league.name}</span>
//                 <span className="dropdown-icon">&#9662;</span>
//               </div>

//               {expandedLeagues[league.id] && (
//                 <div className="league-details">
//                   <ul className="match-list">
//                     {league.matches.map((match) => (
//                       <li key={match.id} className="match-item">
//                         <div className="match-info">
//                           <p>
//                             {Array.isArray(match.teams) ? match.teams.join(' vs ') : `${JSON.stringify(match.teams)}`}
//                           </p>
//                           <p>{formatDateTime(match.match_time)}</p> 
//                           <div className="odds-info">
//                             {match.odds && Object.entries(match.odds).map(([type, value]) => (
//                               <p key={type}>
//                                 {type}: {Array.isArray(value) ? value.join(' / ') : value}
//                               </p>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="betting-input">
//                           <input
//                             type="number"
//                             placeholder="Enter betting amount"
//                             value={bettingAmounts[match.id] || ''}
//                             onChange={(e) => handleBettingAmountChange(match.id, e.target.value)}
//                             onClick={(e) => e.stopPropagation()} 
//                             className="betting-amount"
//                           />
//                         </div>
//                         <button onClick={() => handleSelectMatch(match.id)}>Select Match</button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No leagues available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Matches;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Bet.css';

function Matches() {
  const [matchesData, setMatchesData] = useState([]);
  const [expandedLeagues, setExpandedLeagues] = useState({});
  const [selectedMatches, setSelectedMatches] = useState({});
  const [bettingAmounts, setBettingAmounts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/matches');
        console.log('Fetched matches data:', response.data);
        setMatchesData(response.data);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };
    fetchMatches();
  }, []);

  const toggleLeague = (leagueId) => {
    setExpandedLeagues((prev) => ({
      ...prev,
      [leagueId]: !prev[leagueId],
    }));
  };

  const handleBettingAmountChange = (matchId, amount) => {
    setBettingAmounts((prev) => ({
      ...prev,
      [matchId]: amount,
    }));
  };

  // const handleSelectMatch = async (matchId) => {
  //   try {
  //     const bettingAmount = bettingAmounts[matchId];
  //     if (!bettingAmount) {
  //       alert('Please enter a betting amount.');
  //       return;
  //     }

  //     // Retrieve userId from localStorage
  //     const userId = localStorage.getItem('userId'); // Ensure userId is stored in localStorage
  //     if (!userId) {
  //       alert('User not logged in.');
  //       return;
  //     }

  //     await axios.post('http://localhost:5000/api/selected-matches', { userId, matchId, bettingAmount });
  //     setSelectedMatches((prev) => ({
  //       ...prev,
  //       [matchId]: true,
  //     }));
  //     alert('Match selected successfully with betting amount');
  //   } catch (error) {
  //     console.error('Error selecting match:', error);
  //   }
  // };


  const handleSelectMatch = async (matchId) => {
    try {
      const bettingAmount = bettingAmounts[matchId];
      if (!bettingAmount) {
        alert('Please enter a betting amount.');
        return;
      }
  
      // Retrieve userId from localStorage
      const userId = localStorage.getItem('user_id');
  
      if (!userId) {
        alert('User ID not found. Please log in again.');
        return;
      }
  
      // Check the type of userId to ensure it's a number
      console.log('User ID:', userId);  // Debugging statement
  
      await axios.post('http://localhost:5000/api/selected-matches', { userId: 1, matchId, bettingAmount });
      setSelectedMatches((prev) => ({
        ...prev,
        [matchId]: true,
      }));
      alert('Match selected successfully with betting amount');
    } catch (error) {
      console.error('Error selecting match:', error);
    }
  };
  


  // Function to format date and time
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const formattedDate = date.toLocaleDateString(); // Format the date
    const formattedTime = date.toLocaleTimeString(); // Format the time
    return `${formattedDate} ${formattedTime}`; // Combine date and time
  };

  // Filter leagues and matches based on the search term
  const filteredLeagues = matchesData.filter((league) =>
    league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    league.matches.some((match) =>
      Array.isArray(match.teams)
        ? match.teams.some((team) => team.toLowerCase().includes(searchTerm.toLowerCase()))
        : (match.teams || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container">
      <div className="tabs">
        <div className="tab-container">
          <button className="tab active">Matches</button>
          <input
            type="text"
            placeholder="Search (Leagues, Teams/... "
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="league-list">
        {filteredLeagues.length > 0 ? (
          filteredLeagues.map((league) => (
            <div
              key={league.id}
              className={`league-item ${expandedLeagues[league.id] ? 'expanded' : ''}`}
              onClick={() => toggleLeague(league.id)}
            >
              <div className="league-header">
                {league.flag ? (
                  <img
                    src={`https://flagcdn.com/48x36/${league.flag.toLowerCase()}.png`}
                    alt={league.flag}
                    className="flag"
                  />
                ) : (
                  <span>No flag available</span>
                )}
                <span className="league-name">{league.name}</span>
                <span className="dropdown-icon">&#9662;</span>
              </div>

              {expandedLeagues[league.id] && (
                <div className="league-details">
                  <ul className="match-list">
                    {league.matches.map((match) => (
                      <li key={match.id} className="match-item">
                        <div className="match-info">
                          <p>
                            {Array.isArray(match.teams) ? match.teams.join(' vs ') : `${JSON.stringify(match.teams)}`}
                          </p>
                          <p>{formatDateTime(match.match_time)}</p> 
                          <div className="odds-info">
                            {match.odds && Object.entries(match.odds).map(([type, value]) => (
                              <p key={type}>
                                {type}: {Array.isArray(value) ? value.join(' / ') : value}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="betting-input">
                          <input
                            type="number"
                            placeholder="Enter betting amount"
                            value={bettingAmounts[match.id] || ''}
                            onChange={(e) => handleBettingAmountChange(match.id, e.target.value)}
                            onClick={(e) => e.stopPropagation()} 
                            className="betting-amount"
                          />
                        </div>
                        <button onClick={() => handleSelectMatch(match.id)}>Select Match</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No leagues available.</p>
        )}
      </div>
    </div>
  );
}

export default Matches;




// // import React, { useState } from 'react';
// // import * as XLSX from 'xlsx';
// // import './ReportBetting.css';

// // const ReportBetting = () => {
// //   const [filter, setFilter] = useState({
// //     match: '',
// //     country: ''
// //   });

// //   const reportData = [
// //     { name: 'John Doe', amount: 10000, match: 'IND vs PAK', country: 'India', depositId: 'D1234' },
// //     { name: 'Jane Smith', amount: 15000, match: 'IND vs PAK', country: 'India', depositId: 'D1235' },
// //     { name: 'Mike Johnson', amount: 20000, match: 'IND vs PAK', country: 'Pakistan', depositId: 'D1236' },
// //     { name: 'Sara Wilson', amount: 5000, match: 'SL vs BAN', country: 'Sri Lanka', depositId: 'D1237' },
// //     { name: 'Tom Brown', amount: 7000, match: 'SL vs BAN', country: 'Bangladesh', depositId: 'D1238' },
// //     { name: 'Emily Davis', amount: 20000, match: 'AUS vs SA', country: 'Australia', depositId: 'D1239' },
// //     { name: 'James Wilson', amount: 25000, match: 'AUS vs SA', country: 'South Africa', depositId: 'D1240' },
// //     { name: 'Alice Johnson', amount: 12000, match: 'NZ vs ENG', country: 'New Zealand', depositId: 'D1241' },
// //     { name: 'Bob Smith', amount: 30000, match: 'NZ vs ENG', country: 'England', depositId: 'D1242' },
// //   ];

// //   const filteredData = reportData.filter(row => 
// //     (filter.match === '' || row.match.toLowerCase().includes(filter.match.toLowerCase())) &&
// //     (filter.country === '' || row.country.toLowerCase().includes(filter.country.toLowerCase()))
// //   );

// //   const handleExportToExcel = () => {
// //     const worksheet = XLSX.utils.json_to_sheet(filteredData);
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

// //     const date = new Date();
// //     const filename = `Betting_Report_${date.toISOString().slice(0, 10)}_${date.getHours()}_${date.getMinutes()}.xlsx`;

// //     // Handle file download differently for mobile devices
// //     if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
// //       // For mobile, open in a new window to trigger the download
// //       XLSX.writeFile(workbook, filename);
// //     } else {
// //       // For desktop, trigger download directly
// //       XLSX.writeFile(workbook, filename);
// //     }
// //   };

// //   return (
// //     <div className="report-betting">
// //       <h1>Betting Report</h1>
// //       <div className="filter-options">
// //         <input
// //           type="text"
// //           placeholder="Filter by match..."
// //           value={filter.match}
// //           onChange={(e) => setFilter({ ...filter, match: e.target.value })}
// //           className="filter-input"
// //         />
// //         <input
// //           type="text"
// //           placeholder="Filter by country..."
// //           value={filter.country}
// //           onChange={(e) => setFilter({ ...filter, country: e.target.value })}
// //           className="filter-input"
// //         />
// //         <button onClick={handleExportToExcel} className="download-button">Download Excel</button>
// //       </div>
// //       <div className="report-table">
// //         <table>
// //           <thead>
// //             <tr>
// //               <th>Name</th>
// //               <th>Amount</th>
// //               <th>Match</th>
// //               <th>Country</th>
// //               <th>Deposit ID</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredData.length > 0 ? (
// //               filteredData.map((row, index) => (
// //                 <tr key={index}>
// //                   <td>{row.name}</td>
// //                   <td>${row.amount.toLocaleString()}</td>
// //                   <td>{row.match}</td>
// //                   <td>{row.country}</td>
// //                   <td>{row.depositId}</td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="5">No data found</td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReportBetting;

// // import React, { useState } from 'react';
// // import * as XLSX from 'xlsx';
// // import './ReportBetting.css';

// // const ReportBetting = () => {
// //   const [filter, setFilter] = useState({ match: '', country: '' });
// //   const [reportData, setReportData] = useState([]);

// //   const fetchData = (url) => {
// //     fetch(url)
// //       .then(res => res.json())
// //       .then(data => setReportData(data))
// //       .catch(error => console.error('Error fetching data:', error));
// //   };

// //   const handleExportToExcel = () => {
// //     const filteredData = reportData.filter(row => 
// //       (filter.match === '' || row.match?.toLowerCase().includes(filter.match.toLowerCase())) &&
// //       (filter.country === '' || row.country?.toLowerCase().includes(filter.country.toLowerCase()))
// //     );

// //     const worksheet = XLSX.utils.json_to_sheet(filteredData);
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

// //     const date = new Date();
// //     const filename = `Betting_Report_${date.toISOString().slice(0, 10)}_${date.getHours()}_${date.getMinutes()}.xlsx`;

// //     XLSX.writeFile(workbook, filename);
// //   };

// //   return (
// //     <div className="report-betting">
// //       <h1>Betting Report</h1>
// //       <div className="filter-options">
// //         <input
// //           type="text"
// //           placeholder="Filter by match..."
// //           value={filter.match}
// //           onChange={(e) => setFilter({ ...filter, match: e.target.value })}
// //           className="filter-input"
// //         />
// //         <input
// //           type="text"
// //           placeholder="Filter by country..."
// //           value={filter.country}
// //           onChange={(e) => setFilter({ ...filter, country: e.target.value })}
// //           className="filter-input"
// //         />
// //         <button onClick={handleExportToExcel} className="download-button">Download Excel</button>
// //       </div>
// //       <div className="api-buttons">
// //         <button onClick={() => fetchData('http://localhost:5000/api/transactions')}>Fetch Transactions</button>
// //         <button onClick={() => fetchData('http://localhost:5000/api/bets')}>Fetch All Bets</button>
// //         <button onClick={() => fetchData('http://localhost:5000/api/bets/today')}>Fetch Today's Bets</button>
// //         <button onClick={() => fetchData('http://localhost:5000/api/withdrawals')}>Fetch Withdrawals</button>
// //       </div>
// //       <div className="report-table">
// //         <table>
// //           <thead>
// //             <tr>
// //               <th>Name</th>
// //               <th>Amount</th>
// //               <th>Match</th>
// //               <th>Country</th>
// //               <th>Deposit ID</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {reportData.length > 0 ? (
// //               reportData.map((row, index) => (
// //                 <tr key={index}>
// //                   <td>{row.username || row.name}</td>
// //                   <td>${row.bet_amount || row.amount || row.withdraw_amount || 0}</td>
// //                   <td>{row.bet_details || row.match || ''}</td>
// //                   <td>{row.country || ''}</td>
// //                   <td>{row.deposit_id || ''}</td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="5">No data found</td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReportBetting;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import * as XLSX from 'xlsx';
// // import './ReportBetting.css';

// // const Report = () => {
// //   const [activeTab, setActiveTab] = useState('transactions');
// //   const [data, setData] = useState([]);
// //   const [filter, setFilter] = useState('');

// //   useEffect(() => {
// //     fetchData();
// //   }, [activeTab]);

// //   const fetchData = () => {
// //     let url = '';
// //     if (activeTab === 'transactions') {
// //       url = 'http://localhost:5000/api/transactions';
// //     } else if (activeTab === 'withdrawals') {
// //       url = 'http://localhost:5000/api/withdrawals';
// //     } else if (activeTab === 'bets') {
// //       url = 'http://localhost:5000/api/bets';
// //     }
// //     else if (activeTab === 'today-bets') {
// //       url = 'http://localhost:5000/api/bets/today';
// //     }
// //     axios.get(url)
// //       .then(response => setData(response.data))
// //       .catch(error => console.error(`Error fetching ${activeTab}:`, error));
// //   };

// //   const handleExportToExcel = () => {
// //     if (data.length === 0) {
// //       alert('No data available to export');
// //       return;
// //     }
  
// //     const filteredData = data.filter(item => {
// //       return Object.values(item).some(val =>
// //         String(val).toLowerCase().includes(filter.toLowerCase())
// //       );
// //     });
  
// //     if (filteredData.length === 0) {
// //       alert('No matching data to export');
// //       return;
// //     }
  
// //     const worksheet = XLSX.utils.json_to_sheet(filteredData);
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
  
// //     const date = new Date();
// //     const filename = `Report_${activeTab}_${date.toISOString().slice(0, 10)}.xlsx`;
  
// //     XLSX.writeFile(workbook, filename);
// //   };
  

// //   return (
   
// //     <div className="report-container">
// //     <h1>Data Report</h1>
// //     <div className="tabs">
// //       <button onClick={() => setActiveTab('transactions')}>Transactions</button>
// //       <button onClick={() => setActiveTab('withdrawals')}>Withdrawals</button>
// //       <button onClick={() => setActiveTab('bets')}>Bets</button>
// //       <button onClick={() => setActiveTab('today-bets')}>Today Bets</button>
// //     </div>
  
// //     <input
// //       type="text"
// //       placeholder={`Filter ${activeTab}...`}
// //       value={filter}
// //       onChange={(e) => setFilter(e.target.value)}
// //       className="filter-input"
// //     />
  
// //     <button onClick={handleExportToExcel} className="download-button">Download Excel</button>
  
// //     <div className="table-container">  {/* Added this wrapper */}
// //       <table>
// //         <thead>
// //           <tr>
// //             {data.length > 0 && Object.keys(data[0]).map((key, index) => (
// //               <th key={index}>{key}</th>
// //             ))}
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {data.length > 0 ? (
// //             data.filter(item => {
// //               return Object.values(item).some(val =>
// //                 String(val).toLowerCase().includes(filter.toLowerCase())
// //               );
// //             }).map((item, index) => (
// //               <tr key={index}>
// //                 {Object.values(item).map((val, i) => (
// //                   <td key={i}>{val}</td>
// //                 ))}
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="100%">No data found</td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //   </div>
 
// //   );
// // };

// // export default Report;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import './ReportBetting.css';

// const Report = () => {
//   const [activeTab, setActiveTab] = useState('transactions');
//   const [data, setData] = useState([]);
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);

//   const fetchData = () => {
//     let url = '';
//     if (activeTab === 'transactions') {
//       url = 'http://localhost:5000/api/transactions';
//     } else if (activeTab === 'withdrawals') {
//       url = 'http://localhost:5000/api/withdrawals';
//     } else if (activeTab === 'bets') {
//       url = 'http://localhost:5000/api/bets';
//     } else if (activeTab === 'today-bets') {
//       url = 'http://localhost:5000/api/bets/today';
//     }
//     axios.get(url)
//       .then(response => setData(response.data))
//       .catch(error => console.error(`Error fetching ${activeTab}:`, error));
//   };

//   const calculateTotalAmount = () => {
//     // Filter data based on the current filter value
//     const filteredData = data.filter(item => {
//       return Object.values(item).some(val =>
//         String(val).toLowerCase().includes(filter.toLowerCase())
//       );
//     });

//     // Calculate the total amount from the filtered data
//     return filteredData.reduce((total, item) => {
//       // Assuming the amount field is named 'amount', change it based on your data structure
//       return total + (parseFloat(item.amount) || 0);
//     }, 0);
//   };

//   const handleExportToExcel = () => {
//     if (data.length === 0) {
//       alert('No data available to export');
//       return;
//     }

//     // Filter data for export based on the current filter value
//     const filteredData = data.filter(item => {
//       return Object.values(item).some(val =>
//         String(val).toLowerCase().includes(filter.toLowerCase())
//       );
//     });

//     if (filteredData.length === 0) {
//       alert('No matching data to export');
//       return;
//     }

//     // Calculate total amount to include in export
//     const totalAmount = calculateTotalAmount();

//     // Add the total amount as a new row in the exported data
//     const totalRow = { amount: 'Total', total: totalAmount }; // Change key based on your needs
//     const exportData = [...filteredData, totalRow];

//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

//     const date = new Date();
//     const filename = `Report_${activeTab}_${date.toISOString().slice(0, 10)}.xlsx`;

//     XLSX.writeFile(workbook, filename);
//   };

//   const totalAmount = calculateTotalAmount();

//   return (
//     <div className="report-container">
//       <h1>Data Report</h1>
//       <div className="tabs">
//         <button onClick={() => setActiveTab('transactions')}>Transactions</button>
//         <button onClick={() => setActiveTab('withdrawals')}>Withdrawals</button>
//         <button onClick={() => setActiveTab('bets')}>Bets</button>
//         <button onClick={() => setActiveTab('today-bets')}>Today Bets</button>
//       </div>

//       <input
//         type="text"
//         placeholder={`Filter ${activeTab}...`}
//         value={filter}
//         onChange={(e) => setFilter(e.target.value)}
//         className="filter-input"
//       />

//       <button onClick={handleExportToExcel} className="download-button">Download Excel</button>

//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               {data.length > 0 && Object.keys(data[0]).map((key, index) => (
//                 <th key={index}>{key}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.length > 0 ? (
//               data.filter(item => {
//                 return Object.values(item).some(val =>
//                   String(val).toLowerCase().includes(filter.toLowerCase())
//                 );
//               }).map((item, index) => (
//                 <tr key={index}>
//                   {Object.values(item).map((val, i) => (
//                     <td key={i}>{val}</td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="100%">No data found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Display total amount below the table */}
//       <h2>Total Amount: {totalAmount}</h2>
//     </div>
//   );
// };

// export default Report;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './ReportBetting.css';

const Report = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = () => {
    let url = '';
    switch (activeTab) {
      case 'transactions':
        url = 'http://localhost:5000/api/transactions';
        break;
      case 'withdrawals':
        url = 'http://localhost:5000/api/withdrawals';
        break;
      case 'bets':
        url = 'http://localhost:5000/api/bets';
        break;
      case 'today-bets':
        url = 'http://localhost:5000/api/bets/today';
        break;
      default:
        return; // If the tab is unknown, do nothing
    }

    axios.get(url)
      .then(response => setData(response.data))
      .catch(error => console.error(`Error fetching ${activeTab}:`, error));
  };

  const calculateTotalAmount = () => {
    // Ensure filter is a string
    const currentFilter = String(filter); // Convert to string if not already

    // Filter data based on the current filter value
    const filteredData = data.filter(item => {
      return Object.values(item).some(val =>
        String(val).toLowerCase().includes(currentFilter.toLowerCase())
      );
    });

    // Calculate the total amount from the filtered data
    return filteredData.reduce((total, item) => {
      const amountKey = getAmountKey(activeTab); // Get the key for the active tab
      return total + (parseFloat(item[amountKey]) || 0); // Calculate total
    }, 0);
  };

  const getAmountKey = (tab) => {
    switch (tab) {
      case 'transactions':
        return 'amount'; // Adjust this if your API response uses a different key
      case 'withdrawals':
        return 'withdrawal_amount'; // Adjust this if your API response uses a different key
      case 'bets':
      case 'today-bets':
        return 'bet_amount'; // Adjust this if your API response uses a different key
      default:
        return 'amount'; // Fallback to default key
    }
  };

  const handleExportToExcel = () => {
    if (data.length === 0) {
      alert('No data available to export');
      return;
    }

    const filteredData = data.filter(item => {
      return Object.values(item).some(val =>
        String(val).toLowerCase().includes(filter.toLowerCase())
      );
    });

    if (filteredData.length === 0) {
      alert('No matching data to export');
      return;
    }

    // Calculate total amount to include in export
    const totalAmount = calculateTotalAmount();

    // Add the total amount as a new row in the exported data
    const totalRow = { amount: 'Total', total: totalAmount }; // Adjust key based on your needs
    const exportData = [...filteredData, totalRow];

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const date = new Date();
    const filename = `Report_${activeTab}_${date.toISOString().slice(0, 10)}.xlsx`;

    XLSX.writeFile(workbook, filename);
  };

  const totalAmount = calculateTotalAmount(); // Total for the active tab

  return (
    <div className="report-container">
      <h1>Data Report</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab('transactions')}>Transactions</button>
        <button onClick={() => setActiveTab('withdrawals')}>Withdrawals</button>
        <button onClick={() => setActiveTab('bets')}>Bets</button>
        <button onClick={() => setActiveTab('today-bets')}>Today Bets</button>
      </div>

      <input
        type="text"
        placeholder={`Filter ${activeTab}...`}
        value={filter}
        onChange={(e) => setFilter(e.target.value)} // Ensure this updates correctly
        className="filter-input"
      />

      <button onClick={handleExportToExcel} className="download-button">Download Excel</button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {data.length > 0 && Object.keys(data[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.filter(item => {
                return Object.values(item).some(val =>
                  String(val).toLowerCase().includes(filter.toLowerCase())
                );
              }).map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((val, i) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="100%">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Display total amount */}
      <h2>Total Amount: {totalAmount}</h2>
    </div>
  );
};

export default Report;

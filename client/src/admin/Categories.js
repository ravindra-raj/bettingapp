// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { Pie } from 'react-chartjs-2';
// // // import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// // // import './Categories.css'; 
 
// // // ChartJS.register(Title, Tooltip, Legend, ArcElement);
 
// // // const Categories = () => {
// // //   const [categoryStats, setCategoryStats] = useState([]);
// // //   const [selectedCategory, setSelectedCategory] = useState(null);
 
// // //   useEffect(() => {
// // //     const fetchCategoryStats = async () => {
// // //       try {
// // //         const response = await axios.get('http://localhost:5000/api/admin/category-stats');
// // //         setCategoryStats(response.data.categoryStats || []);
// // //       } catch (error) {
// // //         console.error('Error fetching category stats:', error);
// // //       }
// // //     };
 
// // //     fetchCategoryStats();
// // //   }, []);
 
// // //   const handleCategorySelect = (category) => {
// // //     setSelectedCategory(category);
// // //   };
 
// // //   const chartData = {
// // //     labels: categoryStats.map((item) => item.category),
// // //     datasets: [
// // //       {
// // //         data: categoryStats.map((item) => item.total_amount),
// // //         backgroundColor: categoryStats.map((item) =>
// // //           item.category === selectedCategory ? '#FF6384' : '#36A2EB'
// // //         ),
// // //       },
// // //     ],
// // //   };
 
// // //   return (
// // //     <div className="category-stats-container">
// // //       <h1>Category Stats</h1>
// // //       <div className="category-card-container">
// // //         {categoryStats.length > 0 ? (
// // //           categoryStats.map((item, index) => (
// // //             <div
// // //               key={index}
// // //               className={`category-card ${item.category === selectedCategory ? 'selected' : ''}`}
// // //               onClick={() => handleCategorySelect(item.category)}
// // //             >
// // //               <h2 className="category-card-title">{item.category}</h2>
// // //               <p>Total Amount: ${Number(item.total_amount).toFixed(2)}</p>
// // //               <p>Percentage: {Number(item.percentage).toFixed(2)}%</p>
// // //             </div>
// // //           ))
// // //         ) : (
// // //           <div className="category-card">
// // //             <p>No data available</p>
// // //           </div>
// // //         )}
// // //       </div>
// // //       {selectedCategory && (
// // //         <div className="category-chart-container">
// // //           <Pie data={chartData} />
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };
 
// // // export default Categories;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Pie } from 'react-chartjs-2';
// // import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// // import './Categories.css';

// // ChartJS.register(Title, Tooltip, Legend, ArcElement);

// // const Categories = () => {
// //   const [categoryStats, setCategoryStats] = useState([]);
// //   const [selectedCategory, setSelectedCategory] = useState(null);
// //   const [dataType, setDataType] = useState('All'); // 'Income', 'Expense', or 'All'

// //   useEffect(() => {
// //     const fetchCategoryStats = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:5000/api/admin/category-stats');
// //         setCategoryStats(response.data.categoryStats || []);
// //       } catch (error) {
// //         console.error('Error fetching category stats:', error);
// //       }
// //     };

// //     fetchCategoryStats();
// //   }, []);

// //   const handleCategorySelect = (category) => {
// //     setSelectedCategory(category);
// //   };

// //   const handleDataTypeChange = (type) => {
// //     setDataType(type);
// //     setSelectedCategory(null); // Reset selected category when changing data type
// //   };

// //   const filteredStats = categoryStats.filter(item => {
// //     if (dataType === 'All') return true;
// //     return item.type === dataType;
// //   });

// //   const chartData = {
// //     labels: filteredStats.map((item) => item.category),
// //     datasets: [
// //       {
// //         data: filteredStats.map((item) => item.total_amount),
// //         backgroundColor: filteredStats.map((item) =>
// //           item.category === selectedCategory ? '#FF6384' : '#36A2EB'
// //         ),
// //       },
// //     ],
// //   };

// //   return (
// //     <div className="category-stats-container">
// //       <h1>Category Stats</h1>

// //       <select onChange={(e) => handleDataTypeChange(e.target.value)} value={dataType}>
// //         <option value="All">All</option>
// //         <option value="income">Income</option>
// //         <option value="expense">Expense</option>
// //       </select>

// //       <div className="category-card-container">
// //         {filteredStats.length > 0 ? (
// //           filteredStats.map((item, index) => (
// //             <div
// //               key={index}
// //               className={`category-card ${item.category === selectedCategory ? 'selected' : ''}`}
// //               onClick={() => handleCategorySelect(item.category)}
// //             >
// //               <h2 className="category-card-title">{item.category}</h2>
// //               <p>Total Amount: ${Number(item.total_amount).toFixed(2)}</p>
// //               <p>Percentage: {Number(item.percentage).toFixed(2)}%</p>
// //             </div>
// //           ))
// //         ) : (
// //           <div className="category-card">
// //             <p>No data available</p>
// //           </div>
// //         )}
// //       </div>

// //       {selectedCategory && (
// //         <div className="category-chart-container">
// //           <Pie data={chartData} />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Categories;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import './Categories.css';

// ChartJS.register(Title, Tooltip, Legend, ArcElement);

// const Categories = () => {
//   const [categoryStats, setCategoryStats] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [dataType, setDataType] = useState('All'); // 'Income', 'Expense', or 'All'
//   const [totalStats, setTotalStats] = useState({ income: 0, expense: 0 });

//   useEffect(() => {
//     const fetchCategoryStats = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/admin/category-stats');
//         const stats = response.data.categoryStats || [];
//         setCategoryStats(stats);
//         calculateTotalStats(stats);
//       } catch (error) {
//         console.error('Error fetching category stats:', error);
//       }
//     };

//     fetchCategoryStats();
//   }, []);

//   const calculateTotalStats = (stats) => {
//     const incomeTotal = stats
//       .filter(item => item.type === 'income')
//       .reduce((total, item) => total + parseFloat(item.total_amount), 0);
//     const expenseTotal = stats
//       .filter(item => item.type === 'expense')
//       .reduce((total, item) => total + parseFloat(item.total_amount), 0);

//     setTotalStats({ income: incomeTotal, expense: expenseTotal });
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleDataTypeChange = (type) => {
//     setDataType(type);
//     setSelectedCategory(null); // Reset selected category when changing data type
//   };

//   const filteredStats = categoryStats.filter(item => {
//     if (dataType === 'All') return true;
//     return item.type === dataType;
//   });

//   const incomeStats = categoryStats.filter(item => item.type === 'income');
//   const expenseStats = categoryStats.filter(item => item.type === 'expense');

//   const getChartData = (stats) => ({
//     labels: stats.map((item) => item.category),
//     datasets: [
//       {
//         data: stats.map((item) => item.total_amount),
//         backgroundColor: stats.map((item) =>
//           item.category === selectedCategory ? '#FF6384' : '#36A2EB'
//         ),
//       },
//     ],
//   });

//   return (
//     <div className="category-stats-container">
//       <h1>Category Stats</h1>

//       <select onChange={(e) => handleDataTypeChange(e.target.value)} value={dataType}>
//         <option value="All">All</option>
//         <option value="income">Income</option>
//         <option value="expense">Expense</option>
//       </select>

//       {dataType === 'All' && (
//         <div className="total-stats">
//           <h2>Income and Expense Totals</h2>
//           {/* <p>Total Income: ${totalStats.income.toFixed(2)}</p>
//           <p>Total Expense: ${totalStats.expense.toFixed(2)}</p> */}
//         </div>
//       )}

//       {dataType === 'income' && <h1>Income</h1>}
//       {dataType === 'expense' && <h1>Expense</h1>}

//       <div className="category-card-container">
//         {filteredStats.length > 0 ? (
//           filteredStats.map((item, index) => (
//             <div
//               key={index}
//               className={`category-card ${item.category === selectedCategory ? 'selected' : ''}`}
//               onClick={() => handleCategorySelect(item.category)}
//             >
//               <h2 className="category-card-title">{item.category}</h2>
//               <p>Total Amount: ${Number(item.total_amount).toFixed(2)}</p>
//               <p>Percentage: {Number(item.percentage).toFixed(2)}%</p>
//             </div>
//           ))
//         ) : (
//           <div className="category-card">
//             <p>No data available</p>
//           </div>
//         )}
//       </div>

//       {dataType === 'All' && (
//         <>
//           <h2>Income Categories</h2>
//           <div className="category-chart-container">
//             <Pie data={getChartData(incomeStats)} />
//           </div>
//           <h2>Expense Categories</h2>
//           <div className="category-chart-container">
//             <Pie data={getChartData(expenseStats)} />
//           </div>
//         </>
//       )}

//       {dataType !== 'All' && (
//         <div className="category-chart-container">
//           <Pie data={getChartData(filteredStats)} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Categories;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './Categories.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Categories = () => {
  const [categoryStats, setCategoryStats] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dataType, setDataType] = useState('All'); // 'Income', 'Expense', or 'All'
  const [totalStats, setTotalStats] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/category-stats');
        const stats = response.data.categoryStats || [];
        setCategoryStats(stats);
        calculateTotalStats(stats);
      } catch (error) {
        console.error('Error fetching category stats:', error);
      }
    };

    fetchCategoryStats();
  }, []);

  const calculateTotalStats = (stats) => {
    const incomeTotal = stats
      .filter(item => item.type === 'income')
      .reduce((total, item) => total + parseFloat(item.total_amount), 0);
    const expenseTotal = stats
      .filter(item => item.type === 'expense')
      .reduce((total, item) => total + parseFloat(item.total_amount), 0);

    setTotalStats({ income: incomeTotal, expense: expenseTotal });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleDataTypeChange = (type) => {
    setDataType(type);
    setSelectedCategory(null); // Reset selected category when changing data type
  };

  const filteredStats = categoryStats.filter(item => {
    if (dataType === 'All') return true;
    return item.type === dataType;
  });

  const incomeStats = categoryStats.filter(item => item.type === 'income');
  const expenseStats = categoryStats.filter(item => item.type === 'expense');

  const getChartData = (stats) => ({
    labels: stats.map((item) => item.category),
    datasets: [
      {
        data: stats.map((item) => item.total_amount),
        backgroundColor: stats.map((item) =>
          item.category === selectedCategory ? '#FF6384' : '#36A2EB'
        ),
      },
    ],
  });

  const getComparisonChartData = () => ({
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [totalStats.income, totalStats.expense],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  });

  return (
    <div className="category-stats-container">
      <h1>Category Stats</h1>

      <select onChange={(e) => handleDataTypeChange(e.target.value)} value={dataType}>
        <option value="All">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {dataType === 'All' && (
        <>
          <div className="total-stats">
            <h2>Income and Expense Comparison</h2>
             <p>Total Income: {totalStats.income.toFixed(2)}</p>
            <p>Total Expense: {totalStats.expense.toFixed(2)}</p>
            <div className="category-chart-container">
              <Pie data={getComparisonChartData()} />
            </div>
          </div>

          <h2>Income Categories</h2>
          <div className="category-chart-container">
            <Pie data={getChartData(incomeStats)} />
          </div>
          <div className="category-card-container">
            {incomeStats.map((item, index) => (
              <div
                key={index}
                className={`category-card ${item.category === selectedCategory ? 'selected' : ''}`}
                onClick={() => handleCategorySelect(item.category)}
              >
                <h2 className="category-card-title">{item.category}</h2>
                <p>Total Amount: ${Number(item.total_amount).toFixed(2)}</p>
                <p>Percentage: {Number(item.percentage).toFixed(2)}%</p>
              </div>
            ))}
          </div>

          <h2>Expense Categories</h2>
          <div className="category-chart-container">
            <Pie data={getChartData(expenseStats)} />
          </div>
          <div className="category-card-container">
            {expenseStats.map((item, index) => (
              <div
                key={index}
                className={`category-card ${item.category === selectedCategory ? 'selected' : ''}`}
                onClick={() => handleCategorySelect(item.category)}
              >
                <h2 className="category-card-title">{item.category}</h2>
                <p>Total Amount: ${Number(item.total_amount).toFixed(2)}</p>
                <p>Percentage: {Number(item.percentage).toFixed(2)}%</p>
              </div>
            ))}
          </div>
        </>
      )}

      {dataType !== 'All' && (
        <>
          <h1>{dataType.charAt(0).toUpperCase() + dataType.slice(1)}</h1>
          <div className="category-card-container">
            {filteredStats.length > 0 ? (
              filteredStats.map((item, index) => (
                <div
                  key={index}
                  className={`category-card ${item.category === selectedCategory ? 'selected' : ''}`}
                  onClick={() => handleCategorySelect(item.category)}
                >
                  <h2 className="category-card-title">{item.category}</h2>
                  <p>Total Amount: ${Number(item.total_amount).toFixed(2)}</p>
                  <p>Percentage: {Number(item.percentage).toFixed(2)}%</p>
                </div>
              ))
            ) : (
              <div className="category-card">
                <p>No data available</p>
              </div>
            )}
          </div>
          <div className="category-chart-container">
            <Pie data={getChartData(filteredStats)} />
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;

// import React, { useEffect, useState } from 'react';
// import './Dashboard.css';
// import { Bar, Pie } from 'react-chartjs-2';

// const Dashboard = () => {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [activeUsers, setActiveUsers] = useState(0);
//   const [totalAdmins, setTotalAdmins] = useState(0);
//   const [monthlyData, setMonthlyData] = useState([]);
//   const [recentUsers, setRecentUsers] = useState([]);
//   const [genderData, setGenderData] = useState({ male: 0, female: 0, other: 0 });

//   useEffect(() => {
//     // Fetch the total users, active users, total admins, monthly data, and gender data from your API
//     // Example:
//     // fetch('/api/dashboard-data')
//     //   .then(res => res.json())
//     //   .then(data => {
//     //     setTotalUsers(data.totalUsers);
//     //     setActiveUsers(data.activeUsers);
//     //     setTotalAdmins(data.totalAdmins);
//     //     setMonthlyData(data.monthlyData);
//     //     setRecentUsers(data.recentUsers);
//     //     setGenderData(data.genderData);
//     //   });

//     // Temporary static data
//     setTotalUsers(120);
//     setActiveUsers(80);
//     setTotalAdmins(5);
//     setMonthlyData([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]);
//     setRecentUsers([
//       { name: 'John Doe', date: '2024-08-20', mobile: '123-456-7890' },
//       { name: 'Jane Smith', date: '2024-08-19', mobile: '234-567-8901' },
//       { name: 'Mike Johnson', date: '2024-08-18', mobile: '345-678-9012' },
//       { name: 'Sara Wilson', date: '2024-08-17', mobile: '456-789-0123' },
//       { name: 'Tom Brown', date: '2024-08-16', mobile: '567-890-1234' },
//     ]);
//     setGenderData({ male: 70, female: 45, other: 5 });
//   }, []);

//   const chartData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//     datasets: [
//       {
//         label: 'User Registrations',
//         data: monthlyData,
//         backgroundColor: '#007bff',
//       },
//     ],
//   };

//   const pieData = {
//     labels: ['Male', 'Female', 'Other'],
//     datasets: [
//       {
//         data: [genderData.male, genderData.female, genderData.other],
//         backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
//       },
//     ],
//   };

//   return (
//     <div className="dashboard">
//       <div className="cards">
//         <div className="card">
//           <h3>Total Users</h3>
//           <p>{totalUsers}</p>
//         </div>
//         <div className="card">
//           <h3>Active Users</h3>
//           <p>{activeUsers}</p>
//         </div>
//         <div className="card">
//           <h3>Total Admins</h3>
//           <p>{totalAdmins}</p>
//         </div>
//       </div>

//       <div className="chart">
//         <Bar data={chartData} />
//       </div>

//       <div className="pie-chart">
//         <h3>User Gender Distribution</h3>
//         <Pie data={pieData} />
//       </div>

//       <div className="recent-users">
//         <h3>Last 5 Registered Users</h3>
//         <ul>
//           {recentUsers.map((user, index) => (
//             <li key={index}>
//               <span>{user.date}</span> - <span>{user.name}</span> - <span>{user.mobile}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useEffect, useState } from 'react';
// import './Dashboard.css';
// import { Bar, Pie } from 'react-chartjs-2';
// import { HiUserGroup } from "react-icons/hi";
// const Dashboard = () => {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalAdmins, setTotalAdmins] = useState(0);
//   const [monthlyData, setMonthlyData] = useState({ labels: [], datasets: [] });
//   const [recentUsers, setRecentUsers] = useState([]);
//   // const [genderData, setGenderData] = useState({ male: 0, female: 0, other: 0 });
//   const [activeUsers, setActiveUsers] = useState(0);

//   useEffect(() => {
//     // Fetch total user and admin counts
//     fetch('http://localhost:5000/api/admin/total-user')
//       .then(res => res.json())
//       .then(data => {
//         if (data) {
//           setTotalUsers(data.User || 0); // Set total user count
//           setTotalAdmins(data.Admin || 0); // Set total admin count
//         } else {
//           console.error('Invalid response for total user/admin counts:', data);
//         }
//       })
//       .catch(error => console.error('Error fetching total user/admin counts:', error));

//     // Fetch monthly user registration data
//     fetch('http://localhost:5000/api/users-by-month')
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data)) {
//           const months = data.map(item => item.month);
//           const userCounts = data.map(item => item.user_count);
//           setMonthlyData({
//             labels: months,
//             datasets: [{
//               label: 'User Registrations',
//               data: userCounts,
//               backgroundColor: '#007bff',
//             }],
//           });
//         } else {
//           console.error('Invalid response for monthly user data:', data);
//         }
//       })
//       .catch(error => console.error('Error fetching monthly user data:', error));

//     // Fetch the last 5 registered users
//     fetch('http://localhost:5000/api/admin/last5users')
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data.last5Users)) {
//           setRecentUsers(data.last5Users);
//         } else {
//           console.error('Invalid response for recent users:', data);
//         }
//       })
//       .catch(error => console.error('Error fetching recent users:', error));

//     // Example data for gender distribution (could be fetched from another API)
//     setActiveUsers(80);
//     // setGenderData({ male: 70, female: 45, other: 5 });
//   }, []);

//   return (
//     <div className="dashboard">
//       <div className="cards">
//         <div className="card">
//           <h3>Total Users</h3>
//           <HiUserGroup className='Cards-icons' />
//           <p>{totalUsers}</p>
//         </div>
//         <div className="card">
//           <h3>Active Users</h3>
//           <HiUserGroup className='Cards-icons' />
//           <p>{activeUsers}</p>
//         </div>
//         <div className="card">
//           <h3>Total Admins</h3>
//           <HiUserGroup className='Cards-icons' />
//           <p>{totalAdmins}</p>
//         </div>
//       </div>

//       <div className="chart">
//         <Bar data={monthlyData} />
//       </div>

//       {/* <div className="pie-chart">
//         <h3>User Gender Distribution</h3>
//         <Pie data={{
//           labels: ['Male', 'Female', 'Other'],
//           datasets: [{
//             data: [genderData.male, genderData.female, genderData.other],
//             backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
//           }],
//         }} />
//       </div> */}

//       <div className="recent-users">
//         <h3>Last 5 Registered Users</h3>
//         <ul>
//           {recentUsers.map((user, index) => (
//             <li key={index}>
//               <span>{new Date(user.created_at).toLocaleDateString()}</span> - <span>{user.username}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Bar, Pie } from 'react-chartjs-2';
import { HiUserGroup } from "react-icons/hi";
import { Chart, registerables } from 'chart.js';

// Register all components including scales, controllers, elements, and plugins
Chart.register(...registerables);

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [monthlyData, setMonthlyData] = useState({ labels: [], datasets: [] });
  const [recentUsers, setRecentUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    // Fetch total user and admin counts
    fetch('http://localhost:5000/api/admin/total-user')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setTotalUsers(data.User || 0); // Set total user count
          setTotalAdmins(data.Admin || 0); // Set total admin count
        } else {
          console.error('Invalid response for total user/admin counts:', data);
        }
      })
      .catch(error => console.error('Error fetching total user/admin counts:', error));

    // Fetch monthly user registration data
    fetch('http://localhost:5000/api/users-by-month')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const months = data.map(item => item.month);
          const userCounts = data.map(item => item.user_count);
          setMonthlyData({
            labels: months,
            datasets: [{
              label: 'User Registrations',
              data: userCounts,
              backgroundColor: '#007bff',
            }],
          });
        } else {
          console.error('Invalid response for monthly user data:', data);
        }
      })
      .catch(error => console.error('Error fetching monthly user data:', error));

    // Fetch the last 5 registered users
    fetch('http://localhost:5000/api/admin/last5users')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.last5Users)) {
          setRecentUsers(data.last5Users);
        } else {
          console.error('Invalid response for recent users:', data);
        }
      })
      .catch(error => console.error('Error fetching recent users:', error));

    setActiveUsers(80);
  }, []);

  return (
    <div className="dashboard1">
      <div className="cards">
        <div className="card">
          <h3>Total Users</h3>
          <HiUserGroup className='Cards-icons' />
          <p>{totalUsers}</p>
        </div>
        <div className="card">
          <h3>Active Users</h3>
          <HiUserGroup className='Cards-icons' />
          <p>{activeUsers}</p>
        </div>
        <div className="card">
          <h3>Total Admins</h3>
          <HiUserGroup className='Cards-icons' />
          <p>{totalAdmins}</p>
        </div>
      </div>

      <div className="chart">
        <Bar data={monthlyData} />
      </div>

      <div className="recent-users">
        <h3>Last 5 Registered Users</h3>
        <ul>
          {recentUsers.map((user, index) => (
            <li key={index}>
              <span>{new Date(user.created_at).toLocaleDateString()}</span> - <span>{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

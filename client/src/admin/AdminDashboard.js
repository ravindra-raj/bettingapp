// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AdminDashboard.css';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
// import { FaUser, FaUserShield, FaUserCog } from "react-icons/fa";
 
// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
 
// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [userCountsByRole, setUserCountsByRole] = useState([]);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [monthlyData, setMonthlyData] = useState({ labels: [], data: [] });
//   const [last5Users, setLast5Users] = useState([]);
 
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/admin')
//       .then(response => {
//         setUsers(response.data.users);
//         setUserCountsByRole(response.data.userCountsByRole);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the data!', error);
//       });
 
//     axios.get('http://localhost:5000/api/users-by-month')
//       .then(response => {
//         const months = response.data.map(item => item.month);
//         const userCounts = response.data.map(item => item.user_count);
//         setMonthlyData({
//           labels: months,
//           data: userCounts
//         });
//       })
//       .catch(error => {
//         console.error('There was an error fetching the monthly data!', error);
//       });
 
//     axios.get('http://localhost:5000/api/admin/last5users')
//       .then(response => {
//         setLast5Users(response.data.last5Users);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the last 5 users!', error);
//       });
//   }, []);
 
//   const roleIcons = {
//     admin: <FaUserShield />,
//     user: <FaUser />,
//     moderator: <FaUserCog />
//   };
 
//   const handleCardClick = (role) => {
//     setSelectedRole(selectedRole === role ? null : role);
//   };
 
//   const handleUserClick = (user) => {
//     setSelectedUser(selectedUser === user ? null : user);
//   };
 
//   const filteredUsers = selectedRole ? users.filter(user => user.role === selectedRole) : [];
 
//   const chartData = {
//     labels: monthlyData.labels,
//     datasets: [
//       {
//         label: 'User Registrations',
//         data: monthlyData.data,
//         backgroundColor: '#3f51b5',
//         borderColor: '#000',
//         borderWidth: 1,
//       },
//     ],
//   };
 
//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             let label = context.dataset.label || '';
//             if (label) {
//               label += ': ';
//             }
//             if (context.parsed.y !== null) {
//               label += context.parsed.y;
//             }
//             return label;
//           }
//         }
//       }
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Month',
//         },
//         grid: {
//           display: true,
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'User Count',
//         },
//         grid: {
//           display: true,
//         },
//         ticks: {
//           beginAtZero: true,
//         },
//       },
//     },
//   };
 
//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>
//       <div className="admin-user-counts">
//         {userCountsByRole.map(roleCount => (
//           <div className="admin-card" key={roleCount.role} onClick={() => handleCardClick(roleCount.role)}>
//             <div className="admin-card-icon">
//               {roleIcons[roleCount.role] || <FaUser />}
//             </div>
//             <div className="admin-card-content">
//               <h3>{roleCount.role}</h3>
//               <p>{roleCount.count}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       {selectedRole && (
//         <>
//            <h2>{`List of users: ${selectedRole}`}</h2>
//           <div className='admin-listuser'>
//             {filteredUsers.map(user => (
//               <div key={user.id} onClick={() => handleUserClick(user)} className="admin-user">
//                 <span>{user.email}</span>
//                 {selectedUser === user && (
//                   <div className='admin-login-history'>
//                     <h4>Login History</h4>
//                     <div>
//                       {user.login_history.map(login => (
//                         <div key={login.id}><span>login time:</span> {new Date(login.login_time).toLocaleString()}<br/><span>session_duration:</span> {login.session_duration}<br/><span>logout_time:</span> {new Date(login.logout_time).toLocaleString()}</div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//       <div className="admin-chart-and-users">
//         <div className="admin-chart-container">
//           <h2 className='admin-user'>Monthly User Registrations</h2>
//           <div className="admin-bar-chart">
//             <Bar data={chartData} options={chartOptions} />
//           </div>
//         </div>
//         <div className="admin-last-users">
//           <h2>Last 5 Users</h2>
//           <div className="admin-last-users-card">
//             {last5Users.map(user => (
//               <div key={user.id} className="admin-user-details">
//                 <p><strong>{user.username}</strong></p>
//                 <p>{new Date(user.created_at).toLocaleDateString()}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { FaUser, FaUserShield, FaUserCog } from "react-icons/fa";
 
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,  // Register the category scale here
  LinearScale
);

 
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [userCountsByRole, setUserCountsByRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [monthlyData, setMonthlyData] = useState({ labels: [], data: [] });
  const [last5Users, setLast5Users] = useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin')
      .then(response => {
        setUsers(response.data.users);
        setUserCountsByRole(response.data.userCountsByRole);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
 
    axios.get('http://localhost:5000/api/users-by-month')
      .then(response => {
        const months = response.data.map(item => item.month);
        const userCounts = response.data.map(item => item.user_count);
        setMonthlyData({
          labels: months,
          data: userCounts
        });
      })
      .catch(error => {
        console.error('There was an error fetching the monthly data!', error);
      });
 
    axios.get('http://localhost:5000/api/admin/last5users')
      .then(response => {
        setLast5Users(response.data.last5Users);
      })
      .catch(error => {
        console.error('There was an error fetching the last 5 users!', error);
      });
  }, []);
 
  const roleIcons = {
    admin: <FaUserShield />,
    user: <FaUser />,
    moderator: <FaUserCog />
  };
 
  const handleCardClick = (role) => {
    setSelectedRole(selectedRole === role ? null : role);
  };
 
  const handleUserClick = (user) => {
    setSelectedUser(selectedUser === user ? null : user);
  };
 
  const filteredUsers = selectedRole ? users.filter(user => user.role === selectedRole) : [];
 
  const chartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'User Registrations',
        data: monthlyData.data,
        backgroundColor: '#3f51b5',
        borderColor: '#000',
        borderWidth: 1,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'category', // Ensure the category scale is explicitly used for the x-axis
        title: {
          display: true,
          text: 'Month',
        },
        grid: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
          text: 'User Count',
        },
        grid: {
          display: true,
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };
  
  // const chartOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     tooltip: {
  //       callbacks: {
  //         label: function(context) {
  //           let label = context.dataset.label || '';
  //           if (label) {
  //             label += ': ';
  //           }
  //           if (context.parsed.y !== null) {
  //             label += context.parsed.y;
  //           }
  //           return label;
  //         }
  //       }
  //     }
  //   },
  //   scales: {
  //     x: {
  //       title: {
  //         display: true,
  //         text: 'Month',
          
  //       },
  //       grid: {
  //         display: true,
  //       },
  //     },
  //     y: {
  //       title: {
  //         display: true,
  //         text: 'User Count',
  //       },
  //       grid: {
  //         display: true,
  //       },
  //       ticks: {
  //         beginAtZero: true,
  //       },
  //     },
  //   },
  // };
 
  return (
    
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-user-counts">
        {userCountsByRole.map(roleCount => (
          <div className="admin-card" key={roleCount.role} onClick={() => handleCardClick(roleCount.role)}>
            <div className="admin-card-icon">
              {roleIcons[roleCount.role] || <FaUser />}
            </div>
            <div className="admin-card-content">
              <h3>{roleCount.role}</h3>
              <p>{roleCount.count}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedRole && (
        <>
           <h2>{`List of users: ${selectedRole}`}</h2>
          <div className='admin-listuser'>
            {filteredUsers.map(user => (
              <div key={user.id} onClick={() => handleUserClick(user)} className="admin-user">
                <span>{user.email}</span>
                {selectedUser === user && (
                  <div className='admin-login-history'>
                    <h4>Login History</h4>
                    <div>
                      {user.login_history.map(login => (
                        <div key={login.id}><span>login time:</span> {new Date(login.login_time).toLocaleString()}<br/><span>session_duration:</span> {login.session_duration}<br/><span>logout_time:</span> {new Date(login.logout_time).toLocaleString()}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      <div className="admin-chart-and-users">
        <div className="admin-chart-container">
          <h2 className='admin-user'>Monthly User Registrations</h2>
          <div className="admin-bar-chart">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="admin-last-users">
          <h2>Last 5 Users</h2>
          <div className="admin-last-users-card">
            {last5Users.map(user => (
              <div key={user.id} className="admin-user-details">
                <p><strong>{user.username}</strong></p>
                <p>{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default AdminDashboard;

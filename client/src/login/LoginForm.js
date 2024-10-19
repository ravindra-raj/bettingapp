// import React, {useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Button, Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
// import './login.css'
// const Loginform = () => {
//   const [loginUsername, setLoginUsername] = useState('');
//   const [loginPassword, setLoginPassword] = useState('');
//   const [loginError, setLoginError] = useState('');
//   const navigate = useNavigate();
//   const [setManagingAdminDetails] = useState(null);

//   useEffect(() => {
//     const storedUsername = localStorage.getItem('rememberedUsername');
//     const storedPassword = localStorage.getItem('rememberedPassword');
//     const storedPasswordExpiration = localStorage.getItem('rememberedPasswordExpiration');

//     if (storedUsername && storedPassword && storedPasswordExpiration) {
//       const expirationDate = new Date(storedPasswordExpiration);
//       const now = new Date();

//       if (now < expirationDate) {
//         setLoginUsername(storedUsername);
//         setLoginPassword(storedPassword);
//       } else {
//         localStorage.removeItem('rememberedUsername');
//         localStorage.removeItem('rememberedPassword');
//         localStorage.removeItem('rememberedPasswordExpiration');
//       }
//     }
//   }, []);

//   const handleLogin = async () => {
//     try {
//       const loginTime = new Date().toLocaleString(); // Get current time in a human-readable format
//       const sessionDuration = calculateSessionDuration(); // Calculate session duration
//       localStorage.setItem('sessionStart', new Date().getTime()); // Store session start time
//       const response = await axios.post('http://localhost:5000/api/login', { username: loginUsername, password: loginPassword, loginTime: loginTime, sessionDuration: sessionDuration  });
//       const user = response.data;

//       if (user) {
//         const role = user.role;
//         const userId = user.adminID;
//         alert(`Welcome, ${loginUsername}!`);
//         const rememberMeCheckbox = document.getElementById('rememberMeCheckbox');
//         if (rememberMeCheckbox.checked) {
//           const expirationDate = new Date();
//           expirationDate.setDate(expirationDate.getDate() + 7); // Set expiration date to 7 days from now
//           localStorage.setItem('rememberedUsername', loginUsername);
//           localStorage.setItem('rememberedPassword', loginPassword);
//           localStorage.setItem('rememberedPasswordExpiration', expirationDate);
//         } else {
//           localStorage.removeItem('rememberedUsername');
//           localStorage.removeItem('rememberedPassword');
//           localStorage.removeItem('rememberedPasswordExpiration');
//         }
//         localStorage.setItem('username', loginUsername);
//         localStorage.setItem('adminID', userId);
//         console.log('Username stored in localStorage:', loginUsername); // Add this console log
//         localStorage.setItem('loginTime', new Date().getTime());
//         localStorage.setItem('sessionDuration', calculateSessionDuration());
//         localStorage.setItem('userData', JSON.stringify(user));
//         axios.get(`http://localhost:5000/api/bet/details/${loginUsername}`)
//         .then(res => {
//             console.log('Managing Admin Details:', res.data);
//             setManagingAdminDetails(res.data);
//         })
//         .catch(err => {
//             console.error('Error fetching managing admin details:', err);
//         });


//         switch (role) {
//             case 'Admin':
//               navigate(`/api/adminuserdetails/${userId}`);
//               break;
//           default:
//             navigate(`/api/userdetails/${userId}`);
//             break;
//         }

//         navigateToDashboard(role);
//       } else {
//         setLoginError('Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setLoginError('UserName OR Password Incorrect. Please check once..');

//     }
//   };

//   const navigateToDashboard = (role) => {
//     switch (role) {
//       case 'Admin':
//         window.location.replace('http://localhost:3000/Admin');
//         break;
//       default:
//         window.location.replace('http://localhost:3000/User');
//         break;
//     }
//   };

//   const calculateSessionDuration = () => {
//     const sessionStart = localStorage.getItem('sessionStart');
//     if (sessionStart) {
//       const currentTime = new Date().getTime();
//       const sessionDuration = (currentTime - parseInt(sessionStart)) / (1000 * 60); // Convert milliseconds to minutes
//       return sessionDuration.toFixed(2);
//     }
//     return 0;
//   };

//   return (
//       <Box className="modal-box">
//   <div className="modal-header">
//     <Typography id="login-modal-title" variant="h6" component="h2">
//       Login
//     </Typography>
//   </div>

//   <div className="logininput-box">
//           <input type="text" className="logininput" placeholder="Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
//         </div>
//         <div className="logininput-box">
//           <input className="logininput" type='password' placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
//           <label className="password-icon" style={{color:'black'}} >
//           </label>
//         </div>
//         {loginError && <p className="error-message">{loginError}</p>}

//   <input placeholder="Username" type="text" />
//   <input placeholder="Password" type="password" />

//   <FormControlLabel
//     control={<Checkbox />}
//     label="Remember Username"
//     className="modal-remember-checkbox"
//   />
//   <Button variant="contained" onClick={handleLogin} color="primary" fullWidth>
//     Login
//   </Button>

//   <div className="modal-footer">
//     <Link to="/forgot-password" className="forgot-link">
//       Can't login?
//     </Link>
//     <button
//       variant="outlined"
//       color="secondary"
//       fullWidth
//       className="join-now-button"
//     >
//       JOIN NOW
//     </button>
//   </div>
//   Session Duration: {calculateSessionDuration()} minutes
// </Box>
//   );
// };

// export default Loginform;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
import './login.css';

const Loginform = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const [managingAdminDetail, setManagingAdminDetails] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('rememberedUsername');
    const storedPassword = localStorage.getItem('rememberedPassword');
    const storedPasswordExpiration = localStorage.getItem('rememberedPasswordExpiration');

    if (storedUsername && storedPassword && storedPasswordExpiration) {
      const expirationDate = new Date(storedPasswordExpiration);
      const now = new Date();

      if (now < expirationDate) {
        setLoginUsername(storedUsername);
        setLoginPassword(storedPassword);
      } else {
        localStorage.removeItem('rememberedUsername');
        localStorage.removeItem('rememberedPassword');
        localStorage.removeItem('rememberedPasswordExpiration');
      }
    }
  }, []);

  const handleLogin = async () => {
    try {
      const loginTime = new Date().toLocaleString(); // Get current time in a human-readable format
      const sessionDuration = calculateSessionDuration(); // Calculate session duration
      localStorage.setItem('sessionStart', new Date().getTime()); // Store session start time
      const response = await axios.post('http://localhost:5000/api/login', {
        username: loginUsername,
        password: loginPassword,
        loginTime,
        sessionDuration,
      });

      const user = response.data;

      if (user) {
        const role = user.role;
        const userId = user.id;
        alert(`Welcome, ${loginUsername}!`);
        const rememberMeCheckbox = document.getElementById('rememberMeCheckbox');
        if (rememberMeCheckbox.checked) {
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 7);
          localStorage.setItem('rememberedUsername', loginUsername);
          localStorage.setItem('rememberedPassword', loginPassword);
          localStorage.setItem('rememberedPasswordExpiration', expirationDate);
        } else {
          localStorage.removeItem('rememberedUsername');
          localStorage.removeItem('rememberedPassword');
          localStorage.removeItem('rememberedPasswordExpiration');
        }
        localStorage.setItem('username', loginUsername);
        localStorage.setItem('user_id', userId);
        localStorage.setItem('loginTime', new Date().getTime());
        localStorage.setItem('sessionDuration', sessionDuration);
        localStorage.setItem('userData', JSON.stringify(user));

        // Fetch managing admin details
        axios.get(`http://localhost:5000/api/bet/details/${loginUsername}`)
          .then(res => {
            console.log('Managing Admin Details:', res.data);
            setManagingAdminDetails(res.data);
          })
          .catch(err => {
            console.error('Error fetching managing admin details:', err);
          });
        // switch (role) {
        //   case 'Admin':
        //     navigate(`/api/adminuserdetails/${userId}`);
        //     break;
        //   default:
        //     navigate(`/api/userdetails/${userId}`);
        //     break;
        // }
        switch (role) {
          case 'Admin':
            navigate(`/AdminDashboard1`);
            break;
          default:
            navigate(`/me/${loginUsername}`);
            break;
        }
      } else {
        setLoginError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('Username or Password Incorrect. Please check once..');
    }
  };

  const calculateSessionDuration = () => {
    const sessionStart = localStorage.getItem('sessionStart');
    if (sessionStart) {
      const currentTime = new Date().getTime();
      const sessionDuration = (currentTime - parseInt(sessionStart)) / (1000 * 60); // Convert milliseconds to minutes
      return sessionDuration.toFixed(2);
    }
    return 0;
  };

  return (
    <Box className="modal-box">
      <div className="modal-header">
        <Typography id="login-modal-title" variant="h6" component="h2">
          Login
        </Typography>
      </div>

      <div className="logininput-box">
        <input
          type="text"
          className="logininput"
          placeholder="Username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
      </div>
      <div className="logininput-box">
        <input
          className="logininput"
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
      </div>

      {loginError && <p className="error-message">{loginError}</p>}

      <FormControlLabel
        control={<Checkbox id="rememberMeCheckbox" />}
        label="Remember Username"
        className="modal-remember-checkbox"
      />
      <Button variant="contained" onClick={handleLogin} color="primary" fullWidth>
        Login
      </Button>

      <div className="modal-footer">
        <Link to="/forgot-password" className="forgot-link">
          Can't login?
        </Link>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          className="join-now-button"
          component={Link}
          to="/signup"
        >
          JOIN NOW
        </Button>
      </div>

      {/* Session Duration: {calculateSessionDuration()} minutes */}
    </Box>
  );
};

export default Loginform;

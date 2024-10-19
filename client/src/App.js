

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Navbar from './Component/Navbar';


// import SignupForm from './login/SignupForm';
// import LoginForm from './login/LoginForm';
// import Admin from './Component/AdminDashboard';
// import UserDashboard from './Component/UserDashboard';
// import ProfileForm from './Component/ProfileForm';
// import ForgotPasswordForm from './login/ForgotPasswordForm';

// import Deposit from './Betting/Deposit';
// import Withdraw from './Betting/Withdraw';
// import Bet from './Betting/Bet';
// import Amount from './Betting/Amount';
// import PaymentPage from './Betting/PaymentPage';
// import Main from './Betting/Main';
// import MobileNavbar from './Component/MobileNavbar';
// import TransactionProfile from './Component/TransactionProfile';
// import Notification from './Component/Notification';
// import About from './Component/About';
// import Chatbot from './Component/Chatbot';
// import AdminHeader from './admin/AdminHeader';
// import Dashboard from './admin/Dashboard';
// import BettingApp from './admin/BettingApp';
// import ReportBetting from './admin/ReportBetting';
// import User from './Betting/user';
// import AdminDashboard from './admin/AdminDashboard';

// const userRole = 'Admin'; 

// function App() {
//   return (
//     <Router>
//       <AppContent role={userRole} />
//     </Router>
//   );
// }

// function AppContent({ role }) {
//   const location = useLocation();
//   const hideNavbarPaths = ['/login', '/signup', '/forgot-password'];
//   const [openSidebarToggle, setOpenSidebarToggle] = React.useState(false);

//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle);
//   };

//   const isAdminRoute = ['/','/AdmiDashboard1', '/Adminbet', '/Report12'].includes(location.pathname);
//   const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
//   // const shouldHideNavbar1 = isAdminRoute.includes(location.pathname);

//   return (
//     <>
//       {/* Hide Navbar and MobileNavbar for Admin, show for User */}
//       {/* {!shouldHideNavbar && <Navbar />} */}
//       {/* <MobileNavbar /> */}
//       {/* {!shouldHideNavbar && <MobileNavbar />} */}
//       {/* {<AdminHeader />} */}
//       {/* Conditionally render AdminHeader only for Admin users */}
//       {/* {role === 'Admin' && <AdminHeader />} */}
//       {isAdminRoute ? (
//         <AdminHeader />
//       ) : (
//         <>
//           {/* Show Navbar and MobileNavbar only for non-admin routes */}
//           {!shouldHideNavbar && <Navbar />}
//           {!shouldHideNavbar && <MobileNavbar />}
//         </>
//       )}
//       <div className={`main-content ${isAdminRoute && openSidebarToggle ? 'sidebar-open' : ''}`}>
//         <Routes>
//           <Route path="/" element={<Main />} />
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/signup" element={<SignupForm />} />
//           <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          
  
//           {/* Admin-specific routes */}
//           {role === 'Admin' && <Route path="/AdminDashboard1" element={<Dashboard />} />}
         
//           {role === 'Admin' && <Route path="/Adminbet" element={<BettingApp />} />}
//           {role === 'Admin' && <Route path="/Report12" element={<ReportBetting />} />}
  
//           {/* User-specific routes */}
//           <Route path="/Transcation" element={<Deposit />} />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/bet" element={<Bet />} />
//           <Route path="/Deposit" element={<Amount />} />
//           <Route path="/withdraw" element={<Withdraw />} />
//           <Route path="/profile" element={<ProfileForm />} />
//           <Route path="/Notification" element={<Notification />} />
//           <Route path="/About-us" element={<About />} />
//           <Route path="/creditscore" element={<cre />} />
//           <Route path="/me/:username" element={<User />} />
//           <Route path="/TranscationProfile" element={<TransactionProfile />} />
//           <Route path="/live-chat" element={<Chatbot />} />
  
//           {/* Admin and User details paths */}
//           <Route path="/api/adminuserdetails/:userId" element={<Admin />} />
//           <Route path="/api/userdetails/:userId" element={<UserDashboard />} />
//         </Routes>
//       </div>
//     </>
//   );
//   ;
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Component/Navbar';
import SignupForm from './login/SignupForm';
import LoginForm from './login/LoginForm';
import Admin from './Component/AdminDashboard';
import UserDashboard from './Component/UserDashboard';
import ProfileForm from './Component/ProfileForm';
import ForgotPasswordForm from './login/ForgotPasswordForm';
import Deposit from './Betting/Deposit';
import Withdraw from './Betting/Withdraw';
import Bet from './Betting/Bet';
import Amount from './Betting/Amount';
import PaymentPage from './Betting/PaymentPage';
import Main from './Betting/Main';
import MobileNavbar from './Component/MobileNavbar';
import TransactionProfile from './Component/TransactionProfile';
import Notification from './Component/Notification';
import About from './Component/About';
import Chatbot from './Component/Chatbot';
import AdminHeader from './admin/AdminHeader';
import Dashboard from './admin/Dashboard';
import BettingApp from './admin/BettingApp';
import ReportBetting from './admin/ReportBetting';
import User from './Betting/user';
import CreditScore from './Component/CreditScore';
import List from './Betting/List';

const userRole = 'Admin'; 

function App() {
  return (
    <Router>
      <AppContent role={userRole} />
    </Router>
  );
}

function AppContent({ role }) {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/signup', '/forgot-password'];
  const isAdminRoute = ['/AdminDashboard1', '/Adminbet', '/Report12','/list'].includes(location.pathname);
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {/* Show AdminHeader for admin routes; hide Navbar and MobileNavbar */}
      {isAdminRoute ? (
        <AdminHeader />
      ) : (
        <>
          {/* Show Navbar and MobileNavbar only for non-admin routes */}
          {!shouldHideNavbar && <Navbar />}
          {!shouldHideNavbar && <MobileNavbar />}
        </>
      )}
      
      <div className={`main-content ${isAdminRoute ? 'sidebar-open' : ''}`}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />

          {/* Admin-specific routes */}
          {role === 'Admin' && <Route path="/AdminDashboard1" element={<Dashboard />} />}
          {role === 'Admin' && <Route path="/Adminbet" element={<BettingApp />} />}
          {role === 'Admin' && <Route path="/Report12" element={<ReportBetting />} />}
          {role === 'Admin' && <Route path="/list" element={<List />} />}
          {/* User-specific routes */}
          <Route path="/Transcation" element={<Deposit />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/bet" element={<Bet />} />
          <Route path="/Deposit" element={<Amount />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/About-us" element={<About />} />
          <Route path="/creditscore" element={<CreditScore />} />
          <Route path="/me/:username" element={<User />} />
          <Route path="/TranscationProfile" element={<TransactionProfile />} />
          <Route path="/live-chat" element={<Chatbot />} />
  
          {/* Admin and User details paths */}
          <Route path="/api/adminuserdetails/:userId" element={<Admin />} />
          <Route path="/api/userdetails/:userId" element={<UserDashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

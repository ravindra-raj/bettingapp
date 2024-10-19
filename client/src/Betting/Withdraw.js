// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Withdraw() {
//   const [withdrawalAmount, setWithdrawalAmount] = useState('');
//   const [status, setStatus] = useState('');
//   const [withdrawals, setWithdrawals] = useState([]);
//   const [userId] = useState(localStorage.getItem('user_id')); // Assuming user_id is stored in localStorage

//   useEffect(() => {
//     // Fetch withdrawals data on component mount
//     const fetchWithdrawals = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/withdrawals');
//         setWithdrawals(response.data);
//       } catch (error) {
//         console.error('Error fetching withdrawals:', error);
//       }
//     };

//     fetchWithdrawals();
//   }, []);

//   const handleWithdraw = async () => {
//     // Convert withdrawalAmount to a float
//     const amount = parseFloat(withdrawalAmount);
  
//     // Check if amount is a valid number
//     if (isNaN(amount) || amount <= 0) {
//       console.error('Invalid withdrawal amount');
//       return;
//     }
  
//     try {
//       const transactionId = `txn_${Date.now()}`; // Generate a unique transaction ID
//       await axios.post('http://localhost:5000/api/withdrawals', {
//         user_id: userId,
//         transaction_id: transactionId,
//         withdrawal_amount: amount, // Use the converted amount
//         status
//       });
//       // Clear input fields and update withdrawals list after successful transaction
//       setWithdrawalAmount('');
//       setStatus('');
//       const response = await axios.get('http://localhost:5000/api/withdrawals');
//       setWithdrawals(response.data);
//     } catch (error) {
//       console.error('Error posting withdrawal:', error);
//     }
//   };
  

//   return (
//     <div>
//       <h2>Withdraw Funds</h2>
//       <input
//         type="number"
//         value={withdrawalAmount}
//         onChange={(e) => setWithdrawalAmount(e.target.value)}
//         placeholder="Withdrawal Amount"
//       />
//       <input
//         type="text"
//         value={status}
//         onChange={(e) => setStatus(e.target.value)}
//         placeholder="Status"
//       />
//       <button onClick={handleWithdraw}>Withdraw</button>

//       <h3>Withdrawal History</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Transaction ID</th>
//             <th>Amount</th>
//             <th>Status</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {withdrawals.map((withdrawal) => (
//             <tr key={withdrawal.id}>
//               <td>{withdrawal.transaction_id}</td>
//               <td>{withdrawal.withdrawal_amount}</td>
//               <td>{withdrawal.status}</td>
//               <td>{new Date(withdrawal.created_at).toLocaleDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <style jsx>{`
//         table {
//           width: 100%;
//           border-collapse: collapse;
//         }
//         th, td {
//           border: 1px solid #ddd;
//           padding: 8px;
//           text-align: left;
//         }
//         th {
//           background-color: #f4f4f4;
//         }
//         tbody tr:nth-child(even) {
//           background-color: #f9f9f9;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Withdraw;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function Withdraw() {
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [username, setUsername] = useState('');
  const [accountName, setAccountName] = useState('');
  const [branch, setBranch] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [status, setStatus] = useState('');
  const [withdrawals, setWithdrawals] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [userId] = useState(localStorage.getItem('user_id')); 
  const navigate=useNavigate();
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/withdrawals');
        setWithdrawals(response.data);
      } catch (error) {
        console.error('Error fetching withdrawals:', error);
      }
    };

    fetchWithdrawals();
  }, []);

  const handleWithdraw = async () => {
    // Convert withdrawalAmount to a float
    const amount = parseFloat(withdrawalAmount);

    // Check if amount is a valid number
    if (isNaN(amount) || amount <= 0) {
      console.error('Invalid withdrawal amount');
      return;
    }

    try {
      const transactionId = `txn_${Date.now()}`; // Generate a unique transaction ID
      await axios.post('http://localhost:5000/api/withdrawals', {
        user_id: userId,
        transaction_id: transactionId,
        withdrawal_amount: amount,
        status,
        account_number: accountNumber,
        ifsc_code: ifscCode,
        username,
        account_name: accountName,
        branch
      });
      // Clear input fields and update withdrawals list after successful transaction
      setAccountNumber('');
      setIfscCode('');
      setUsername('');
      setAccountName('');
      setBranch('');
      setWithdrawalAmount('');
      setStatus('');
      setSuccessMessage('Withdrawal successful!');
      const response = await axios.get('http://localhost:5000/api/withdrawals');
      setWithdrawals(response.data);
      navigate(`/me/:username`);
    } catch (error) {
      console.error('Error posting withdrawal:', error);
      setSuccessMessage('');
    }
  };

  return (
    <div style={{marginBottom:'100px', width:'90%',marginLeft:'5%'}}>
      <h2>Withdraw Funds</h2>
      <input
        type="text"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        placeholder="Account Number"
      />
      <input
        type="text"
        value={ifscCode}
        onChange={(e) => setIfscCode(e.target.value)}
        placeholder="IFSC Code"
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="text"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        placeholder="Account Name"
      />
      <input
        type="text"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        placeholder="Branch"
      />
      <input
        type="text"
        value={withdrawalAmount}
        onChange={(e) => setWithdrawalAmount(e.target.value)}
        placeholder="Withdrawal Amount"
      />
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Status"
      />
      <Button onClick={handleWithdraw} style={{backgroundColor:'blue', color:'white', display:'flex', justifyContent:'center'}}>Withdraw</Button>

      {successMessage && <p>{successMessage}</p>}

      {/* <h3>Withdrawal History</h3>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map((withdrawal) => (
            <tr key={withdrawal.id}>
              <td>{withdrawal.transaction_id}</td>
              <td>{withdrawal.withdrawal_amount}</td>
              <td>{withdrawal.status}</td>
              <td>{new Date(withdrawal.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
        }
        tbody tr:nth-child(even) {
          background-color: #f9f9f9;
        }
      `}</style>
    </div>
  );
}

export default Withdraw;

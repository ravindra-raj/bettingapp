import React, { useState } from 'react';
import axios from 'axios';

function Amount() {
  const [depositAmount, setDepositAmount] = useState('');
  const [message, setMessage] = useState('');

  // Retrieve user_id from localStorage
  const userId = localStorage.getItem('user_id');

  const handleSubmit = async () => {
    if (!userId) {
      setMessage('User ID not found in localStorage');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/deposits', {
        user_id: userId, // Use user_id from localStorage
        deposit_amount: depositAmount
      });
      setMessage(response.data);
    } catch (error) {
      console.error('Error posting deposit:', error);
      setMessage('Error processing deposit');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Deposit Amount</h2>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Deposit Amount:</label>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          style={{ padding: '8px', fontSize: '16px', width: '100%' }}
        />
      </div>
      <button
        onClick={handleSubmit}
        style={{ padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Submit Deposit
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Amount;

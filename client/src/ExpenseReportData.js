
// import React, { useState } from 'react';

// const ReportForm = () => {
//   const handleSendEmail = () => {
//     const user_id = localStorage.getItem('user_id');
//     const startDate = '2024-01-01'; // Replace with actual start date
//     const endDate = '2024-08-31'; // Replace with actual end date
//     const type = 'income'; // Replace with actual type (income/expense)

//     fetch('http://localhost:5000/api/expenses/send-report', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         userId: user_id,
//         startDate: startDate,
//         endDate: endDate,
//         type: type,
//       }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (data.message) {
//           alert(data.message);
//         }
//       })
//       .catch(error => {
//         console.error('Error sending email:', error);
//       });
//   };
//   return (
//     <div>
//        <button onClick={handleSendEmail}>Send Report</button>
//     </div>
//   );
// };

// export default ReportForm;

import React, { useState } from 'react';

const ReportForm = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');

  const handleSendEmail = () => {
    const userId = localStorage.getItem('user_id');

    if (!startDate || !endDate || !type) {
      alert('Please fill in all fields.');
      return;
    }

    fetch('http://localhost:5000/api/expenses/send-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        startDate: startDate,
        endDate: endDate,
        type: type,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
        }
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <div>
      <h1>Generate Report</h1>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Report Type:
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
      </div>
      <button onClick={handleSendEmail}>Send Report</button>
    </div>
  );
};

export default ReportForm;

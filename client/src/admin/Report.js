

import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './Report.css';

const Report = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [expensesData, setExpensesData] = useState([]);

  const handleUserIdChange = (event) => {
    setSelectedUserId(event.target.value);
  };

  const fetchExpenses = () => {
    if (!selectedUserId) {
      alert('Please enter a user ID.');
      return;
    }

    axios.get(`http://localhost:5000/api/report/${selectedUserId}`)
      .then(response => {
        setExpensesData(response.data.expenses);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const downloadExcel = () => {
    if (expensesData.length === 0) {
      alert('No expenses data to download.');
      return;
    }

    // Create worksheet data
    const expensesSheet = XLSX.utils.json_to_sheet(expensesData, {
      header: [
        'user_id', 'user_name', 'expense_id', 'title', 'amount', 'category', 'date', 'type', 'created_at', 'updated_at'
      ]
    });

    // Create a new workbook and add the sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, expensesSheet, 'Expenses');

    // Write the workbook to a binary string
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Create a blob and trigger download
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `user_${selectedUserId}_expenses_report.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='report-user1'>
      <div className='report-user-input'>
        <label>
          User ID:
          <input
            type="text"
            value={selectedUserId}
            onChange={handleUserIdChange}
          />
        </label>
        <button onClick={fetchExpenses}>Fetch Expenses</button>
      </div>

      {/* Display Expenses Data */}
      {expensesData.length > 0 && (
        <div className='report-expense1'>
          <h3>Expenses Details</h3>
          <table border="1">
            <thead>
              <tr>
                {/* <th>User ID</th>
                <th>User Name</th> */}
                {/* <th>Expense ID</th> */}
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Type</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {expensesData.map(expense => (
                <tr key={expense.expense_id}>
                  {/* <td>{expense.user_id}</td>
                  <td>{expense.user_name}</td> */}
                  {/* <td>{expense.expense_id}</td> */}
                  <td>{expense.title}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>{expense.type}</td>
                  <td>{new Date(expense.created_at).toLocaleString()}</td>
                  <td>{new Date(expense.updated_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button onClick={downloadExcel} className='report-download'>Download Expenses Excel</button>
    </div>
  );
};

export default Report;

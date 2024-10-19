import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { Modal, Box, Checkbox, FormControlLabel, Button } from '@mui/material';
import axios from 'axios';
import './Chart.css';
import { Link } from 'react-router-dom';

const size = {
  width: 800,
  height: 350,
  left: 10,
};

const smallScreenSize = {
  width: 400,
  height: 200,
  marginLeft: '10px',
  marginRight: '10px',
};

const ipadMiniSize = {
  width: 700,
  height: 300,
  marginTop: 10,
};

const largeScreenSize = {
  width: 800,
  height: 350,
};

const colors = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
  '#9966FF', '#FF9F40', '#8DFF57', '#F44174'
];

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left / 2 + width / 2} y={top / 2 + height / 2}>
      {children}
    </StyledText>
  );
}

function PieChartWithCenterLabel() {
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryExpenses, setCategoryExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [income, setIncome] = useState(null);
  const [expense, setExpense] = useState(null);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    fetchTotalAmount();
    fetchTotalByCategory();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      fetchTotalAmount(userId);
      fetchTotalByCategory(userId);
    }
  }, []);


  const fetchTotalAmount = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        console.error('User ID is not found in local storage');
        return;
    }

    try {
        const response = await axios.get(`http://localhost:5000/api/expenses/total`, {
            params: { user_id: userId }
        });
        setIncome(response.data.income);
        setExpense(response.data.expense);
    } catch (error) {
        console.error('Error fetching total amount:', error);
    }
};

  const fetchTotalByCategory = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/expenses/total_by_category`, {
        params: { user_id: userId }
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching the data', error);
    }
  };

  const fetchCategoryExpenses = async (userId, category) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/expenses/category/${category}`, {
        params: { user_id: userId }
      });
      setCategoryExpenses(response.data);
    } catch (error) {
      console.error('Error fetching category expenses', error);
    }
  };

  const handleCheckboxChange = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory(null);
      setCategoryExpenses([]);
    } else {
      setSelectedCategory(category);
      const userId = localStorage.getItem('user_id');
      if (userId) {
        fetchCategoryExpenses(userId, category);
      }
    }
  };

  const handleExpenseClick = (expense) => {
    setSelectedExpense(expense);
  };

  const handleCloseModal = () => {
    setSelectedExpense(null);
  };

  const handleUpdate = () => {
    handleCloseModal();
  };

  const formattedData = data.map((item, index) => {
    const percentage = totalAmount ? ((item.total_amount / totalAmount) * 100).toFixed(2) : 0;
    return {
      value: item.total_amount,
      label: `${item.category}: ${item.total_amount} (${percentage}%)`,
      color: colors[index % colors.length],
    };
  });

  const selectedCategoryColor = selectedCategory
    ? colors[data.findIndex(item => item.category === selectedCategory) % colors.length]
    : null;

  let pieChartSize = size;

  if (screenWidth <= 400) {
    pieChartSize = smallScreenSize;
  } else if (screenWidth <= 768) {
    pieChartSize = ipadMiniSize;
  } else if (screenWidth <= 820) {
    pieChartSize = largeScreenSize;
  }

  // Bar chart data
  const barChartData = {
    yAxis: formattedData.map(item => item.label),
    series: [{
      data: formattedData.map(item => item.value),
      backgroundColor: formattedData.map(item => item.color),
    }]
  };
  const balance = income - expense;
  return (
    <>
      <div className='chart'>
        <div className="chart-total-expenses-container">
          <h2>Total Expenses</h2>
          <div className="chart-expense-info">
          
             <div className="chart-expense-detail">
                        Income: <span className="chart-expense-detail">{income !== null ? `+${income}` : 'Loading...'}</span>
                    </div>
                    <div className="chart-expense-detail">
                        Expense: <span className="chart-expense-detail">{expense !== null ? `-${Math.abs(expense)}` : 'Loading...'}</span>
                    </div>
                    <div className="chart-expense-detail">
                        Balance: <span className="chart-expense-detail1">{income !== null && expense !== null ? balance : 'Loading...'}</span>
                    </div>
          </div>
        </div>
        <hr className='chart-ch'></hr>
        <div className={`chart-pie-chart-container ${screenWidth <= 430 ? 'chart-hide-data' : ''}`}>
          {screenWidth > 430 ? (
            <PieChart
              series={[{ data: formattedData, innerRadius: 70, className: 'chart-series-data' }]}
              {...pieChartSize}
              className="chart-pie-chart"
            >
              <PieCenterLabel>{selectedCategory}</PieCenterLabel>
            </PieChart>
          ) : (
            <BarChart
              xAxis={[{ scaleType: 'band', data: barChartData.yAxis }]}
              yAxis={[{ scaleType: 'linear', data: barChartData.series[0].data }]}
              series={barChartData.series}
              {...smallScreenSize}
              className="chart-bar-chart"
            />
          )}
        </div>
        <div className="chart-category-checkboxes">
          {data.map((item, index) => (
            <FormControlLabel
              key={item.category}
              control={
                <Checkbox
                  checked={selectedCategory === item.category}
                  onChange={() => handleCheckboxChange(item.category)}
                  style={{ color: colors[index % colors.length] }}
                />
              }
              label={item.category}
            />
          ))}
        </div>
        {selectedCategory && (
          <div className="chart-category-expenses-container">
            <h3>Expenses for {selectedCategory}</h3>
            <ul className="chart-expense-list">
              {categoryExpenses.map((expense) => (
                <li className="chart-expense-item" key={expense.id} onClick={() => handleExpenseClick(expense)}>
                  <p>Title: {expense.title}</p>
                  <p>Amount: {expense.amount}</p>
                  <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
                  <p>Category: {expense.category}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedExpense && (
          <Modal
            open={true}
            onClose={handleCloseModal}
            className="chart-modal-container"
          >
            <Box
              className="chart-modal-content"
              sx={{ backgroundColor: selectedCategoryColor }}
            >
              <h2>Expense Details</h2>
              <p>Title: {selectedExpense.title}</p>
              <p>Amount: {selectedExpense.amount}</p>
              <p>Date: {new Date(selectedExpense.date).toLocaleDateString()}</p>
              <p>Category: {selectedExpense.category}</p>
              <Link to={`/expenses/${selectedExpense.id}`}>
                <button>Update</button>
              </Link>
              <Button onClick={handleCloseModal}>Close</Button>
            </Box>
          </Modal>
        )}
      </div>
    </>
  );
}

export default PieChartWithCenterLabel;

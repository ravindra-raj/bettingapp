
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './Calendar.css';
 
// const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 
// function Calendar() {
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [expenses, setExpenses] = useState([]);
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [selectedDateExpenses, setSelectedDateExpenses] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedExpense, setSelectedExpense] = useState(null);
//     const [totalAmount, setTotalAmount] = useState(null);
//     const [userId, setUserId] = useState(null); // State to hold user_id from localStorage
//     const [income, setIncome] = useState(null);
//     const [expense, setExpense] = useState(null);
//     useEffect(() => {
//         // Retrieve user_id from localStorage
//         const userIdFromStorage = localStorage.getItem('user_id');
//         setUserId(userIdFromStorage);

//         fetchExpenses(userIdFromStorage);
//         fetchTotalAmount(userIdFromStorage);
//     }, [currentDate]);

//     const fetchExpenses = async (userId) => {
//         try {
//             const year = currentDate.getFullYear();
//             const month = currentDate.getMonth() + 1;
//             const response = await axios.get(`http://localhost:5000/api/expenses/total-per-month/${year}-${month < 10 ? `0${month}` : month}`, {
//                 params: { user_id: userId }
//             });
//             setExpenses(response.data);
//         } catch (error) {
//             console.error("Error fetching expenses:", error);
//         }
//     };

//     const fetchTotalAmount = async () => {
//         const userId = localStorage.getItem('user_id');
//         if (!userId) {
//             console.error('User ID is not found in local storage');
//             return;
//         }
    
//         try {
//             const response = await axios.get(`http://localhost:5000/api/expenses/total`, {
//                 params: { user_id: userId }
//             });
//             setIncome(response.data.income);
//             setExpense(response.data.expense);
//         } catch (error) {
//             console.error('Error fetching total amount:', error);
//         }
//     };

//     const handleDayClick = async (day) => {
//         const year = currentDate.getFullYear();
//         const month = currentDate.getMonth() + 1;
//         const dayString = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;

//         try {
//             const response = await axios.get(`http://localhost:5000/api/expenses/by-date/${dayString}`, {
//                 params: { user_id: userId }
//             });
//             setSelectedDate(dayString);
//             setSelectedDateExpenses(response.data);
//         } catch (error) {
//             console.error("Error fetching expenses for the selected date:", error);
//         }
//     };

//     const handleClickExpense = (expense) => {
//         setSelectedExpense(expense);
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//         setSelectedExpense(null);
//     };

//     const generateCalendar = () => {
//         const year = currentDate.getFullYear();
//         const month = currentDate.getMonth();
//         const daysInMonth = new Date(year, month + 1, 0).getDate();
//         const startDay = new Date(year, month, 1).getDay();

//         let calendarDays = [];
//         for (let i = 0; i < startDay; i++) {
//             calendarDays.push(<div className="empty" key={`empty-${i}`}></div>);
//         }

//         for (let day = 1; day <= daysInMonth; day++) {
//             const dayString = `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${day < 10 ? `0${day}` : day}`;
//             const expense = expenses.find(exp => exp.day === dayString);

//             calendarDays.push(
//                 <div
//                     className="day"
//                     key={day}
//                     role="button"
//                     tabIndex="0"
//                     onClick={() => handleDayClick(day)}
//                     onKeyPress={(event) => {
//                         if (event.key === 'Enter' || event.key === ' ') {
//                             handleDayClick(day);
//                         }
//                     }}
//                 >
//                     <div className="day-number">{day}</div>
//                     <div className="expenses">
//                         {expense ? <div className="expense-item">-{expense.totalAmount}</div> : null}
//                     </div>
//                 </div>
//             );
//         }

//         return calendarDays;
//     };
//     const balance = income - expense;
   
 
//     return (
//         <>
//         <div className='Calendar'>
//             <h1>Calendar</h1>
//             <div className="total-expenses-container">
//                 <h2>Total Expenses</h2>
//                 <div className="expense-info">
//                     {/* <div className="expense-detail1">
//                         Income: <span className="expense-value">{totalAmount !== null ? `+${0}` : 'Loading...'}</span>
//                     </div>
//                     <div className="expense-detail2">
//                         Expense: <span className="expense-value">{totalAmount !== null ? `-${totalAmount}` : 'Loading...'}</span>
//                     </div>
//                     <div className="expense-detail3">
//                         Balance: <span className="expense-value1">{totalAmount !== null ? `-${totalAmount}` : 'Loading...'}</span>
//                     </div> */}
//                     <div className="expense-detail1">
//                         Income: <span className="expense-value">{income !== null ? `+${income}` : 'Loading...'}</span>
//                     </div>
//                     <div className="expense-detail2">
//                         Expense: <span className="expense-value">{expense !== null ? `-${Math.abs(expense)}` : 'Loading...'}</span>
//                     </div>
//                     <div className="expense-detail3">
//                         Balance: <span className="expense-value1">{income !== null && expense !== null ? balance : 'Loading...'}</span>
//                     </div>
//                 </div>
//             </div>
//             <hr className='ex'></hr>
//             <div className="calendar-wrapper">
//                 <header>
//                     <button onClick={() => setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1))}>Previous</button>
//                     <h2>
//                         {currentDate.toLocaleString('default', { month: 'long' })}{' '}
//                         {currentDate.getFullYear()}
//                     </h2>
//                     <button onClick={() => setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1))}>Next</button>
//                 </header>
//                 <div className="days-of-week">
//                     {daysOfWeek.map((day) => (
//                         <div className="day-name" key={day}>
//                             {day}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="calendar-days">
//                     {generateCalendar()}
//                 </div>
//             </div>
//             {selectedDate && (
//                 <div className="list-container">
//                     <div className="date-expenses-container">
//                         <h3 className="date-header">{selectedDate}</h3>
//                         <ul className="expense-list">
//                             {selectedDateExpenses.map((expense) => (
//                                 <li className="expense-item" key={expense.id} onClick={() => handleClickExpense(expense)}>
//                                     <p>{expense.category}</p>
//                                     <p>{expense.amount}</p>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             )}
//             {showModal && selectedExpense && (
//                 <div className="modal-container" onClick={closeModal}>
//                     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                         <h2>Item Details</h2>
//                         <p>Event Date: {new Date(selectedExpense.date).toLocaleDateString()}</p>
//                         <p>Category: {selectedExpense.category}</p>
//                         <p>Category: {selectedExpense.id}</p>
//                         <p>Amount: {selectedExpense.amount}</p>
//                         <p>Title: {selectedExpense.title}</p>
//                         <p>Saved on: {new Date(selectedExpense.created_at).toLocaleDateString()}</p>
//                         <button onClick={closeModal}>Close</button>
//                         <Link to={`/expenses/${selectedExpense.id}`}>
//                             <button>Update</button>
//                         </Link>
//                     </div>
//                 </div>
//             )}
//             </div>
//         </>
//     );
// }
 
// export default Calendar;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Calendar.css';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [expenses, setExpenses] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateExpenses, setSelectedDateExpenses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [userId, setUserId] = useState(null);
    const [income, setIncome] = useState(null);
    const [expense, setExpense] = useState(null);

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('user_id');
        setUserId(userIdFromStorage);
        fetchExpenses(userIdFromStorage);
        fetchTotalAmount(userIdFromStorage);
    }, [currentDate]);

    const fetchExpenses = async (userId) => {
        try {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const response = await axios.get(`http://localhost:5000/api/expenses/total-per-month/${year}-${month < 10 ? `0${month}` : month}`, {
                params: { user_id: userId }
            });
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

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

    const handleDayClick = async (day) => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const dayString = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;

        try {
            const response = await axios.get(`http://localhost:5000/api/expenses/by-date/${dayString}`, {
                params: { user_id: userId }
            });
            setSelectedDate(dayString);
            setSelectedDateExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses for the selected date:", error);
        }
    };

    const handleClickExpense = (expense) => {
        setSelectedExpense(expense);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedExpense(null);
    };

    const generateCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startDay = new Date(year, month, 1).getDay();

        let calendarDays = [];
        for (let i = 0; i < startDay; i++) {
            calendarDays.push(<div className="empty" key={`empty-${i}`}></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayString = `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${day < 10 ? `0${day}` : day}`;
            const expense = expenses.find(exp => exp.day === dayString);

            calendarDays.push(
                <div
                    className="day"
                    key={day}
                    role="button"
                    tabIndex="0"
                    onClick={() => handleDayClick(day)}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            handleDayClick(day);
                        }
                    }}
                >
                    <div className="day-number">{day}</div>
                    <div className="expenses">
                        {expense ? (
                            <div className={`expense-item ${expense.totalAmount > 0 ? 'income' : 'expense'}`}>
                                {expense.totalAmount > 0 ? `+${expense.totalAmount}` : expense.totalAmount}
                            </div>
                        ) : null}
                    </div>
                </div>
            );
        }

        return calendarDays;
    };

    const balance = income - expense;

    return (
        <>
        <div className='Calendar'>
            <h1>Calendar</h1>
            <div className="total-expenses-container">
                <h2>Total Expenses</h2>
                <div className="expense-info">
                    <div className="expense-detail1">
                        Income: <span className="expense-value">{income !== null ? `+${income}` : 'Loading...'}</span>
                    </div>
                    <div className="expense-detail2">
                        Expense: <span className="expense-value">{expense !== null ? `-${Math.abs(expense)}` : 'Loading...'}</span>
                    </div>
                    <div className="expense-detail3">
                        Balance: <span className="expense-value1">{income !== null && expense !== null ? balance : 'Loading...'}</span>
                    </div>
                </div>
            </div>
            <hr className='ex'></hr>
            <div className="calendar-wrapper">
                <header>
                    <button onClick={() => setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1))}>Previous</button>
                    <h2>
                        {currentDate.toLocaleString('default', { month: 'long' })}{' '}
                        {currentDate.getFullYear()}
                    </h2>
                    <button onClick={() => setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1))}>Next</button>
                </header>
                <div className="days-of-week">
                    {daysOfWeek.map((day) => (
                        <div className="day-name" key={day}>
                            {day}
                        </div>
                    ))}
                </div>
                <div className="calendar-days">
                    {generateCalendar()}
                </div>
            </div>
            {selectedDate && (
                <div className="list-container">
                    <div className="date-expenses-container">
                        <h3 className="date-header">{selectedDate}</h3>
                        <ul className="expense-list">
                            {selectedDateExpenses.map((expense) => (
                                <li className="expense-item" key={expense.id} onClick={() => handleClickExpense(expense)}>
                                    <p>{expense.category}</p>
                                    <p>{expense.amount}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {showModal && selectedExpense && (
                <div className="modal-container" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Item Details</h2>
                        <p>Event Date: {new Date(selectedExpense.date).toLocaleDateString()}</p>
                        <p>Category: {selectedExpense.category}</p>
                        <p>Amount: {selectedExpense.amount}</p>
                        <p>Title: {selectedExpense.title}</p>
                        <p>Saved on: {new Date(selectedExpense.created_at).toLocaleDateString()}</p>
                        <button onClick={closeModal}>Close</button>
                        <Link to={`/expenses/${selectedExpense.id}`}>
                            <button>Update</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}

export default Calendar;


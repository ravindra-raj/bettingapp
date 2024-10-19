
 
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import * as XLSX from 'xlsx';
// import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
// import './List.css';
// import { FaTrashAlt } from "react-icons/fa"; // Importing a trash icon from react-icons
 
// const List = () => {
//     const [expenses, setExpenses] = useState([]);
//     const [selectedExpense, setSelectedExpense] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [uniqueDates, setUniqueDates] = useState([]);
//     const [totalAmount, setTotalAmount] = useState(null);
//     const [openDate, setOpenDate] = useState(null);
//     const [currentDate, setCurrentDate] = useState(new Date());

//     useEffect(() => {
//         fetchExpenses();
//         fetchUniqueDates();
//         fetchTotalAmount();
//     }, []);

//     const fetchExpenses = async () => {
//         const userId = localStorage.getItem('user_id');
//         if (!userId) {
//             console.error('User ID is not found in local storage');
//             return;
//         }

//         try {
//             const response = await axios.get(`http://localhost:5000/api/expenses`, {
//                 params: { user_id: userId }
//             });
//             setExpenses(response.data);
//         } catch (error) {
//             console.error('Error fetching expenses:', error);
//         }
//     };

//     const fetchUniqueDates = async () => {
//         const userId = localStorage.getItem('user_id');
//         if (!userId) {
//             console.error('User ID is not found in local storage');
//             return;
//         }

//         try {
//             const response = await axios.get(`http://localhost:5000/api/expenses/date/a`, {
//                 params: { user_id: userId }
//             });
//             setUniqueDates(response.data.map(item => item.date));
//         } catch (error) {
//             console.error('Error fetching unique dates:', error);
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
//             setTotalAmount(response.data.totalAmount);
//         } catch (error) {
//             console.error('Error fetching total amount:', error);
//         }
//     };

//     const handleClick = (expense) => {
//         setSelectedExpense(expense);
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setSelectedExpense(null);
//         setShowModal(false);
//     };

//     const toggleDate = (date) => {
//         if (openDate === date) {
//             setOpenDate(null);
//         } else {
//             setOpenDate(date);
//         }
//     };

//     const formatDate = (dateString) => {
//         const dateObj = new Date(dateString);
//         const year = dateObj.getFullYear();
//         const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
//         const date = dateObj.getDate().toString().padStart(2, '0');
//         return `${date}/${month}/${year}`;
//     };

//     const goToPreviousMonth = () => {
//         const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
//         setCurrentDate(previousMonth);
//     };

//     const goToNextMonth = () => {
//         const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
//         setCurrentDate(nextMonth);
//     };

//     const monthYearString = currentDate.toLocaleString('default', { year: 'numeric', month: 'numeric' });

//     const filteredExpenses = expenses.filter(expense => {
//         const expenseDate = new Date(expense.date);
//         return (
//             expenseDate.getMonth() === currentDate.getMonth() &&
//             expenseDate.getFullYear() === currentDate.getFullYear()
//         );
//     });

//     const uniqueFilteredDates = uniqueDates.filter(dateString => {
//         const date = new Date(dateString);
//         return (
//             date.getMonth() === currentDate.getMonth() &&
//             date.getFullYear() === currentDate.getFullYear()
//         );
//     });

//     const downloadExcel = async () => {
//         const userId = localStorage.getItem('user_id');
//         if (!userId) {
//             console.error('User ID is not found in local storage');
//             return;
//         }

//         try {
//             const response = await axios.get(`http://localhost:5000/api/expenses/all`, {
//                 params: { user_id: userId }
//             });
//             const allExpenses = response.data;

//             // Create worksheet and workbook
//             const worksheet = XLSX.utils.json_to_sheet(allExpenses);
//             const workbook = XLSX.utils.book_new();
//             XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');

//             // Get current date and time
//             const now = new Date();
//             const year = now.getFullYear();
//             const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
//             const day = String(now.getDate()).padStart(2, '0');
//             const hours = String(now.getHours()).padStart(2, '0');
//             const minutes = String(now.getMinutes()).padStart(2, '0');
//             const seconds = String(now.getSeconds()).padStart(2, '0');

//             // Format date and time for the file name
//             const formattedDateTime = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;

//             // Set the file name with date and time
//             const fileName = `Expenses_${formattedDateTime}.xlsx`;

//             // Write the workbook to a file
//             XLSX.writeFile(workbook, fileName);
//         } catch (error) {
//             console.error('Error downloading Excel file:', error);
//         }
//     };

//     const deleteAllBookings = async () => {
//         const userId = localStorage.getItem('user_id');
//         if (!userId) {
//             console.error('User ID is not found in local storage');
//             return;
//         }

//         try {
//             await axios.delete(`http://localhost:5000/api/booking`, {
//                 params: { user_id: userId }
//             });
//             alert('All bookings have been deleted');
//             fetchExpenses(); // Refresh the expenses list
//         } catch (error) {
//             console.error('Error deleting all bookings:', error);
//         }
//     };

//     return (
//         <>
//         <div className='list'>
//             {/* <div className="download-container">
//                 <PiMicrosoftExcelLogoFill onClick={downloadExcel} style={{ fontSize: "50px", cursor: "pointer" }} />
//             </div> */}
//             <div className="download-container">
//                 <PiMicrosoftExcelLogoFill onClick={downloadExcel} style={{ fontSize: "37px", cursor: "pointer" }} />
//                 <FaTrashAlt onClick={deleteAllBookings} style={{ fontSize: "34px", cursor: "pointer", marginLeft: "10px" }} />
//             {/* <h5 onClick={deleteAllBookings} style={{ fontSize: "50px", cursor: "pointer", marginLeft: "10px" }}>Delete all data</h5> */}
//             </div>
//             <div className="calendar-header">
//                 <button className="calendar-button" onClick={goToPreviousMonth}>Previous</button>
//                 <div className="month-year-display">{monthYearString}</div>
//                 <button className="calendar-button" onClick={goToNextMonth}>Next</button>
//             </div>
//             <div className="total-expenses-container">
//                 <h2>Total Expenses</h2>
//                 <div className="expense-info">
//                     <div className="expense-detail">
//                         Income: <span className="expense-value">{totalAmount !== null ? `+${0}` : 'Loading...'}</span>
//                     </div>
//                     <div className="expense-detail">
//                         Expense: <span className="expense-value">{totalAmount !== null ? `-${totalAmount}` : 'Loading...'}</span>
//                     </div>
//                     <div className="expense-detail">
//                         Balance: <span className="expense-value1">{totalAmount !== null ? `-${totalAmount}` : 'Loading...'}</span>
//                     </div>
//                 </div>
//             </div>
 
//             <hr className='cr'></hr>
//             <div className="list-container">
//                 {uniqueFilteredDates.map((date, index) => (
//                     <div className="date-expenses-container" key={index}>
//                         <h3 className="date-header" onClick={() => toggleDate(date)}>
//                             {formatDate(date)}
//                         </h3>
 
//                         {openDate === date && (
//                             <div className="expense-list">
//                                 {filteredExpenses
//                                     .filter(expense => new Date(expense.date).toLocaleDateString() === new Date(date).toLocaleDateString())
//                                     .map(filteredExpense => (
//                                         <div className="expense-item" key={filteredExpense.id} onClick={() => handleClick(filteredExpense)}>
//                                             <p>{filteredExpense.category}</p>
//                                             <p>{filteredExpense.amount}</p>
//                                         </div>
//                                     ))}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
 
//             {showModal && selectedExpense && (
//                 <div className="modal-container" onClick={closeModal}>
//                     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                         <h2>Item Details</h2>
//                         <p>Event Date: {new Date(selectedExpense.date).toLocaleDateString()}</p>
//                         <p>Category: {selectedExpense.category}</p>
//                         <p>Title: {selectedExpense.title}</p>
//                         <p>Saved on: {new Date(selectedExpense.created_at).toLocaleDateString()}</p>
//                         <button onClick={closeModal}>Cancel</button>
//                         <Link to={`/expenses/${selectedExpense.id}`}>
//                             <button>Update</button>
//                         </Link>
//                     </div>
//                 </div>
//             )}
//             </div>
//         </>
//     );
// };
 
// export default List;
 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import './List.css';
import { FaTrashAlt } from "react-icons/fa"; // Importing a trash icon from react-icons

const List = () => {
    const [expenses, setExpenses] = useState([]);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [uniqueDates, setUniqueDates] = useState([]);
    const [income, setIncome] = useState(null);
    const [expense, setExpense] = useState(null);
    const [openDate, setOpenDate] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        fetchExpenses();
        fetchUniqueDates();
        fetchTotalAmount();
    }, []);

    const fetchExpenses = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            console.error('User ID is not found in local storage');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/expenses`, {
                params: { user_id: userId }
            });
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const fetchUniqueDates = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            console.error('User ID is not found in local storage');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/expenses/date/a`, {
                params: { user_id: userId }
            });
            setUniqueDates(response.data.map(item => item.date));
        } catch (error) {
            console.error('Error fetching unique dates:', error);
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

    const handleClick = (expense) => {
        setSelectedExpense(expense);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedExpense(null);
        setShowModal(false);
    };

    const toggleDate = (date) => {
        if (openDate === date) {
            setOpenDate(null);
        } else {
            setOpenDate(date);
        }
    };

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const date = dateObj.getDate().toString().padStart(2, '0');
        return `${date}/${month}/${year}`;
    };

    const goToPreviousMonth = () => {
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        setCurrentDate(previousMonth);
    };

    const goToNextMonth = () => {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        setCurrentDate(nextMonth);
    };

    const monthYearString = currentDate.toLocaleString('default', { year: 'numeric', month: 'numeric' });

    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return (
            expenseDate.getMonth() === currentDate.getMonth() &&
            expenseDate.getFullYear() === currentDate.getFullYear()
        );
    });

    const uniqueFilteredDates = uniqueDates.filter(dateString => {
        const date = new Date(dateString);
        return (
            date.getMonth() === currentDate.getMonth() &&
            date.getFullYear() === currentDate.getFullYear()
        );
    });

    const downloadExcel = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            console.error('User ID is not found in local storage');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/expenses/all`, {
                params: { user_id: userId }
            });
            const allExpenses = response.data;

            // Create worksheet and workbook
            const worksheet = XLSX.utils.json_to_sheet(allExpenses);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');

            // Get current date and time
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            // Format date and time for the file name
            const formattedDateTime = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;

            // Set the file name with date and time
            const fileName = `Expenses_${formattedDateTime}.xlsx`;

            // Write the workbook to a file
            XLSX.writeFile(workbook, fileName);
        } catch (error) {
            console.error('Error downloading Excel file:', error);
        }
    };

    const deleteAllBookings = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            console.error('User ID is not found in local storage');
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/booking`, {
                params: { user_id: userId }
            });
            alert('All bookings have been deleted');
            fetchExpenses(); // Refresh the expenses list
        } catch (error) {
            console.error('Error deleting all bookings:', error);
        }
    };

    const balance = income - expense;

    return (
        <>
        <div className='list'>
            <div className="download-container">
                <PiMicrosoftExcelLogoFill onClick={downloadExcel} style={{ fontSize: "37px", cursor: "pointer" }} />
                <FaTrashAlt onClick={deleteAllBookings} style={{ fontSize: "34px", cursor: "pointer", marginLeft: "10px" }} />
            </div>
            <div className="calendar-header">
                <button className="calendar-button" onClick={goToPreviousMonth}>Previous</button>
                <div className="month-year-display">{monthYearString}</div>
                <button className="calendar-button" onClick={goToNextMonth}>Next</button>
            </div>
            <div className="total-expenses-container">
                <h2>Total Expenses</h2>
                <div className="expense-info">
                    <div className="expense-detail">
                        Income: <span className="expense-value">{income !== null ? `+${income}` : 'Loading...'}</span>
                    </div>
                    <div className="expense-detail">
                        Expense: <span className="expense-value">{expense !== null ? `-${Math.abs(expense)}` : 'Loading...'}</span>
                    </div>
                    <div className="expense-detail">
                        Balance: <span className="expense-value1">{income !== null && expense !== null ? balance : 'Loading...'}</span>
                    </div>
                </div>
            </div>
            <hr className='cr'></hr>
            <div className="list-container">
                {uniqueFilteredDates.map((date, index) => (
                    <div className="date-expenses-container" key={index}>
                        <h3 className="date-header" onClick={() => toggleDate(date)}>
                            {formatDate(date)}
                        </h3>
                        {openDate === date && (
                            <div className="expense-list">
                                {filteredExpenses
                                    .filter(expense => new Date(expense.date).toLocaleDateString() === new Date(date).toLocaleDateString())
                                    .map(filteredExpense => (
                                        <div className="expense-item" key={filteredExpense.id} onClick={() => handleClick(filteredExpense)}>
                                            <p>{filteredExpense.category}</p>
                                            <p>{filteredExpense.amount}</p>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {showModal && selectedExpense && (
                <div className="modal-container" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Item Details</h2>
                        <p>Event Date: {new Date(selectedExpense.date).toLocaleDateString()}</p>
                        <p>Category: {selectedExpense.category}</p>
                        <p>Title: {selectedExpense.title}</p>
                        <p>Saved on: {new Date(selectedExpense.created_at).toLocaleDateString()}</p>
                        <button onClick={closeModal}>Cancel</button>
                        <Link to={`/expenses/${selectedExpense.id}`}>
                            <button>Update</button>
                        </Link>
                    </div>
                </div>
            )}
            </div>
        </>
    );
};

export default List;

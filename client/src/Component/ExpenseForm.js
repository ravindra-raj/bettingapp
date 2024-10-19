// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import './ExpenseForm.css';

// function ExpenseForm() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [inputState, setInputState] = useState({
//         title: '',
//         amount: '',
//         type: '',
//         date: new Date(), 
//         category: '',
//         description: '',
//     });
//     const [error, setError] = useState('');

//     useEffect(() => {
//         console.log('ID:', id);
//         if (id) {
//             fetchExpense();
//         }
//     }, [id]);

//     const fetchExpense = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/expenses/${id}`);
//             const expense = response.data[0];
    
//             if (expense && typeof expense === 'object' && 'title' in expense) {
//                 setInputState({
//                     title: expense.title,
//                     amount: expense.amount,
//                     type: expense.type,
//                     date: new Date(expense.date),
//                     category: expense.category,
//                     description: expense.description,
//                 });
//             } else {
//                 setError('Expense data not found or invalid.');
//             }
//         } catch (err) {
//             console.error(err);
//             setError('Error fetching expense data.');
//         }
//     };

//     const handleInput = (name) => (e) => {
//         setInputState({ ...inputState, [name]: e.target.value });
//         setError('');
//     };

//     const handleDateChange = (date) => {
//         setInputState({ ...inputState, date: date });
//         setError('');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formattedDate = inputState.date.toISOString().split('T')[0];
//             const expenseData = {
//                 ...inputState,
//                 date: formattedDate
//             };

//             await axios.post('http://localhost:5000/api/expenses', expenseData);

//             setInputState({
//                 title: '',
//                 amount: '',
//                 type: '',
//                 date: new Date(), // Reset to current date
//                 category: '',
//                 description: '',
//             });
//             // navigate('/utils/util-List'); // Navigate to the list screen after submission
//         } catch (err) {
//             setError(err.response?.data || 'Server Error');
//         }
//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             const formattedDate = inputState.date.toISOString().split('T')[0];
//             const expenseData = {
//                 ...inputState,
//                 date: formattedDate
//             };

//             await axios.put(`http://localhost:5000/api/expenses/update/${id}`, expenseData);

//             setInputState({
//                 title: '',
//                 amount: '',
//                 type: '',
//                 date: new Date(), // Reset to current date
//                 category: '',
//                 description: '',
//             });
//             navigate('/utils/util-List'); // Navigate to the list screen after update
//         } catch (err) {
//             setError(err.response?.data || 'Server Error');
//         }
//     };

//     return (
//         <div className='expense'>
//             <h1>Expenses</h1>
//         <form className="expense-form" onSubmit={handleSubmit}>
//             {error && <p className='error'>{error}</p>}
//             <div className="input-control">
//                 <h2 className='title'>Title</h2>
//                 <input
//                     type="text"
//                     value={inputState.title}
//                     name="title"
//                     placeholder="Expense Title"
//                     onChange={handleInput('title')}
//                 />
//             </div>
//             <div className="input-control">
//                 <h2 className='amount'>Amount</h2>
//                 <input
//                     type="number"
//                     value={inputState.amount}
//                     name="amount"
//                     placeholder="Expense Amount"
//                     onChange={handleInput('amount')}
//                 />
//             </div>
//             <div className="input-control">
//                 <h2 className='income'>Income/Expense</h2>
//                 <select
//                     required
//                     value={inputState.type}
//                     name="type"
//                     id="type"
//                     onChange={handleInput('type')}
//                 >
//                     <option value="" disabled>Select Type</option>
//                     <option value="Income">Income</option>
//                     <option value="Expense">Expense</option>
//                 </select>
//             </div>
//             <div className="input-control">
//                 <h2 className='date'>Date</h2>
//                 <DatePicker
//                     id="date"
//                     placeholderText="Enter A Date"
//                     selected={inputState.date}
//                     dateFormat="yyyy-MM-dd"
//                     onChange={handleDateChange}
//                 />
//             </div>
//             <div className="input-control">
//                 <h2 className='category'>Category</h2>
//                 <select
//                 className='categories'
//                     required
//                     value={inputState.category}
//                     name="category"
//                     id="category"
//                     onChange={handleInput('category')}
//                 >
//                     <option value="" disabled>Select Category</option>
//                     <option value="education">Education</option>
//                     <option value="groceries">Groceries</option>
//                     <option value="health">Health</option>
//                     <option value="subscriptions">Subscriptions</option>
//                     <option value="takeaways">Takeaways</option>
//                     <option value="clothing">Clothing</option>
//                     <option value="travelling">Travelling</option>
//                     <option value="other">Other</option>
//                 </select>
//             </div>
           
//             <div className="submit-btn">
//                 <button type="submit">Add Expense</button>
//                 {id && <button onClick={handleUpdate}>Update Expense</button>}
//             </div>
//         </form>
//         </div>
//     );
// }

// export default ExpenseForm;

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './ExpenseForm.css';

function ExpenseForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        type: '',
        date: new Date(), 
        category: '',
        description: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchExpense();
        }
    }, [id]);

    const fetchExpense = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/expenses/${id}`);
            const expense = response.data[0];
    
            if (expense) {
                setInputState({
                    title: expense.title,
                    amount: expense.amount,
                    type: expense.type,
                    date: new Date(expense.date),
                    category: expense.category,
                    description: expense.description,
                });
            } else {
                setError('Expense data not found or invalid.');
            }
        } catch (err) {
            console.error(err);
            setError('Error fetching expense data.');
        }
    };

    const handleInput = (name) => (e) => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleDateChange = (date) => {
        setInputState({ ...inputState, date: date });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedDate = inputState.date.toISOString().split('T')[0];
            const user_id = localStorage.getItem('user_id');  // Get the user ID from localStorage

            if (!user_id) {
                setError('User not logged in');
                return;
            }

            const expenseData = {
                ...inputState,
                date: formattedDate,
                user_id  // Include the user ID in the expense data
            };

            await axios.post('http://localhost:5000/api/expenses', expenseData);

            setInputState({
                title: '',
                amount: '',
                type: '',
                date: new Date(), 
                category: '',
                description: '',
            });
            navigate('/expenses'); // Navigate to the list screen after submission
        } catch (err) {
            setError(err.response?.data || 'Server Error');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formattedDate = inputState.date.toISOString().split('T')[0];
            const user_id = localStorage.getItem('user_id');  // Get the user ID from localStorage

            if (!user_id) {
                setError('User not logged in');
                return;
            }

            const expenseData = {
                ...inputState,
                date: formattedDate,
                user_id  // Include the user ID in the expense data
            };

            await axios.put(`http://localhost:5000/api/expenses/update/${id}`, expenseData);

            setInputState({
                title: '',
                amount: '',
                type: '',
                date: new Date(), 
                category: '',
                description: '',
            });
            navigate('/chart'); // Navigate to the list screen after update
        } catch (err) {
            setError(err.response?.data || 'Server Error');
        }
    };


    return (
        <div className='expense'>
            <h1>Expenses</h1>
            <form className="expense-form" onSubmit={id ? handleUpdate : handleSubmit}>
                {error && <p className='error'>{error}</p>}
                <div className="input-control">
                    <h2 className='title'>Title</h2>
                    <input
                        type="text"
                        value={inputState.title}
                        name="title"
                        placeholder="Expense Title"
                        onChange={handleInput('title')}
                    />
                </div>
                <div className="input-control">
                    <h2 className='amount'>Amount</h2>
                    <input
                        type="number"
                        value={inputState.amount}
                        name="amount"
                        placeholder="Expense Amount"
                        onChange={handleInput('amount')}
                    />
                </div>
                <div className="input-control">
                    <h2 className='income'>Income/Expense</h2>
                    <select
                        required
                        value={inputState.type}
                        name="type"
                        id="type"
                        onChange={handleInput('type')}
                    >
                        <option value="" disabled>Select Type</option>
                        <option value="income">income</option>
                        <option value="expense">expense</option>
                    </select>
                </div>
                <div className="input-control">
                    <h2 className='date'>Date</h2>
                    <DatePicker
                        id="date"
                        placeholderText="Enter A Date"
                        selected={inputState.date}
                        dateFormat="yyyy-MM-dd"
                        onChange={handleDateChange}
                    />
                </div>
                <div className="input-control">
                    <h2 className='category'>Category</h2>
                    <select
                        className='categories'
                        required
                        value={inputState.category}
                        name="category"
                        id="category"
                        onChange={handleInput('category')}
                    >
                        <option value="" disabled>Select Category</option>
                        <option value="education">Education</option>
                        <option value="groceries">Groceries</option>
                        <option value="health">Health</option>
                        <option value="subscriptions">Subscriptions</option>
                        <option value="takeaways">Takeaways</option>
                        <option value="clothing">Clothing</option>
                        <option value="travelling">Travelling</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="submit-btn">
                    <button type="submit">{id ? 'Update Expense' : 'Add Expense'}</button>
                </div>
            </form>
        </div>
    );
}

export default ExpenseForm;

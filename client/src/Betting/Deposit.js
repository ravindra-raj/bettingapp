// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

// function Deposit() {
//     const [userId, setUserId] = useState('');
//     const [amount, setAmount] = useState('');
//     const [transactions, setTransactions] = useState([]);
//     const [showModal, setShowModal] = useState(false); // State to control the popup modal
//     const [hoveredPayment, setHoveredPayment] = useState(''); // State for hovered payment method
//     const navigate = useNavigate();

//     // Function to handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         localStorage.setItem('amount', amount);
//         setShowModal(true); // Show the modal when "Next" is clicked
//     };

//     // Function to fetch transactions
//     const fetchTransactions = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/transactions');
//             setTransactions(response.data);
//         } catch (error) {
//             console.error('Error fetching transactions:', error);
//         }
//     };

//     // Fetch transactions on component mount
//     useEffect(() => {
//         const storedUserId = localStorage.getItem('user_id');
//         if (storedUserId) {
//             setUserId(storedUserId);
//         }
//         fetchTransactions();
//     }, []);

//     useEffect(() => {
//         if (userId) {
//             localStorage.setItem('user_id', userId);
//         }
//     }, [userId]);

//     const handleAmountPreset = (presetAmount) => {
//         setAmount(presetAmount);
//     };

//     const handleQuickPay = () => {
//         setHoveredPayment('UPI'); // Simulate hover effect on UPI button
//     };

//     const handleContinue = () => {
//         setShowModal(false);
//         navigate('/payment'); // Navigate to the payment page
//     };

//     return (
//         <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//             <h2>Deposit</h2>

//             <div style={{ marginBottom: '20px' }}>
//                 <button
//                     type="button"
//                     onClick={handleQuickPay}
//                     style={{ padding: '10px', fontSize: '16px', backgroundColor: '#f0ad4e', color: '#fff', cursor: 'pointer' }}
//                 >
//                     Quick Pay
//                 </button>
//             </div>

//             <div style={{ marginBottom: '20px' }}>
//                 <button
//                     onMouseEnter={() => setHoveredPayment('UPI')}
//                     style={{
//                         padding: '10px',
//                         fontSize: '16px',
//                         backgroundColor: hoveredPayment === 'UPI' ? '#4CAF50' : '#c8e6c9',
//                         color: '#fff',
//                         marginRight: '10px',
//                         cursor: 'pointer',
//                     }}
//                 >
//                     UPI
//                 </button>
//                 <button
//                     onMouseEnter={() => setHoveredPayment('PhonePe')}
//                     style={{
//                         padding: '10px',
//                         fontSize: '16px',
//                         backgroundColor: hoveredPayment === 'PhonePe' ? '#5e2e91' : '#d1c4e9',
//                         color: '#fff',
//                         marginRight: '10px',
//                         cursor: 'pointer',
//                     }}
//                 >
//                     PhonePe
//                 </button>
//                 <button
//                     onMouseEnter={() => setHoveredPayment('Paytm')}
//                     style={{
//                         padding: '10px',
//                         fontSize: '16px',
//                         backgroundColor: hoveredPayment === 'Paytm' ? '#00baff' : '#b3e5fc',
//                         color: '#fff',
//                         cursor: 'pointer',
//                     }}
//                 >
//                     Paytm
//                 </button>
//             </div>

//             <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
//                 <div style={{ marginBottom: '20px' }}>
//                     <label style={{ display: 'block', marginBottom: '5px' }}>Amount:</label>
//                     <input
//                         type="number"
//                         step="0.01"
//                         value={amount}
//                         onChange={(e) => setAmount(e.target.value)}
//                         required
//                         style={{ padding: '8px', fontSize: '16px', width: '80%',border:'2px solid black' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '20px' }}>
//                     <button
//                         type="button"
//                         onClick={() => handleAmountPreset(300)}
//                         style={{ padding: '10px', fontSize: '16px', marginRight: '5px' }}
//                     >
//                         300
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => handleAmountPreset(500)}
//                         style={{ padding: '10px', fontSize: '16px', marginRight: '5px' }}
//                     >
//                         500
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => handleAmountPreset(1000)}
//                         style={{ padding: '10px', fontSize: '16px', marginRight: '5px' }}
//                     >
//                         1000
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => handleAmountPreset(2000)}
//                         style={{ padding: '10px', fontSize: '16px', marginRight: '5px' }}
//                     >
//                         2000
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => handleAmountPreset(5000)}
//                         style={{ padding: '10px', fontSize: '16px' }}
//                     >
//                         5000
//                     </button>
//                 </div>
//                 <button
//                     type="submit"
//                     style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//                 >
//                     Next
//                 </button>
//             </form>

//             {/* {showModal && (
//                 <div
//                     style={{
//                         position: 'fixed',
//                         top: '50%',
//                         left: '50%',
//                         transform: 'translate(-50%, -50%)',
//                         width: '80%',
//                         height: '30vh',
//                         backgroundColor: '#fff',
//                         border: '1px solid #ccc',
//                         borderRadius: '8px',
//                         boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
//                         padding: '20px',
//                         zIndex: 1000,
//                     }}
//                 >
//                     <h3>Confirm Payment</h3>
//                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                     <div style={{ marginTop: '20px', textAlign: 'right' }}>
//                         <button
//                             onClick={() => setShowModal(false)}
//                             style={{
//                                 padding: '10px 20px',
//                                 fontSize: '16px',
//                                 marginRight: '10px',
//                                 backgroundColor: '#ccc',
//                                 color: '#fff',
//                                 border: 'none',
//                                 borderRadius: '5px',
//                                 cursor: 'pointer',
//                             }}
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             onClick={handleContinue}
//                             style={{
//                                 padding: '10px 20px',
//                                 fontSize: '16px',
//                                 backgroundColor: '#4CAF50',
//                                 color: '#fff',
//                                 border: 'none',
//                                 borderRadius: '5px',
//                                 cursor: 'pointer',
//                             }}
//                         >
//                             Continue
//                         </button>
//                     </div>
//                 </div>
//             )} */}
//             {showModal && (
//     <div
//         style={{
//             position: 'fixed',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: '80%',
//             height: '40vh', // Increased height for more content
//             backgroundColor: '#fff',
//             border: '1px solid #ccc',
//             borderRadius: '8px',
//             boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
//             padding: '20px',
//             zIndex: 1000,
//         }}
//     >
//         <h3>Confirm Payment</h3>
//         <p>Please review the payment details below:</p>
//         <div style={{ marginBottom: '20px' }}>
//             <p><strong>Amount:</strong> ${amount.toFixed(2)}</p> {/* Replace 'amount' with your variable holding the amount */}
//             <p><strong>GST (5%):</strong> ${(amount * 0.05).toFixed(2)}</p> {/* Calculating GST */}
//             <p><strong>Total Amount:</strong> ${(amount - (amount * 0.05)).toFixed(2)}</p> {/* Total after GST */}
//         </div>
//         <p>Note: A GST of 5% will be added to the total amount.</p> {/* Additional note */}
//         <div style={{ marginTop: '20px', textAlign: 'right' }}>
//             <button
//                 onClick={() => setShowModal(false)}
//                 style={{
//                     padding: '10px 20px',
//                     fontSize: '16px',
//                     marginRight: '10px',
//                     backgroundColor: '#ccc',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: 'pointer',
//                 }}
//             >
//                 Cancel
//             </button>
//             <button
//                 onClick={handleContinue}
//                 style={{
//                     padding: '10px 20px',
//                     fontSize: '16px',
//                     backgroundColor: '#4CAF50',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: 'pointer',
//                 }}
//             >
//                 Continue
//             </button>
//         </div>
//     </div>
// )}

//         </div>
//     );
// }

// export default Deposit;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Deposit.css'; // Import your CSS file

function Deposit() {
    const [userId, setUserId] = useState('');
    const [amount, setAmount] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [hoveredPayment, setHoveredPayment] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('amount', amount);
        setShowModal(true);
    };

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/transactions');
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem('user_id');
        if (storedUserId) {
            setUserId(storedUserId);
        }
        fetchTransactions();
    }, []);

    useEffect(() => {
        if (userId) {
            localStorage.setItem('user_id', userId);
        }
    }, [userId]);

    const handleAmountPreset = (presetAmount) => {
        setAmount(presetAmount);
    };

    const handleQuickPay = () => {
        setHoveredPayment('UPI');
    };

    const handleContinue = () => {
        setShowModal(false);
        navigate('/payment');
    };

    return (
        <div className="deposit-container">
            <h2>Deposit</h2>

            <div className="quick-pay-container">
                <button type="button" onClick={handleQuickPay} className="quick-pay-button">
                    Quick Pay
                </button>
            </div>

            <div className="payment-buttons">
                <button
                    onMouseEnter={() => setHoveredPayment('UPI')}
                    className={`payment-button ${hoveredPayment === 'UPI' ? 'hovered' : ''}`}
                    style={{background:' #4CAF50'}}
                >
                    UPI
                </button>
                <button
                    onMouseEnter={() => setHoveredPayment('PhonePe')}
                    className={`payment-button ${hoveredPayment === 'PhonePe' ? 'hovered' : ''}`}
                    style={{background:' #5e2e91'}}
                >
                    PhonePe
                </button>
                <button
                    onMouseEnter={() => setHoveredPayment('Paytm')}
                    className={`payment-button ${hoveredPayment === 'Paytm' ? 'hovered' : ''}`}
                    style={{background:'#00baff'}}
               >
                    Paytm
                </button>
            </div>

            <form onSubmit={handleSubmit} className="deposit-form">
                <div className="amount-input-container">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="Enter amount"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="amount-input"
                    />
                </div>
                <div className="preset-buttons">
                    {[300, 500, 1000, 2000, 5000].map((preset) => (
                        <button
                            key={preset}
                            type="button"
                            onClick={() => handleAmountPreset(preset)}
                            className="preset-button"
                        >
                            {preset}
                        </button>
                    ))}
                </div>
                <button type="submit" className="next-button">
                    Next
                </button>
            </form>

            {showModal && (
                <div className="modal">
                    <h3>Confirm Payment</h3>
                    <p>Please review the payment details below:</p>
                    <div className="payment-details">
                        <p><strong>Amount:</strong> ${amount.toFixed(2)}</p>
                        <p><strong>GST (5%):</strong> ${(amount * 0.05).toFixed(2)}</p>
                        <p><strong>Total Amount:</strong> ${(amount - (amount * 0.05)).toFixed(2)}</p>
                    </div>
                    <p>Note: A GST of 5% will be added to the total amount.</p>
                    <div className="modal-buttons">
                        <button onClick={() => setShowModal(false)} className="cancel-button">
                            Cancel
                        </button>
                        <button onClick={handleContinue} className="continue-button">
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Deposit;

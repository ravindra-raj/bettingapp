// import React, { useState } from 'react';
// import axios from 'axios';

// function PaymentPage() {
//     const [selectedPayment, setSelectedPayment] = useState('');
//     const [upiId, setUpiId] = useState('');
//     const [uriNumber, setUriNumber] = useState('');
//     const [upiNumber, setUpiNumber] = useState(''); // Added UPI number field

//     const handlePaymentClick = (paymentMethod) => {
//         setSelectedPayment(paymentMethod);
//         if (paymentMethod === 'Paytm') {
//             window.location.href = 'https://paytm.com/'; // Simulate opening the Paytm app
//         } else if (paymentMethod === 'PhonePe') {
//             window.location.href = 'https://www.phonepe.com/'; // Simulate opening the PhonePe app
//         }
//     };

//     const handleSubmit = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/transactions', {
//                 user_id: localStorage.getItem('user_id'),
//                 transaction_type: 'Deposit',
//                 amount: parseFloat(localStorage.getItem('amount')), // Amount stored from the previous step
//                 upi_id: upiId,
//                 uri_number: uriNumber,
//                 upi_number: upiNumber, // Added UPI number field to the request
//             });
//             console.log('Transaction successful:', response.data);
//             alert('Transaction successful!');
//         } catch (error) {
//             console.error('Error processing transaction:', error);
//             alert('Transaction failed!');
//         }
//     };

//     return (
//         <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//             <h2>Select Payment Method</h2>
//             <div style={{ marginBottom: '20px' }}>
//                 <button
//                     onClick={() => handlePaymentClick('Paytm')}
//                     style={{ padding: '10px', fontSize: '16px', backgroundColor: '#00baff', color: '#fff', marginRight: '10px' }}
//                 >
//                     Paytm
//                 </button>
//                 <button
//                     onClick={() => handlePaymentClick('PhonePe')}
//                     style={{ padding: '10px', fontSize: '16px', backgroundColor: '#5e2e91', color: '#fff', marginRight: '10px' }}
//                 >
//                     PhonePe
//                 </button>
//                 <button
//                     onClick={() => setSelectedPayment('UPI')}
//                     style={{ padding: '10px', fontSize: '16px', backgroundColor: '#4caf50', color: '#fff' }}
//                 >
//                     UPI
//                 </button>
//             </div>

//             {selectedPayment === 'UPI' && (
//                 <div>
//                     <div style={{ marginBottom: '10px' }}>
//                         <label style={{ display: 'block', marginBottom: '5px' }}>Enter UPI ID:</label>
//                         <input
//                             type="text"
//                             value={upiId}
//                             onChange={(e) => setUpiId(e.target.value)}
//                             style={{ padding: '8px', fontSize: '16px', width: '100%' }}
//                         />
//                     </div>
                    
                   
//                 </div>
//             )}
//              <div style={{ marginBottom: '10px' }}>
//                         <label style={{ display: 'block', marginBottom: '5px' }}>Enter 12-digit UPI Number:</label>
//                         <input
//                             type="text"
//                             value={upiNumber}
//                             onChange={(e) => setUpiNumber(e.target.value)}
//                             style={{ padding: '8px', fontSize: '16px', width: '100%' }}
//                             maxLength={12} // Limit input to 12 digits
//                         />
//                     </div>
                   
//                     <button
//                         onClick={handleSubmit}
//                         style={{ padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//                     >
//                         Confirm Payment
//                     </button>
//         </div>
//     );
// }

// export default PaymentPage;

// import React, { useState } from 'react';
// import axios from 'axios';

// function PaymentPage() {
//     const [selectedPayment, setSelectedPayment] = useState('');
//     const [upiId, setUpiId] = useState('');
//     const [upiNumber, setUpiNumber] = useState(''); // Ensure UPI number is being handled correctly
//     const [uriNumber, setUriNumber] = useState('');

//     const handlePaymentClick = (paymentMethod) => {
//         setSelectedPayment(paymentMethod);
//         if (paymentMethod === 'Paytm') {
//             window.location.href = 'https://paytm.com/'; // Simulate opening the Paytm app
//         } else if (paymentMethod === 'PhonePe') {
//             window.location.href = 'https://www.phonepe.com/'; // Simulate opening the PhonePe app
//         }
//     };

//     const handleSubmit = async () => {
//         // Log data for debugging
//         console.log('Submitting data:', {
//             user_id: localStorage.getItem('user_id'),
//             transaction_type: 'Deposit',
//             amount: parseFloat(localStorage.getItem('amount')),
//             upi_id: upiId,
//             uri_number: uriNumber,
//             upi_number: upiNumber
//         });

//         try {
//             const response = await axios.post('http://localhost:5000/api/transactions', {
//                 user_id: localStorage.getItem('user_id'),
//                 transaction_type: 'Deposit',
//                 amount: parseFloat(localStorage.getItem('amount')),
//                 upi_id: upiId || null, // Send null if empty
//                 uri_number: uriNumber || null, // Send null if empty
//                 upi_number: upiNumber || null // Send null if empty
//             });
//             console.log('Transaction successful:', response.data);
//             alert('Transaction successful!');
//         } catch (error) {
//             // Log full error response for debugging
//             console.error('Error processing transaction:', error.response?.data || error.message);
//             alert('Transaction failed!');
//         }
//     };

//     return (
//         <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', marginBottom: '100px' }}>
//             <h2>Select Payment Method</h2>
//             <div style={{ marginBottom: '20px',marginLeft:'60px' }}>
//                 <button
//                     onClick={() => handlePaymentClick('Paytm')}
//                     style={{ padding: '10px', fontSize: '16px', backgroundColor: '#00baff', color: '#fff', marginRight: '10px' }}
//                 >
//                     Paytm
//                 </button>
//                 <button
//                     onClick={() => handlePaymentClick('PhonePe')}
//                     style={{ padding: '10px', fontSize: '16px', backgroundColor: '#5e2e91', color: '#fff', marginRight: '10px' }}
//                 >
//                     PhonePe
//                 </button>
//                 <button
//                     onClick={() => setSelectedPayment('UPI')}
//                     style={{ padding: '10px', fontSize: '16px', backgroundColor: '#4caf50', color: '#fff' }}
//                 >
//                     UPI
//                 </button>
//             </div>

//             {selectedPayment === 'UPI' && (
//                 <div>
//                     <div style={{ marginBottom: '10px' }}>
//                         <label style={{ display: 'block', marginBottom: '5px' }}>Enter UPI ID:</label>
//                         <input
//                             type="text"
//                             value={upiId}
//                             onChange={(e) => setUpiId(e.target.value)}
//                             style={{ padding: '8px', fontSize: '16px', width: '100%' }}
//                         />
//                     </div>
                    
                    
                    
                    
//                     </div>
                
//             )}
//            <div>
//     <img 
//         src="/images/q-code.jpg" 
//         alt="QR Code" 
//         style={{ 
//             width: '100%', 
//             maxWidth: '300px', // Ensure it scales correctly on mobile
//             height: 'auto',
//             display: 'block',
//             margin: '20px auto' // Center the image
//         }} 
//     />
// </div>

//             <div style={{ marginBottom: '10px' }}>
//                         <label style={{ display: 'block', marginBottom: '5px' }}>Enter 12-digit UrI Number:</label>
//                         <input
//                             type="text"
//                             value={uriNumber}
//                             onChange={(e) => setUriNumber(e.target.value)}
//                             style={{ padding: '8px', fontSize: '16px', width: '100%' }}
//                             maxLength={12} // Limit input to 12 digits
//                         />
//                     </div>
//             <button
//                 onClick={handleSubmit}
//                 style={{ padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//             >
//                 Confirm Payment
//             </button>
//         </div>
//     );
// }

// export default PaymentPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function PaymentPage() {
//     const [selectedPayment, setSelectedPayment] = useState('');
//     const [upiId, setUpiId] = useState('');
//     const [upiNumber, setUpiNumber] = useState(''); // Ensure UPI number is being handled correctly
//     const [uriNumber, setUriNumber] = useState('');
//     const [userId, setUserId] = useState(''); // Store the user_id

//     // Fetch user_id from localStorage when the component mounts
//     useEffect(() => {
//         const storedUserId = localStorage.getItem('user_id');
//         if (storedUserId) {
//             setUserId(storedUserId);
//         } else {
//             console.error('User ID not found in localStorage');
//         }
//     }, []);

//     const handlePaymentClick = (paymentMethod) => {
//         setSelectedPayment(paymentMethod);
//         if (paymentMethod === 'Paytm') {
//             window.location.href = 'https://paytm.com/'; // Simulate opening the Paytm app
//         } else if (paymentMethod === 'PhonePe') {
//             window.location.href = 'https://www.phonepe.com/'; // Simulate opening the PhonePe app
//         }
//     };

//     const handleSubmit = async () => {
//         // Log data for debugging
//         console.log('Submitting data:', {
//             user_id: userId, // Use the userId from state
//             transaction_type: 'Deposit',
//             amount: parseFloat(localStorage.getItem('amount')),
//             upi_id: upiId,
//             uri_number: uriNumber,
//             upi_number: upiNumber
//         });

//         try {
//             const response = await axios.post('http://localhost:5000/api/transactions', {
//                 user_id: userId, // Send userId in the request
//                 transaction_type: 'Deposit',
//                 amount: parseFloat(localStorage.getItem('amount')),
//                 upi_id: upiId || null, // Send null if empty
//                 uri_number: uriNumber || null, // Send null if empty
//                 upi_number: upiNumber || null // Send null if empty
//             });
//             console.log('Transaction successful:', response.data);
//             alert('Transaction successful!');
//         } catch (error) {
//             // Log full error response for debugging
//             console.error('Error processing transaction:', error.response?.data || error.message);
//             alert('Transaction failed!');
//         }
//     };

//     return (
//         <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', marginBottom: '100px' }}>
//             <h2>Select Payment Method</h2>
//             <div style={{ marginBottom: '20px', marginLeft: '60px' }}>
//                 <button
//                     onClick={() => handlePaymentClick('Paytm')}
//                     style={{ padding: '10px', fontSize: '16px', backgroundColor: '#00baff', color: '#fff', marginRight: '10px' }}
//                 >
//                     Paytm
//                 </button>
//                 <button
//                     onClick={() => handlePaymentClick('PhonePe')}
//                     style={{ padding: '10px', fontSize: '16px', backgroundColor: '#5e2e91', color: '#fff', marginRight: '10px' }}
//                 >
//                     PhonePe
//                 </button>
//                 <button
//                     onClick={() => setSelectedPayment('UPI')}
//                     style={{ padding: '10px', fontSize: '16px', backgroundColor: '#4caf50', color: '#fff' }}
//                 >
//                     UPI
//                 </button>
//             </div>

//             {selectedPayment === 'UPI' && (
//                 <div>
//                     <div style={{ marginBottom: '10px' }}>
//                         <label style={{ display: 'block', marginBottom: '5px' }}>Enter UPI ID:</label>
//                         <input
//                             type="text"
//                             value={upiId}
//                             onChange={(e) => setUpiId(e.target.value)}
//                             style={{ padding: '8px', fontSize: '16px', width: '100%' }}
//                         />
//                     </div>
//                 </div>
//             )}

//             <div>
//                 <img 
//                     src="/images/q-code.jpg" 
//                     alt="QR Code" 
//                     style={{ 
//                         width: '100%', 
//                         maxWidth: '300px', // Ensure it scales correctly on mobile
//                         height: 'auto',
//                         display: 'block',
//                         margin: '20px auto' // Center the image
//                     }} 
//                 />
//             </div>

//             <div style={{ marginBottom: '10px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>Enter 12-digit Uri Number:</label>
//                 <input
//                     type="text"
//                     value={uriNumber}
//                     onChange={(e) => setUriNumber(e.target.value)}
//                     style={{ padding: '8px', fontSize: '16px', width: '100%' }}
//                     maxLength={12} // Limit input to 12 digits
//                 />
//             </div>
//             <button
//                 onClick={handleSubmit}
//                 style={{ padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//             >
//                 Confirm Payment
//             </button>
//         </div>
//     );
// }

// export default PaymentPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css'; // Import the CSS styles

function PaymentPage() {
    const [selectedPayment, setSelectedPayment] = useState('');
    const [upiId, setUpiId] = useState('');
    const [uriNumber, setUriNumber] = useState('');
    const [userId, setUserId] = useState('');
const navigate=useNavigate();
    useEffect(() => {
        const storedUserId = localStorage.getItem('user_id');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error('User ID not found in localStorage');
        }
    }, []);

    const handlePaymentClick = (paymentMethod) => {
        setSelectedPayment(paymentMethod);
        if (paymentMethod === 'Paytm') {
            window.location.href = 'https://paytm.com/'; // Simulate opening the Paytm app
        } else if (paymentMethod === 'PhonePe') {
            window.location.href = 'https://www.phonepe.com/'; // Simulate opening the PhonePe app
        }
    };

    const handleSubmit = async () => {
        console.log('Submitting data:', {
            user_id: userId,
            transaction_type: 'Deposit',
            amount: parseFloat(localStorage.getItem('amount')),
            upi_id: upiId,
            uri_number: uriNumber
        });

        try {
            const response = await axios.post('http://localhost:5000/api/transactions', {
                user_id: userId,
                transaction_type: 'Deposit',
                amount: parseFloat(localStorage.getItem('amount')),
                upi_id: upiId || null,
                uri_number: uriNumber || null
            });
            console.log('Transaction successful:', response.data);
            alert('Transaction successful!');
            navigate(`/me/:username`);
        } catch (error) {
            console.error('Error processing transaction:', error.response?.data || error.message);
            alert('Transaction failed!');
        }
    };

    return (
        <div className="payment-page">
            <h2>Select Payment Method</h2>
            <div className="payment-buttons">
                <button
                    onClick={() => handlePaymentClick('Paytm')}
                    className="payment-button paytm"
                >
                    Paytm
                </button>
                <button
                    onClick={() => handlePaymentClick('PhonePe')}
                    className="payment-button phonepe"
                >
                    PhonePe
                </button>
                <button
                    onClick={() => setSelectedPayment('UPI')}
                    className="payment-button upi"
                >
                    UPI
                </button>
            </div>

            {selectedPayment === 'UPI' && (
                <div>
                    <div className="upi-input">
                        <label style={{ display: 'block', marginBottom: '5px' }}>Enter UPI ID:</label>
                        <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            style={{ padding: '8px', fontSize: '16px', width: '100%' }}
                        />
                    </div>
                </div>
            )}

            <div>
                <img 
                    src="/images/q-code.jpg" 
                    alt="QR Code" 
                    className="qr-code"
                />
            </div>

            <div className="uri-input">
                <label style={{ display: 'block', marginBottom: '5px' }}>Enter 12-digit Uri Number:</label>
                <input
                    type="text"
                    value={uriNumber}
                    onChange={(e) => setUriNumber(e.target.value)}
                    style={{ padding: '8px', fontSize: '16px', width: '100%' }}
                    maxLength={12}
                />
            </div>
            <button
                onClick={handleSubmit}
                style={{ padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Confirm Payment
            </button>
        </div>
    );
}

export default PaymentPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './List.css'
// const List = () => {
//     const [negativeCreditScores, setNegativeCreditScores] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchNegativeCreditScores = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/admin/negative-creditscores/today');
//                 setNegativeCreditScores(response.data.negativeCreditScores);
//             } catch (err) {
//                 setError('Error fetching negative credit scores.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchNegativeCreditScores();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <div className='list-container'>
//             <h2>Negative Credit Scores Today</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>User ID</th>
//                         <th>Username</th>
//                         <th>Credit Score</th>
//                         <th>Total Deposits Today</th>
//                         <th>Total Withdrawals Today</th>
//                         {/* <th>Loss Amount</th> */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {negativeCreditScores.map((score) => (
//                         <tr key={score.userId}>
//                             <td>{score.userId}</td>
//                             <td>{score.username}</td>
//                             <td>{score.creditScore}</td>
//                             <td>{score.totalDepositsToday}</td>
//                             <td>{score.totalWithdrawalsToday}</td>
//                             {/* <td>{score.lossAmount}</td> */}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default List;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './List.css';

const List = () => {
    const [negativeCreditScores, setNegativeCreditScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNegativeCreditScores = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/negative-creditscores/today');
                setNegativeCreditScores(response.data.negativeCreditScores);
            } catch (err) {
                setError('Error fetching negative credit scores.');
            } finally {
                setLoading(false);
            }
        };

        fetchNegativeCreditScores();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="list-container" >
            <h2 className="list-heading">Negative Credit Scores Today</h2>
            <table className="table">
                <thead className="table-head">
                    <tr className="table-row">
                        <th className="table-header">User ID</th>
                        <th className="table-header">Username</th>
                        <th className="table-header">Credit Score</th>
                        <th className="table-header">Total Deposits Today</th>
                        <th className="table-header">Total Withdrawals Today</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {negativeCreditScores.map((score) => (
                        <tr key={score.userId} className="table-row">
                            <td className="table-body-cell" data-label="User ID">{score.userId}</td>
                            <td className="table-body-cell" data-label="Username">{score.username}</td>
                            <td className="table-body-cell" data-label="Credit Score">{score.creditScore}</td>
                            <td className="table-body-cell" data-label="Total Deposits">{score.totalDepositsToday}</td>
                            <td className="table-body-cell" data-label="Total Withdrawals">{score.totalWithdrawalsToday}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;

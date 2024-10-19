import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDashboard = () => {
  const { userId } = useParams(); // Extract userId from route parameters
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/userdetails/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <div>
      <h2>Welcome to User Dashboard</h2>
      {userData && (
        <div>
          <p>UserId: {userData.id}</p>
          <p>Username: {userData.username}</p>
          <p>Role: {userData.role}</p>
          <p>Email: {userData.email}</p>
          <p>Mobile Number: {userData.contact_number}</p>
          <p>Primary Name: {userData.primary_name}</p>

       
          {/* Include other fields as needed */}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

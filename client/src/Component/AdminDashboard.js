import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AdminUserDetails = () => {
  const [userData, setUserData] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchAdminUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/adminuserdetails/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching admin user details:', error);
      }
    };

    fetchAdminUserDetails();
  }, [userId]);

  return (
    <div>
      <h2>Admin User Details</h2>
      {userData && (
        <div>
        <p>UserId: {userData.id}</p>
          <p>Username: {userData.username}</p>
          <p>Role: {userData.role}</p>
          <p>Email: {userData.email}</p>
          <p>Mobile Number: {userData.contact_number}</p>
          <p>Primary Name: {userData.primary_name}</p>
        </div>
      )}
    </div>
  );
};

export default AdminUserDetails;

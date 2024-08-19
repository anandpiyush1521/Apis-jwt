import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageTitle from '../components/PageTitle'; // Ensure correct import path
import Navbar from '../components/Navbar'; // Ensure correct import path

const Confirm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/me', {
          withCredentials: true, // Include this option to send cookies
        });
        setUser(response.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Clear user data from local storage
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear access token cookie
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear refresh token cookie
    navigate("/login");
  };

  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="text-center">
      <PageTitle title="Confirm" />
      <Navbar />
      <h1>Welcome, {user.username}!</h1>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout} className="btn btn-primary mt-3">Logout</button>
    </div>
  );
};

export default Confirm;

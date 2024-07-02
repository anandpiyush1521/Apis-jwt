import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';

const Confirm = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user-related data if necessary
    localStorage.removeItem("token"); // Clear user data from local storage (optional)
    navigate("/login");
  };

  return (
    <div className="text-center">
      <PageTitle title="Confirm" />
      <Navbar />
      <h1>Confirmation working</h1>
      <button onClick={handleLogout} className="btn btn-primary mt-3">Logout</button>
    </div>
  );
};

export default Confirm;

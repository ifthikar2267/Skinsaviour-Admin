import React from 'react';
import { assets } from '../assets/assets';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ setToken }) => {
  const navigate = useNavigate(); // Moved inside the component

  const handleLogout = () => {
    setToken('');
    navigate('/admin-login'); // Corrected navigation
  };

  return (
    <div className="d-flex align-items-center justify-content-between py-2 px-4 bg-white shadow-sm border-bottom">
      <img
        alt="Logo"
        src={assets.logo}
        className="rounded-circle"
        width="50"
        height="50"
      />
      
      <p className="mb-0 fw-bold text-black">ADMIN PANEL</p>

      <button onClick={handleLogout} className="btn btn-secondary px-3 px-sm-4 py-2 rounded-pill btn-sm">
        LOGOUT
      </button>
    </div>
  );
};

export default NavBar;

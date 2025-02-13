import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = process.env.REACT_APP_BACKEND_URL ;
export const currency = "₹";


const App = () => {

  const [token, setToken] = useState( localStorage.getItem('token') ? localStorage.getItem('token') : "");

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className="bg-white min-vh-100">
      <ToastContainer/>
      {token === '' ? (
        <Login setToken = {setToken}/>
      ) : (
        <>
          <NavBar  setToken = {setToken} />
          <div className="d-flex w-100">
            <Sidebar />
            <div className="w-75 mx-auto ms-4 my-4 text-secondary">
              <Routes>
              <Route path='/' element={token ? <Navigate to="/add" /> : <Login setToken={setToken} />}/>
              <Route path="/admin-login" element={token ? <Navigate to="/add" /> : <Login setToken={setToken} />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/orders" element={<Orders token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;

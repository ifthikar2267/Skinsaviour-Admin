import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className="w-25 min-vh-100 border-end">
      <div className="d-flex flex-column gap-3 pt-4 ps-4">
        <NavLink
          className="sidebar-link d-flex align-items-center gap-2 border border-secondary-subtle border-end-0 px-3 py-2 rounded text-black text-decoration-none"
          to="/add"
        >
          <img className="w-25" src={assets.add_icon} alt="" />
          <p className="d-none d-md-block mb-0">Add Items</p>
        </NavLink>

        <NavLink
          className="sidebar-link d-flex align-items-center gap-2 border border-secondary-subtle border-end-0 px-3 py-2 rounded text-black text-decoration-none"
          to="/list"
        >
          <img className="w-25" src={assets.order_icon} alt="" />
          <p className="d-none d-md-block mb-0">List Items</p>
        </NavLink>

        <NavLink
          className="sidebar-link d-flex align-items-center gap-2 border border-secondary-subtle border-end-0 px-3 py-2 rounded text-black text-decoration-none"
          to="/orders"
        >
          <img className="w-25" src={assets.parcel_icon} alt="" />
          <p className="d-none d-md-block mb-0">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

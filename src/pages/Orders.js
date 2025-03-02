import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {

      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        {orderId, orderStatus:event.target.value},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if(response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {

      console.log(error);
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="container-fluid px-2 px-sm-3 px-md-4 my-3">
    <h3 className="text-center">Order Page</h3>
    <div>
      {orders.map((order, index) => (
        <div
          className="row border border-1 border-gray-200 p-2 my-2 mx-1 mx-sm-2 mx-md-3 rounded"
          key={index}
        >
          {/* Order Icon */}
          <div className="col-12 col-sm-1 d-flex justify-content-center align-items-center">
            <img className="w-50" src={assets.parcel_icon} alt="Parcel Icon" />
          </div>
  
          {/* Order Details */}
          <div className="col-12 col-sm-6">
            <div>
              {order.items.map((item, index) => (
                <p className="py-0 mb-1" key={index}>
                  {item.title} x {item.quantity}
                  {index !== order.items.length - 1 ? "," : ""}
                </p>
              ))}
            </div>
            <p className="mt-2 fw-bold">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <div>
              <p className="mb-1">{order.shippingAddress.address},</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zipCode}, {order.shippingAddress.country}
              </p>
            </div>
            <p>{order.shippingAddress.phoneNumber}</p>
          </div>
  
          {/* Payment Info */}
          <div className="col-12 col-sm-3">
            <p className="text-sm">Items: {order.items.length}</p>
            <p className="mt-2">Method: {order.paymentMethod}</p>
            <p>Payment: {order.isPaid ? "Done" : "Pending"}</p>
            <p>Date: {new Date(order.date).toISOString().split("T")[0]}</p>
          </div>
  
          {/* Order Total & Status */}
          <div className="col-12 col-sm-2 p-2">
            <p className="text-sm">Total: {currency}{order.totalPrice}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.orderStatus}
              className="form-select p-1 fw-semibold"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Orders;

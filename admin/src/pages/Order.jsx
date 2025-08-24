import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status updated successfully");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Orders</h2>

      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row items-start lg:items-center gap-4 p-5 bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300"
          >
            {/* Parcel Icon */}
            <div className="flex justify-center lg:w-12">
              <img className="w-12 h-12" src={assets.parcel_icon} alt="parcel" />
            </div>

            {/* Items and Address */}
            <div className="flex-1">
              <div className="mb-2">
                {order.items.map((item, idx) => (
                  <span key={idx} className="text-gray-700">
                    {item.name} x {item.quantity} <span>{item.size}</span>
                    {idx !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </div>

              <p className="font-semibold text-gray-800">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="text-gray-600 text-sm">
                {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
              </p>
              <p className="text-gray-600 text-sm">Phone: {order.address.phone}</p>
            </div>

            {/* Payment & Date */}
            <div className="flex flex-col gap-1 text-gray-700 text-sm">
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p className="font-semibold text-gray-800">{currency}{order.amount}</p>
            </div>

            {/* Status Dropdown */}
            <div className="mt-2 lg:mt-0">
              <select
                value={order.status}
                onChange={(event) => statusHandler(event, order._id)}
                className="px-3 py-2 rounded-lg border border-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="OrderPlaced">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;

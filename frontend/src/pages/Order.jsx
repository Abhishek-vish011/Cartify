import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Order = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) return null

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrderItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrderItem.push(item)
          })
        })
        setOrderData(allOrderItem.reverse())
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='px-4 sm:px-8 md:px-16 lg:px-24 py-16 bg-gray-50 min-h-screen'>
      <Title text1={'MY'} text2={'ORDERS'} />

     <div className='mt-8 flex flex-col gap-6'>
  {orderData.map((item, index) => (
    <div
      key={index}
      className='bg-gradient-to-r from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-3xl hover:-translate-y-1'
    >
      {/* Left side: image + details */}
      <div className='flex items-start gap-6'>
        <img
          className='w-24 sm:w-28 rounded-2xl border border-gray-200 shadow-md object-cover'
          src={item.image[0]}
          alt={item.name}
        />
        <div className='flex flex-col justify-between'>
          <p className='sm:text-lg md:text-xl font-bold text-gray-800'>{item.name}</p>
          <div className='flex flex-wrap items-center gap-4 mt-2 text-gray-700 text-sm sm:text-base'>
            <p className='font-medium text-gray-900'>{currency}{item.price}</p>
            <p className='text-gray-600'>Qty: {item.quantity}</p>
            <p className='text-gray-600'>Size: {item.size}</p>
          </div>
          <p className='mt-1 text-gray-500 text-sm'>Date: <span className='font-medium text-gray-700'>{new Date(item.date).toDateString()}</span></p>
          <p className='mt-1 text-gray-500 text-sm'>Payment: <span className='font-medium text-gray-700'>{item.paymentMethod}</span></p>
        </div>
      </div>

            <div className='flex flex-col md:flex-row md:items-center gap-4 md:gap-6'>
              <div className='flex items-center gap-2'>
                <span className={`w-3 h-3 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : item.status === 'Pending' ? 'bg-yellow-400' : 'bg-red-500'}`}></span>
                <p className='text-sm md:text-base font-medium text-gray-700'>{item.status}</p>
              </div>
             <button
  onClick={loadOrderData}
  className="px-5 py-2 text-sm font-semibold rounded-xl bg-pink-700 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
>
  Track Order
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order

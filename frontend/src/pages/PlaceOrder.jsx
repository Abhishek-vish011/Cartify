import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    products,
    token,
    cartItem,
    setCartItem,
    getCartAmount,
    delivery_fee,
  } = useContext(ShopContext);

  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })
          console.log(data.success)
          if (data.success) {
            setCartItem({})
            navigate('/order')
          }
        } catch (err) {
          console.log(err)
          toast.error(err.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      let orderItems = []

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItem({})
            navigate('/order')
          } else {
            toast.error(response.data.message)
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
          console.log(responseStripe.data)
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break;

        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
          console.log(responseRazorpay.data)
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order)
          }
          break;

        default:
          break;
      }

    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col sm:flex-row justify-between gap-6 pt-5 sm:pt-14 min-h-[80vh] border-t bg-gray-50 p-6 rounded-2xl shadow-2xl overflow-visible'
    >
      {/* --------------Left Side -------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[580px] transform transition-all hover:scale-[1.02] duration-500'>
        <div className='text-xl sm:text-2xl my-3 text-gray-800'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded-lg py-2 px-4 w-full shadow-inner focus:shadow-lg focus:outline-none transition-all duration-300' placeholder='First name' type="text" required />
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded-lg py-2 px-4 w-full shadow-inner focus:shadow-lg focus:outline-none transition-all duration-300' placeholder='Last name' type="text" required />
        </div>
        <input onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded-lg py-2 px-4 w-full shadow-inner focus:shadow-lg focus:outline-none transition-all duration-300' placeholder='Email address' type="email" required />
        <input onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded-lg py-2 px-4 w-full shadow-inner focus:shadow-lg focus:outline-none transition-all duration-300' placeholder='Street' type="text" required />
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded-lg py-2 px-4 w-full shadow-inner focus:shadow-lg focus:outline-none transition-all duration-300' placeholder='City' type="text" required />
          <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded-lg py-2 px-4 w-full shadow-inner focus:shadow-lg focus:outline-none transition-all duration-300' placeholder='State' type="text" required />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded-lg py-2 px-4 w-full shadow-inner focus:shadow-lg focus:outline-none transition-all duration-300' placeholder='PinCode' type="number" required />
          <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded-lg py-2 px-4 w-full shadow-inner focus:shadow-lg focus:outline-none transition-all duration-300' placeholder='Country' type="text" required />
        </div>
        <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded-lg py-2 px-4 w-full shadow-inner focus:shadow-lg focus:outline-none transition-all duration-300' placeholder='Phone' type="number" required />
      </div>

      {/* ------------------Right side-------------------- */}
      <div className='mt-8 sm:mt-0'>
        <div className='mt-8 min-w-80 bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 transform transition-all hover:scale-[1.02] duration-500'>
          <CartTotal />
        </div>

        <div className='mt-12 bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 transform transition-all hover:scale-[1.02] duration-500'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* -----------------Payment method selection */}
          <div className='flex gap-3 flex-col lg:flex-row mt-4'>
            <div onClick={() => setMethod('stripe')} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border-2 transform transition-all duration-300 ${method === 'stripe' ? 'border-green-400 shadow-xl scale-[1.03]' : 'border-gray-300 hover:shadow-md hover:scale-[1.02]'}`}>
              <p className={`w-4 h-4 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-6 mx-4' src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div onClick={() => setMethod('razorpay')} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border-2 transform transition-all duration-300 ${method === 'razorpay' ? 'border-green-400 shadow-xl scale-[1.03]' : 'border-gray-300 hover:shadow-md hover:scale-[1.02]'}`}>
              <p className={`w-4 h-4 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-6 mx-4' src={assets.razorpay_logo} alt="Razorpay" />
            </div>
            <div onClick={() => setMethod('cod')} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border-2 transform transition-all duration-300 ${method === 'cod' ? 'border-green-400 shadow-xl scale-[1.03]' : 'border-gray-300 hover:shadow-md hover:scale-[1.02]'}`}>
              <p className={`w-4 h-4 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.05] transform transition-all duration-300'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder

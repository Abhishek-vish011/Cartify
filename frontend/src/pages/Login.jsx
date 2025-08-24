import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (event) =>{
    event.preventDefault();
    try {
      if(currentState === 'Sign Up'){
        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {email, password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch(error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
      if(token){
        navigate('/');
      }
  }, [token])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full max-w-md p-8 gap-5 bg-white rounded-3xl shadow-lg hover:shadow-2xl transform transition-all duration-300'>
        
        {/* Header */}
        <div className='flex items-center gap-3 justify-center mb-4'>
          <p className='text-3xl font-semibold text-gray-800'>{currentState}</p>
          <hr className='border-none h-[2px] w-12 bg-gray-400 rounded-full'/>
        </div>

        {/* Name input for Sign Up */}
        {currentState === 'Sign Up' && 
          <input 
            onChange={(e)=> setName(e.target.value)} 
            value={name} 
            type="text" 
            className='w-full px-4 py-3 border border-gray-300 bg-white rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all' 
            placeholder='Name' 
            required
          />
        }

        {/* Email */}
        <input 
          onChange={(e)=> setEmail(e.target.value)} 
          value={email}  
          type="email" 
          className='w-full px-4 py-3 border border-gray-300 bg-white rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all' 
          placeholder='Email Address' 
          required
        />

        {/* Password */}
        <input 
          onChange={(e)=> setPassword(e.target.value)} 
          value={password} 
          type="password" 
          className='w-full px-4 py-3 border border-gray-300 bg-white rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all' 
          placeholder='Password' 
          required
        />

        {/* Checkbox + Forgot password */}
        <div className='flex justify-between items-center text-sm text-gray-600 mt-1'>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input type="checkbox" className='accent-blue-800' /> Remember password
          </label>
          <p className='cursor-pointer text-blue-800 hover:text-blue-900 transition-colors font-medium'>Forgot password?</p>
        </div>

        {/* Submit button */}
        <button 
          type="submit" 
          className='w-full py-3 mt-4 text-white font-semibold rounded-2xl bg-gray-800 shadow-md hover:shadow-lg transform transition-all hover:scale-105'
        >
          {currentState === 'Sign Up' ? "Sign Up" : "Sign In"}
        </button>

        {/* Switch login/signup */}
        <div className='flex justify-center text-sm text-gray-700 mt-3 gap-1'>
          {currentState === 'Sign Up' ? (
            <p 
              onClick={() => setCurrentState('Login')} 
              className='cursor-pointer text-blue-800 hover:text-blue-900 transition-colors'
            >
              Already have an account? <span className='font-semibold underline'>Sign In</span>
            </p>
          ) : (
            <p 
              onClick={() => setCurrentState('Sign Up')} 
              className='cursor-pointer text-blue-800 hover:text-blue-900 transition-colors'
            >
              Don't have an account? <span className='font-semibold underline'>Sign Up</span>
            </p>
          )}
        </div>

      </form>
    </div>
  )
}

export default Login

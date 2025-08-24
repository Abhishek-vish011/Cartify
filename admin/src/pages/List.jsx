import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast, ToastContainer } from 'react-toastify'

const List = ({token}) => {

  const [list, setList] = useState([])

  const fetchList = async()=>{
       try{
        const response = await axios.get(backendUrl + "/api/product/list")
        if(response.data.success){
          setList(response.data.products)
        }else{
          toast.error(response.data.message)
        }
       }catch(err){
          console.log(err)
          toast.error(err.message)
       }
  }

  const removeProduct = async(id)=>{
        try{
          const response = await axios.post(backendUrl + "/api/product/remove", {id}, {headers: {token}})
         if(response.data.success){
          toast.success(response.data.message)
          await fetchList();
         }else{
          toast.error(response.data.message)
         }
        }catch(err){
           toast.error(err.message)
        }
  }

  useEffect(()=>{
         fetchList()
  }, [])

  return (
    <div className='w-full max-w-6xl mx-auto p-2'>
      <ToastContainer />
      <h2 className='text-2xl font-bold mb-4 text-gray-800'>All Products</h2>

      <div className='flex flex-col gap-3'>
        {/* Table Header for desktop */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-4 px-6 bg-gray-100 rounded-xl font-semibold text-gray-700 text-sm'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className='text-center'>Action</span>
        </div>

        {/* Product List */}
        {list.map((item, index)=>(
          <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-4 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300'>
            
            {/* Product Image */}
            <div className='flex justify-center'>
              <img className='w-16 h-16 object-cover rounded-lg' src={item.image[0]} alt={item.name} />
            </div>

            {/* Product Name */}
            <p className='text-gray-800 font-medium truncate'>{item.name}</p>

            {/* Category */}
            <p className='text-gray-600'>{item.category}</p>

            {/* Price */}
            <p className='text-gray-700 font-semibold'>{currency}{item.price}</p>

            {/* Delete Action */}
            <p 
              onClick={()=> removeProduct(item._id)} 
              className='text-red-600 cursor-pointer text-center font-bold text-lg hover:text-red-400 transition-colors'
            >
              &#10005;
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List

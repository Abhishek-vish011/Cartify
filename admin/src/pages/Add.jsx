import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast, ToastContainer } from 'react-toastify'

const Add = ({token}) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false);
  const [size, setSize] = useState([]);

  const onSubmitHandler = async(e)=>{
        e.preventDefault();
        try{
          const formData = new FormData()
          formData.append("name", name)
          formData.append("description", description)
          formData.append("price", price)
          formData.append("category", category)
          formData.append("SubCategory", subCategory)
          formData.append("bestseller", bestseller)
          formData.append('size', JSON.stringify(size || []))

          image1 && formData.append("image1", image1)
          image2 && formData.append("image2", image2)
          image3 && formData.append("image3", image3)
          image4 && formData.append("image4", image4)

          const response = await axios.post(backendUrl + "/api/product/add", formData,{headers:{ token }})
          if(response.data.success){
            toast.success(response.data.message)
            setName(''); setDescription(''); setPrice('')
            setImage1(false); setImage2(false); setImage3(false); setImage4(false)
            setSize([]); setBestseller(false)
          }else{
            toast.error(response.data.message)
          }
        }catch(err){
            toast.error(err.message)
        }
  }

  const sizes = ["S","M","L","XL","XXL"]

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full max-w-4xl mx-auto gap-6 p-6 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300'>
      
      <ToastContainer />

      {/* Upload Images */}
      <div>
        <p className='mb-2 text-lg font-semibold'>Upload Images</p>
        <div className='flex gap-3'>
          {[image1, image2, image3, image4].map((img, i)=>(
            <label key={i} htmlFor={`image${i+1}`} className='cursor-pointer'>
              <img 
                className='w-24 h-24 object-cover rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300' 
                src={!img ? assets.upload_area : URL.createObjectURL(img)} 
                alt={`upload ${i+1}`} 
              />
              <input onChange={(e)=>{ [setImage1, setImage2, setImage3, setImage4][i](e.target.files[0]) }} type="file" id={`image${i+1}`} hidden/>
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <p className='mb-2 text-lg font-semibold'>Product Name</p>
        <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder='Type here' required 
          className='w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all duration-300' />
      </div>

      {/* Product Description */}
      <div>
        <p className='mb-2 text-lg font-semibold'>Product Description</p>
        <textarea onChange={(e)=> setDescription(e.target.value)} value={description} placeholder='Write content here' required
          className='w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all duration-300' />
      </div>

      {/* Category, Sub-category, Price */}
      <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
        <div className='flex-1'>
          <p className='mb-2 text-lg font-semibold'>Category</p>
          <select onChange={(e)=> setCategory(e.target.value)} className='w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all duration-300'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className='flex-1'>
          <p className='mb-2 text-lg font-semibold'>Sub-category</p>
          <select onChange={(e)=> setSubCategory(e.target.value)} className='w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all duration-300'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className='flex-1'>
          <p className='mb-2 text-lg font-semibold'>Price</p>
          <input onChange={(e)=> setPrice(e.target.value)} value={price} type="number" placeholder='$25' 
            className='w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all duration-300' />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className='mb-2 text-lg font-semibold'>Sizes</p>
        <div className='flex gap-3 flex-wrap'>
          {sizes.map(sz=>(
            <p key={sz} onClick={()=> setSize(prev => prev.includes(sz) ? prev.filter(s=>s!==sz) : [...prev, sz])} 
               className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all duration-300 ${size.includes(sz) ? "bg-blue-900 text-white shadow-lg" : "bg-blue-100 text-blue-900 hover:bg-blue-300"}`}>
              {sz}
            </p>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className='flex items-center gap-2'>
        <input type="checkbox" id='bestseller' checked={bestseller} onChange={()=> setBestseller(prev => !prev)} className='accent-blue-800'/>
        <label htmlFor='bestseller' className='cursor-pointer font-medium'>Add to Bestseller</label>
      </div>

      {/* Submit Button */}
      <button type='submit' className='w-32 py-3 bg-blue-950 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300'>
        Add Product
      </button>

    </form>
  )
}

export default Add

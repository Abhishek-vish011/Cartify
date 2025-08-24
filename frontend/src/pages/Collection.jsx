import React, { useContext , useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title  from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true)
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('revalant');

  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) =>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applFilter = ()=>{
    let productCopy = products.slice();

    if(showSearch && search){
       productCopy = productCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0){
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    if(subCategory.length > 0){
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProduct(productCopy);
  }

  const sortProduct = ()=>{
    let filterProductCopy = filterProduct.slice();

    switch (sortType){
       case 'low-high':
        setFilterProduct(filterProductCopy.sort((a, b)=>(a.price - b.price)))
        break;
       case 'high-low':
        setFilterProduct(filterProductCopy.sort((a, b)=>(b.price - a.price)));
        break;
      default:
        applFilter();
        break;
    } 
  
  }

  useEffect(()=>{
    applFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(()=>{
    sortProduct()
  }, [sortType]);

  return (
    <div className='sm:px-[5w] md:px-[7w] lg:px-[2vw] bg-white text-black'>
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10'>
        {/* Filter Section */}
        <div className="min-w-60">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl font-semibold flex items-center cursor-pointer gap-2 text-gray-800 hover:text-blue-600 transition"
          >
            FILTERS
            <img
              src={assets.dropdown_icon}
              className={`h-3 sm:hidden transform transition-transform duration-300 ${
                showFilter ? "rotate-90" : ""
              }`}
              alt=""
            />
          </p>

          {/* Category filter */}
          <div
            className={`rounded-xl shadow-md bg-white border border-gray-200 pl-5 py-4 mt-6 transition-all duration-300 ${
              showFilter ? "opacity-100 scale-100" : "hidden sm:block opacity-0 scale-95"
            }`}
          >
            <p className="mb-3 text-sm font-bold text-gray-700 tracking-wide">
              CATEGORIES
            </p>
            <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
              {["Men", "Women", "Kids"].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition"
                >
                  <input
                    type="checkbox"
                    className="accent-blue-500 w-4 h-4"
                    value={cat}
                    onChange={toggleCategory}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Sub Category Filter */}
          <div
            className={`rounded-xl shadow-md bg-white border border-gray-200 pl-5 py-4 my-6 transition-all duration-300 ${
              showFilter ? "opacity-100 scale-100" : "hidden sm:block opacity-0 scale-95"
            }`}
          >
            <p className="mb-3 text-sm font-bold text-gray-700 tracking-wide">
              TYPE
            </p>
            <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
              {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                <label
                  key={sub}
                  className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition"
                >
                  <input
                    type="checkbox"
                    className="accent-blue-500 w-4 h-4"
                    value={sub}
                    onChange={toggleSubCategory}
                  />
                  {sub}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1={'ALL'} text2={'COLLECTIONS'}/>
            <select 
              onChange={(e)=> setSortType(e.target.value)} 
              className='border-2 border-gray-300 rounded-lg px-3 py-1 text-sm text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
            >
              <option value="relavant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {filterProduct.map((item, index)=>(
              <div 
                key={index} 
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-3 hover:bg-gray-100"
              >
                <ProductItem 
                  id={item._id} 
                  image={item.image} 
                  name={item.name} 
                  price={item.price} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection

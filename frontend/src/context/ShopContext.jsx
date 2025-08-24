import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) =>{

    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem, setCartItem] = useState({});
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    const addToCart = async(itemId, size)=>{
        if(!size){
            toast.error('Select product size');
            return;
        }
         let cartData = structuredClone(cartItem);
         if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]++;
            }else{
                cartData[itemId][size] = 1;
            }
         }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
         }
         setCartItem(cartData);

         if(token){
            try{
            
               const response = await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers: {token}})
               console.log("This data: ", response.data)

            }catch(err){
              console.log(err)
              toast.error(err.message)
            }
         }
    }
   
 const getCartCount = ()=>{
    let totalCount = 0;
    for(const items in cartItem){
        for(const item in cartItem[items]){
            try{
                if(cartItem[items][item] > 0){
                    totalCount += cartItem[items][item];
                }
            }catch(err){

            }
        }

    }
    return totalCount;
 }


 const updateQuantity = async(itemId, size, quality)=>{
    let cartData = structuredClone(cartItem);

    cartData[itemId][size] = quality;

    setCartItem(cartData);

    if(token){
        try{
            await axios.post(backendUrl + '/api/cart/update', {itemId, size, quality}, {headers: {token}})
        }catch(err){
             console.log(err)
              toast.error(err.message)
        }
    }
 }

 const getCartAmount =  ()=>{
      let totalAmount = 0;
      for(const items in cartItem){
        let itemInfo = products.find((product)=> product._id === items);
        for(const item in cartItem[items]){
            try{ 
                   if(cartItem[items][item]>0){
                           totalAmount += itemInfo.price * cartItem[items][item];
                   }
            }catch(err){

            }
        }
      }
      return totalAmount;
 }

const getProductData = async ()=>{
    try{
      const response = await axios.get(backendUrl + '/api/product/list')
      if(response.data.success){
         setProducts(response.data.products)
      }else{
        toast.error(response.data.message)
      }
    }catch(err){
       toast.error(err.message)
    }
}


const getUserCart = async ( token )=>{
    try{
       const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}})
       if(response.data.success){
         setCartItem(response.data.cartData);
       }
    }catch(err){
        console.log(err)
              toast.error(err.message)
    }
}
useEffect(()=>{
    getProductData()
}, [])


useEffect(()=>{
    if(!token && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
    }
})

    const value = {
       products, currency, delivery_fee,
       search, setSearch, showSearch, setShowSearch,
       cartItem, setCartItem, addToCart, 
       getCartCount, updateQuantity,
       getCartAmount, navigate, backendUrl,
       setToken, token

    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
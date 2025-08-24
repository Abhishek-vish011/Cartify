import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItem, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItem[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItem, products]);

  return (
    <div className="border-t pt-14 px-4 sm:px-8 bg-gray-50 min-h-screen">
      {/* Title */}
      <div className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          return (
            <div
              key={index}
              className="p-4 sm:p-6 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 bg-white"
            >
              {/* Product Info */}
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-24 rounded-md object-cover border"
                  src={productData?.image?.[0] || assets.upload_area}
                  alt={productData?.name || 'Product'}
                />
                <div>
                  <p className="text-sm sm:text-lg font-semibold text-gray-800">
                    {productData?.name || 'Unnamed Product'}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <p className="font-medium">
                      {currency}{productData?.price || 0}
                    </p>
                    <p className="px-3 py-1 border rounded-md bg-gray-100 text-xs sm:text-sm">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <input
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className="border rounded-md text-center w-12 sm:w-20 py-1 focus:outline-none focus:ring-2 focus:ring-black"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />

              {/* Delete Icon */}
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-5 sm:w-6 cursor-pointer hover:scale-110 transition-transform"
                src={assets.bin_icon}
                alt="Delete"
              />
            </div>
          );
        })}
      </div>

      {/* Cart Total Section */}
      <div className="flex justify-end my-16">
        <div className="w-full sm:w-[450px] p-6 border rounded-lg shadow-lg bg-white">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-black text-white text-sm sm:text-base font-medium mt-6 px-8 py-3 rounded-md shadow-lg hover:opacity-90 transition-all duration-300"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

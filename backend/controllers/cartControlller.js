// add products to user cart

import userModel from "../models/userModel.js"

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });

  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};
// UpDATE products to user cart
const updateCart = async(req, res)=>{
    try{
      const { userId, itmeId, size, quantity} = req.body
        const userData = await userModel.findById(userId)
       let cartData = await userData.cartData;

       cartData[itmeId][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData})

       res.json({success: true, message: "Cart Updated"})

    }catch(err){
        console.log(err)
         res.json({success: false, message: err.message})
    }
}
// user products to user cart

const getUserCart = async(req, res)=>{
   try{
   const { userId } = req.body
   
    const userData = await userModel.findById(userId)
       let cartData = await userData.cartData;

       res.json({success: true, cartData})
   }catch(err){
     console.log(err)
     res.json({success: false, message: err.message})
   }
}

export { addToCart, updateCart, getUserCart}
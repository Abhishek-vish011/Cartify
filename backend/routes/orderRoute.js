import express from 'express'

import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verfiyStripe, verfiyRazorPay } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();


// Admin Feature
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus)

//  Payment feature
orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// User feature
orderRouter.post('/userOrders', authUser, userOrders)

// Verify payment
orderRouter.post('/verifyStripe', authUser, verfiyStripe)
orderRouter.post('/verifyRazorpay', authUser, verfiyRazorPay)

export default orderRouter


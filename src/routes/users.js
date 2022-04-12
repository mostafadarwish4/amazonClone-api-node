const requireAuth=require('../middlewares/requireAuth')
const express=require('express')
const router=new express.Router()
const {login,logout,signup,deleteUser,persistlogin} =require('../controller/auth')
const {addProduct,saveProduct,deleteProduct,deleteSaved} =require('../controller/userProducts')
const { addAddress } = require('../controller/userAddress')
const { addOrder,confirmItems } = require('../controller/userOrders')


router.post('/users/signup',signup)
router.post('/users/login',login)

router.get('/users/me/:token',requireAuth,persistlogin)
router.post('/users/me/logout',requireAuth,logout)
router.delete('/users/me',requireAuth,deleteUser)

router.post('/users/me/products/:id',requireAuth,addProduct)
router.post('/users/me/savelater/:id',requireAuth,saveProduct)
router.post('/users/me/orders',addOrder)
router.post('/users/me/orders/batch',requireAuth,confirmItems)
router.patch('/users/me/address/:id',requireAuth,addAddress)
router.delete('/users/me/products/:id',requireAuth,deleteProduct)
router.delete('/users/me/savelater/:id',requireAuth,deleteSaved)

module.exports= router
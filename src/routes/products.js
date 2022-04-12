const express=require('express')
const {getProduct,getProducts,dec}=require('../controller/appProducts')
const requireAuth=require('../middlewares/requireAuth')
const router=new express.Router()

router.get('/products',requireAuth,getProducts)

router.get('/products/:id',requireAuth,getProduct)
router.patch('/products/:id/dec',requireAuth,dec)

module.exports=router;
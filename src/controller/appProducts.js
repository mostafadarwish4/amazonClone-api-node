const CartItem = require('../models/cartItem')
const Product= require('../models/product')

exports.getProducts=async(req,res)=>{
    try{
        let productsIds=req.body.productsIds
        const products=productsIds?await Product.find({_id:{$in:productsIds}}):
            await Product.find()
        res.status(201).send(products.map(product=>product._doc))
    }catch(e){
       
        res.status(500).send('Try again Later')
    }
}
exports.getProduct=async(req,res)=>{
    try { 
        const {id}=req.params
       const item= await CartItem.findOne({product:id}).populate('product')
       
            res.status(201).send(item)
    } catch (e) {
        res.status(500).send(e.message)
    }
    
}
exports.dec=async(req,res)=>{
    try {       
    const { id } = req.params;
    const {q} =req.body
    const product = await Product.findById(id);
    if(q>product.quantity) throw new Error(`add a number less than or equal to ${product.quantity}`)
    await Product.findByIdAndUpdate(id, { quantity: product.quantity - q }, { new: true });
    res.status(202).send()
    } catch (e) {
        console.log(e.message)
        res.status(501).send(e.message)
    }
}
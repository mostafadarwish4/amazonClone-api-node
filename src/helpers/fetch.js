const User=require('../models/user');
const Product=require('../models/product');

const getProducts=async productsIds=>{
             const products= await Product.find({_id:{$in:productsIds}})
             //console.log('products',products)
            return products
            }

const getUser=async userId=>{
    const user=await User.findById(userId)
    return {
        ...user._doc,
        password:null
    }
};

const getProduct=async productId=>{ return await Product.findById(productId)};

module.exports={
    getProducts,
    getUser,
    getProduct
}
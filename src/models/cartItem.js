const mongoose =require('mongoose')
const Schema=mongoose.Schema;
const Product=require('./product')

const cartItemSchema=new Schema({
    quantity:{type:Number,default:1},
    option:{type:String,default:''},
    product:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Product'
   }
    
})

const CartItem= mongoose.model('CartItem',cartItemSchema)
module.exports=CartItem
// Product.find().then(async res=>{

//     for(let i of res){
//         //console.log(i)
//         const product=new CartItem({product:i._id})
//         await product.save()
//     } 
// }).catch(e=>console.log(e.message))
const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const productSchema=new Schema({
    title:String,
    description:String,
    image:String,
    options:[String],
    price:Number,
    oldPrice:Number,
    avgRatings:{type:Number,default:0},
    images:[String],
    quantity:{
        type:Number,
        default:0
    },
    
})

const Product= mongoose.model('Product',productSchema)

module.exports=Product
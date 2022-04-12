const {getProducts} =require('../helpers/fetch')
const jwt=require('jsonwebtoken')
const mongoose =require('mongoose')
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt')

const userSchema=new Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    image:String,
    products:[{type:mongoose.Schema.Types.ObjectId,ref:'CartItem'}],
    saveForLater:[{type:mongoose.Schema.Types.ObjectId,ref:'CartItem'}],
    token:String,
    address:{
        city:String,
        country:String,
        phoneNumber:String,
        address:String,
        fullName:String
    },
    purchases:[Object]
})
userSchema.methods.toJSON=function(){
    const user = this
    const userObject=user.toObject()
    delete userObject.password
    return userObject
}
userSchema.methods.getAuthToken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id},'amazonclone')
    user.token=token
    await user.save()
    return token
}

userSchema.statics.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error('Email or password are not valid!')
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
            throw new Error('Email or password are not valid!')
    }
    return user
}
userSchema.pre('save',async function(next){
    const user=this
     if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
        }
     next()
})
const User=mongoose.model('User',userSchema)
module.exports= User
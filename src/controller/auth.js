const User=require('../models/user')
const CartItem = require('../models/cartItem')
exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body

        if(!email || !password){
            return res.status(402).send('Email and password must be provided.')
        }
        const user=await User.findByCredentials(email,password)
        await user.getAuthToken()
         await user.populate({path:'products',populate:{path:'product'}})
        await user.populate({path:'saveForLater',populate:{path:'product'}})
        res.send(user)
    } catch (e){
        res.status(400).send(e.message)
    }
    
}
exports.signup=async(req,res)=>{
    try {
        const {email,password,name}=req.body

        if(!email || !password ||!name){
            return res.status(402).send('Email ,name and password must be provided.')
        }
        const user=new User({email,password,name})
        await user.getAuthToken()
        await user.save()
        await user.populate({path:'products',populate:{path:'product'}})
        await user.populate({path:'saveForLater',populate:{path:'product'}})
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }

}
exports.logout=async(req,res)=>{
    try {
        //console.log('jhjhjk',req.body.userId)
        const {userId}=req.body
        const user=await User.findById(userId)
        user.token=''
        user.save()
        res.status(201).send()
    } catch (e) {
        console.log(e.message)
        res.status(500).send(e)
    }
}
exports.persistlogin=async(req,res)=>{
    try {
        const {token}=req.params
        const user=await User.findOne({token})
        await user.populate({path:'products',populate:{path:'product'}})
        await user.populate({path:'saveForLater',populate:{path:'product'}})
        res.send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
}
exports.deleteUser=async(req,res)=>{
    try {
        const user=await User.findById(req.body.userId)
        await user.remove()
        res.status(201).send()
    } catch (e) {
        res.status(500).send(e.message)
    }
}
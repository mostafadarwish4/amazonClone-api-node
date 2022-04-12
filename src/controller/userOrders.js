const { Mongoose } = require('mongoose')
const User=require('../models/user')

 exports.addOrder=async(req,res)=>{
    try {        
        
        const {order,userId}=req.body
        const user=await User.findById(userId)
       // console.log('er',user)
        user.purchases.push(order)
        await user.save()
        await user.populate({path:'products',populate:{path:'product'}})
        await user.populate({path:'saveForLater',populate:{path:'product'}})
        res.send(user)
    } catch (e) {
        res.status(500).send(e.message)
        console.log(e.message);
    }
}
exports.confirmItems=async(req,res)=>{
    try {
        console.log('came confirm')
       const {userId,products}=req.body
       console.log('prodcuts',products)
        const user=await User.findById(userId)
        user.purchases.push(...products)
        user.products= []
        await user.save()
        console.log('user before',user)
        await user.populate({path:'products',populate:{path:'product'}})
        await user.populate({path:'saveForLater',populate:{path:'product'}})
        console.log('user after',user)
        res.status(200).send(user) 
    } catch (e) {
        console.log(e.message)
        res.status(500).send(e.message)
    }
}
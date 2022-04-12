const User=require('../models/user')
const CartItem = require('../models/cartItem')
exports.addProduct=async(req,res)=>{
    try {        
        const id=req.params.id
        const {userId}=req.body
        const user=await User.findById(userId)
        user.saveForLater= user.saveForLater.filter((_id)=>_id.toString()!==id)
        user.products=[id,...user.products]
        await user.save()
        await user.populate({path:'products',populate:{path:'product'}})
        await user.populate({path:'saveForLater',populate:{path:'product'}})
        res.send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
}
exports.saveProduct=async(req,res)=>{
    try {        
        const id=req.params.id
        const {userId}=req.body
        const user=await User.findById(userId)
        user.products= user.products.filter(item=>item.toString()!==id)
         user.saveForLater=[id,...user.saveForLater]
         await user.save()
         await user.populate({path:'products',populate:{path:'product'}})
        await user.populate({path:'saveForLater',populate:{path:'product'}})
        res.send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
}
exports.deleteProduct=async(req,res)=>{
    try {        
        const id=req.params.id
        const {userId}=req.body
        const user=await User.findById(userId)
        user.products= user.products.filter(item=>item.toString()!==id)
        await user.save()
        await user.populate({path:'products',populate:{path:'product'}})
        await user.populate({path:'saveForLater',populate:{path:'product'}})
        res.send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
}
exports.deleteSaved=async(req,res)=>{
    try {        
        const id=req.params.id
        const {userId}=req.body
        const user=await User.findById(userId)
         user.saveForLater= user.saveForLater.filter(item=>item.toString() !== id)
        await user.save()
        await user.populate({path:'products',populate:{path:'product'}})
        await user.populate({path:'saveForLater',populate:{path:'product'}})
        res.send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
}


const User=require('../models/user')

 exports.addAddress=async(req,res)=>{
    try {
        const {address}=req.body
        const {id}=req.params
        const user=await User.findByIdAndUpdate(id,{address},{new:true})
        res.status(202).send(user)
    } catch (e) {
        res.status(501).send(e.message)
    }
    
}

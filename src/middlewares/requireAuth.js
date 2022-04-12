const jwt=require('jsonwebtoken')
const User=require('../models/user')



module.exports=(req,res,next)=>{
    const {authorization}=req.headers
    //authorization==="Bearer <token>"

    if(!authorization){
        return res.status(401).send('you must be logged in')
    }
    const token=authorization.replace('Bearer ','')
    jwt.verify(token,"amazonclone",async(err,payload)=>{
        if(err){
            return res.status(401).send('you must be logged in') 
        }

        const {userId}=payload
        const user=await User.findById(userId)
        req.user=user
        next()
    })
}
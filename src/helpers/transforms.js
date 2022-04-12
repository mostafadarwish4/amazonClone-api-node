const {getProducts}=require('./fetch')
exports.transformUser=user=>({
                    ...user._doc,
                    createdEvents:getProducts(user.createdEvents),
                    savedForLater:getProducts(user.savedForLater),
                    password:null
                }
                    )

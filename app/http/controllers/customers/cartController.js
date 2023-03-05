function cartController() {
    return {
        index(req,res){
        
            res.render('customers/cart')
        },
        update(req,res){
            //for the first time creating cart and adding basic object structure
            if(! req.session.cart){
                req.session.cart = {
                    items: {},
                    totalQty:0,
                    totalPrice:0
                }
            }
            let cart = req.session.cart
            console.log(req.body)
                //check if item doesn't exits in cart
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item : req.body,
                    qty: 1
                }
                // cart.totalQty=cart.totalQty+1
                cart.totalQty+=1
                console.log(cart.tatalQty)
                cart.totalPrice=cart.totalPrice+ req.body.price
            }else{
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1 
                // cart.totalQty=cart.totalQty+1
                cart.totalQty+=1
                cart.totalPrice=cart.totalPrice+req.body.price
            }
            // console.log(res.json({tatalQty: req.session.tatalQty}))
            console.log(req.session.cart)
            // return res.json({tatalQty: req.session.tatalQty})
            res.json({tatalQty: req.session.cart.totalQty})
            // res.json({tatalPrice: req.session.cart.totalPrice})
            // res.json({data:'ALL OK'})
        }
    }
}

module.exports = cartController
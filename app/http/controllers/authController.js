const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {

    return {
        login(req,res){
            res.render('auth/login')
        },
        postlogin(req,res,next){
            passport.authenticate('local',(err,user,info) =>{
            if(err){
                req.flash('error',info.message)
                return next(err)
            }    
            if(!user){
                req.flash('error',info.message)
                return res.redirect('/login')
            }
            req.logIn(user, (err)=>{
              if(err){
                req.flash('error',info.message)
                return next(err)
            }
            if(req.user.role === 'customer'){
                return res.redirect('/customer/orders')
            }else if(req.user.role === 'admin'){
                return res.redirect('/admin/orders')
            }
            
            })
        })(req,res,next)
        },
        register(req,res){
            res.render('auth/register')
        },
        async postregister(req,res){
            const {name,email,password } = req.body

            if(!name || !email || !password){
                req.flash('error','All fields are required')
                req.flash('name',name)
                req.flash('email',email)
                return res.redirect('/register')
            }
            //check if email exists
            User.exists({email:email},(err,result) =>{
                    if(result){
                        req.flash('error','email already taken')
                        req.flash('name',name)
                        req.flash('email',email)
                        return res.redirect('/login')
                    }
            })
            //hash
            const hashedPassword = await bcrypt.hash(password,10)

            //create a user

            const user = new User({
                name,
                email,
                password:hashedPassword
            })

            user.save().then((user)=>{
                //login

                return res.redirect('/')
            }).catch(err => {
                req.flash('error','Something went wrong')
                return res.redirect('/register')
            })

        },
        logout(req,res,next){
            req.logout( err => {
                return next(err)
            })
            return res.redirect('/login')
        }
       
    }
}

module.exports = authController
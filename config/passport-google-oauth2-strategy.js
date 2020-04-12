const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

passport.use(new googleStrategy({
    clientID:"210380644110-jal80sn8mfm9151ji32l7m1tkiis601v.apps.googleusercontent.com",
    clientSecret:"2funJb78ZF6GcIfY1hK0hwKQ",
    callbackURL:"http://localhost:8000/users/auth/google/callback"

},
function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){

        if(err){
            console.log(err,"error in google strategy passport");
            return;
        }
        console.log(profile);
        if(user){
            return done(null,user);
        }
        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log(err,"error in creating user by google oauth2");
                    return;
                }
                return done(null,user)
            })
        }


    })
}));
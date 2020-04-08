const Post = require('../models/post');

module.exports.home = function(req, res) {
    // return res.end('<h1>Express is up for Codeial</h1>');
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    
    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        if(err){
            console.log('Error in finding posts');
            return;
        }
        if(!posts){
            console.log('There seems to be no posts in the db');
            return;
        }
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    });

};
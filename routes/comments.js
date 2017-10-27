var express = require("express");
var router = express.Router({mergeParams: true});
var Coffeeshop = require("../models/coffeeshop");
var Comment = require("../models/comment");

// Comments New
router.get("/new", isLoggedIn, function(req, res){
  // find coffeeshop by ID
  Coffeeshop.findById(req.params.id, function(err, coffeeshop){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {coffeeshop: coffeeshop});
    }
  });
});

// Comments Create
router.post("/", isLoggedIn, function(req, res){
  // look up coffeeshop using ID
  Coffeeshop.findById(req.params.id, function(err, coffeeshop){
    if(err){
      console.log(err);
      res.redirect("/coffeeshops");
    } else {
      // create new comment
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else {
          // add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // save comment
          comment.save();
          // connect new comment to coffeeshop
          coffeeshop.comments.push(comment);
          coffeeshop.save();
          // redirect coffeeshop show page
          res.redirect("/coffeeshops/" + coffeeshop._id);
        }
      });
    }
  });
});

// Middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};

module.exports = router;

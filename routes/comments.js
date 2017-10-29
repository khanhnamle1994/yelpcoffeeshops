var express = require("express");
var router = express.Router({mergeParams: true});
var Coffeeshop = require("../models/coffeeshop");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
  // look up coffeeshop using ID
  Coffeeshop.findById(req.params.id, function(err, coffeeshop){
    if(err){
      console.log(err);
      res.redirect("/coffeeshops");
    } else {
      // create new comment
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          req.flash("error", "Something went wrong");
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
          req.flash("success", "Successfully added comment");
          // redirect coffeeshop show page
          res.redirect("/coffeeshops/" + coffeeshop._id);
        }
      });
    }
  });
});

// Comments Edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    } else {
      res.render("comments/edit", {coffeeshop_id: req.params.id, comment: foundComment});
    }
  });
});

// Comments Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    } else {
      res.redirect("/coffeeshops/" + req.params.id);
    }
  });
});

// Comments Destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      res.redirect("/coffeeshops/" + req.params.id);
    }
  });
});

module.exports = router;

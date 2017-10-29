var express = require("express");
var router = express.Router();
var Coffeeshop = require("../models/coffeeshop");
var middleware = require("../middleware");

// INDEX - show all coffeeshops
router.get("/", function(req, res){
  // Get all coffeeshops from DB
  Coffeeshop.find({}, function(err, allCoffeeshops){
    if(err){
      console.log(err);
    } else {
      res.render("coffeeshops/index", {coffeeshops: allCoffeeshops});
    }
  });
});

// CREATE - add new coffeeshop to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to coffeeshops array
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCoffeeshop = {name: name, price: price, image: image, description: desc, author: author};
  // Create a new coffeeshop and save to DB
  Coffeeshop.create(newCoffeeshop, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      // redirect back to coffeeshops page
      res.redirect("/coffeeshops");
    }
  });
});

// NEW - show form to create new coffeeshop
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("coffeeshops/new");
});

// SHOW - show more info about one coffeeshop
router.get("/:id", function(req, res){
  // find the coffeeshop with provided ID
  Coffeeshop.findById(req.params.id).populate("comments").exec(function(err, foundCoffeeshop){
    if(err){
      console.log(err);
    } else {
      // render show template with that coffeeshop
      res.render("coffeeshops/show", {coffeeshop: foundCoffeeshop});
    }
  });
});


// EDIT
router.get("/:id/edit", middleware.checkCoffeeshopOwnership, function(req, res){
  Coffeeshop.findById(req.params.id, function(err, foundCoffeeshop){
    res.render("coffeeshops/edit", {coffeeshop: foundCoffeeshop});
  });
});

// UPDATE
router.put(":/id", middleware.checkCoffeeshopOwnership, function(req, res){
  // find and update the correct coffeeshop
  Coffeeshop.findByIdAndUpdate(req.params.id, req.body.coffeeshop, function(err, updatedCoffeeshop){
    if(err){
      res.redirect("/coffeeshops");
    } else {
      res.redirect("/coffeeshops/" + req.params.id);
    }
  });
});

// DESTROY
router.delete(":id", middleware.checkCoffeeshopOwnership, function(req, res){
  Coffeeshop.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/coffeeshops");
    } else {
      res.redirect("/coffeeshops");
    }
  });
});

module.exports = router;

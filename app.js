var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_coffee_shop");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema Setup
var coffeeshopSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Coffeeshop = mongoose.model("Coffeeshop", coffeeshopSchema);

// Coffeeshop.create(
//   {
//     name: "Sightglass Coffee",
//     image: "https://assets3.thrillist.com/v1/image/2711571/size/tmg-gift_guide_variable.jpg"
//   }, function(err, coffeeshop) {
//     if(err){
//       console.log(err);
//     } else {
//       console.log("Newly created coffeeshop: ");
//       console.log(coffeeshop);
//     }
//   });

// var coffeeshops = [
//   {name: "Sightglass Coffee", image: "https://assets3.thrillist.com/v1/image/2711571/size/tmg-gift_guide_variable.jpg"},
//   {name: "Duboce Park Cafe", image: "https://assets3.thrillist.com/v1/image/2711494/size/tl-horizontal_main.jpg"},
//   {name: "Blue Bottle Coffee", image: "https://assets3.thrillist.com/v1/image/2712021/size/tl-horizontal_main.jpg"},
//   {name: "Reveille Coffee Co", image: "https://assets3.thrillist.com/v1/image/2711847/size/tl-horizontal_main.jpg"},
//   {name: "Jane on Filmore", image: "https://assets3.thrillist.com/v1/image/2711475/size/tmg-article_tall.jpg"},
//   {name: "Coffee Bar", image: "https://assets3.thrillist.com/v1/image/1265482/size/tl-horizontal_main.jpg"},
//   {name: "Orson's Belly", image: "https://assets3.thrillist.com/v1/image/2711845/size/tl-horizontal_main.jpg"},
//   {name: "Cafe Du Soleil", image: "https://assets3.thrillist.com/v1/image/2711505/size/tmg-article_tall.jpg"}
// ];

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/coffeeshops", function(req, res){
  // Get all coffeeshops from DB
  Coffeeshop.find({}, function(err, allCoffeeshops){
    if(err){
      console.log(err);
    } else {
      res.render("coffeeshops", {coffeeshops: allCoffeeshops});
    }
  });
});

app.post("/coffeeshops", function(req, res){
  // get data from form and add to coffeeshops array
  var name = req.body.name;
  var image = req.body.image;
  var newCoffeeshop = {name: name, image: image};
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

app.get("/coffeeshops/new", function(req, res){
  res.render("new.ejs");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
  console.log("The YelpCoffeeShop Server has started");
});

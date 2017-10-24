var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var coffeeshops = [
  {name: "Sightglass", image: "https://assets3.thrillist.com/v1/image/2711571/size/tmg-gift_guide_variable.jpg"},
  {name: "Duboce Park Cafe", image: "https://assets3.thrillist.com/v1/image/2711494/size/tl-horizontal_main.jpg"},
  {name: "Blue Bottle", image: "https://assets3.thrillist.com/v1/image/2712021/size/tl-horizontal_main.jpg"}
];

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/coffeeshops", function(req, res){
  res.render("coffeeshops", {coffeeshops: coffeeshops});
});

app.post("/coffeeshops", function(req, res){
  // get data from form and add to coffeeshops array
  var name = req.body.name;
  var image = req.body.image;
  var newCoffeeshop = {name: name, image: image};
  coffeeshops.push(newCoffeeshop);
  // redirect back to coffeeshops page
  res.redirect("/coffeeshops");
});

app.get("/coffeeshops/new", function(req, res){
  res.render("new.ejs");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
  console.log("The YelpCoffeeShop Server has started");
});

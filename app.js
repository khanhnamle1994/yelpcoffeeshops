var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/coffeeshops", function(req, res){
  var coffeeshops = [
    {name: "Sightglass", image: "https://assets3.thrillist.com/v1/image/2711571/size/tmg-gift_guide_variable.jpg"},
    {name: "Duboce Park Cafe", image: "https://assets3.thrillist.com/v1/image/2711494/size/tl-horizontal_main.jpg"},
    {name: "Blue Bottle", image: "https://assets3.thrillist.com/v1/image/2712021/size/tl-horizontal_main.jpg"}
  ]

  res.render("coffeeshops", {coffeeshops: coffeeshops});
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
  console.log("The YelpCoffeeShop Server has started");
});

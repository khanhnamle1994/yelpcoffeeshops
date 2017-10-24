var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/coffeeshops", function(req, res){
  var coffeeshops = [
    {name: "Cappucino", image: "https://images.unsplash.com/photo-1504066116688-57c2efd91274?w=2550&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
    {name: "Starbucks", image: "https://images.unsplash.com/photo-1496379896897-7b57622f431b?w=2689&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
    {name: "Iced Coffee", image: "https://images.unsplash.com/photo-1471922597728-92f81bfe2445?w=2552&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"}
  ]

  res.render("coffeeshops", {coffeeshops: coffeeshops});
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
  console.log("The YelpCoffeeShop Server has started");
});

var mongoose = require("mongoose");
var Coffeeshop = require("./models/coffeeshop");
var Comment = require("./models/comment");

var data = [
  {
    name: "Orson's Belly",
    image: "https://assets3.thrillist.com/v1/image/2711845/size/tl-horizontal_main.jpg",
    description: "Who needs pour over and Chemex when you can have a Turkish coffee? This is one of the more unique local haunts in Richmond and serves as a cinephilia ode to old movies and independent film. Look for screening events whilst browsing the local art that hangs from nooks and crannies as you eat gravlax or a Turkish breakfast. The Liège waffle is also a favorite for dessert or a quick snack."
  },
  {
    name: "Coffee Bar",
    image: "https://assets3.thrillist.com/v1/image/1265482/size/tl-horizontal_main.jpg",
    description: "It would be easy for Contraband Coffee Bar in Nob Hill to get lost in the shuffle of glossy white storefronts, unless handsome publications like this one made sure it didn't. The sunny interior will make you want to cozy up with your drip coffee for a little while, and here, that's okay."
  },
  {
    name: "Reveille Coffee Co",
    image: "https://assets3.thrillist.com/v1/image/2711847/size/tl-horizontal_main.jpg",
    description: "When you walk in, step up to the wooden circular service counter, place your order, and prepare to ask yourself if this is the best coffee you've ever had. What started as a coffee cart (like most things in SF), is now much more than that with brick-and-mortar spaces that celebrate California modern design and latte art. The best part? It’s close to City Lights Bookstore, which is an icon of the neighborhood (and one of a handful of bookstores that seen to survive the Internet Age) and was founded in 1953 by poet Lawrence Ferlinghetti."
  }
]

function seedDB(){
  // Remove all coffeeshops
  Coffeeshop.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed coffeeshops!");
    // Add a few coffeeshops
    data.forEach(function(seed){
      Coffeeshop.create(seed, function(err, coffeeshop){
        if(err){
          console.log(err);
        } else {
          console.log("added a coffeeshop");
          // Create a comment
          Comment.create(
            {
              text: "Great atmosphere, solid Wifi, spectacular coffee",
              author: "James Le"
            }, function(err, comment){
              if(err){
                console.log(err);
              } else {
                coffeeshop.comments.push(comment);
                coffeeshop.save();
                console.log("Created new comment");
              }
            });
        }
      });
    });
  });
}

module.exports = seedDB;

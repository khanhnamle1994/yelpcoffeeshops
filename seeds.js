var mongoose = require("mongoose");
var Coffeeshop = require("./models/coffeeshop");
var Comment = require("./models/comment");

var data = [
  {
    name: "Orson's Belly",
    image: "https://assets3.thrillist.com/v1/image/2711845/size/tl-horizontal_main.jpg",
    description: "To Be Added"
  },
  {
    name: "Coffee Bar",
    image: "https://assets3.thrillist.com/v1/image/1265482/size/tl-horizontal_main.jpg",
    description: "To Be Added"
  },
  {
    name: "Reveille Coffee Co",
    image: "https://assets3.thrillist.com/v1/image/2711847/size/tl-horizontal_main.jpg",
    description: "To Be Added"
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
      Coffeeshop.create(seed, function(err, data){
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

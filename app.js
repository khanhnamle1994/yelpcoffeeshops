var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Coffeeshop = require("./models/coffeeshop");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");

// requiring routes
var commentRoutes = require("./routes/comments");
var coffeeshopRoutes = require("./routes/coffeeshops");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_coffee_shop");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// Passport Configuration
app.use(require("express-session")({
  secret: "!",
  resave: false,
  saveUninitilized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

app.use("/coffeeshops/:id/comments", commentRoutes);
app.use("/coffeeshops", coffeeshopRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function(){
  console.log("The YelpCoffeeShop Server has started");
});

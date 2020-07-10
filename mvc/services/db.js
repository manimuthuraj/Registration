var mongoose = require("mongoose");

exports.intiConnection = ()=>{
  mongoose.connect("mongodb+srv://yelp:yelp@cluster0-lfy4s.mongodb.net/yelp?retryWrites=true&w=majority", { useNewUrlParser: true });
}

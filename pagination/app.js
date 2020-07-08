var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb+srv://yelp:yelp@cluster0-lfy4s.mongodb.net/yelp?retryWrites=true&w=majority", { useNewUrlParser: true })

var stdSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: String, required: true }
})

var std = mongoose.model("std", stdSchema)

app.get("/", function(req, res) {
    std.find({}, function(err, std) {
        if (err) {
            console.log(err)
        } else {
            res.render("page.ejs", { std: std })
        }
    })
})

app.get("/add", function(req, res) {
    res.render("add.ejs")
})

app.post("/add", function(req, res) {
    var name = req.body.name
    var email = req.body.email
    var age = req.body.age

    std.create({ name: name, email: email, age: age }, function(err, std) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/")
        }
    })
})

app.listen(3000, function() {
    console.log("started")
})
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

app.get("/:page", function(req, res) {
    var perPage = 3 //no of items to be displaed per page
    var page = req.params.page || 1 //page no
    std
        .find({})
        .skip((perPage * page) - perPage) //items to be skip not fetech from db
        .limit(perPage) // no of items per page
        .exec(function(err, stds) {
            std.count().exec(function(err, count) { // count total no of items iin db
                if (err) return next(err)
                res.render('page.ejs', {
                    stds: stds, //data
                    current: page, // current pageno
                    pages: Math.ceil(count / perPage) // total no of pages total count/items per page
                })
            })
        })

})

app.get("/add/new", function(req, res) {
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
            res.redirect("/:page")
        }
    })
})

app.listen(3000, function() {
    console.log("started")
})
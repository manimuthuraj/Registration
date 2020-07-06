var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

mongoose.connect("mongodb+srv://yelp:yelp@cluster0-lfy4s.mongodb.net/yelp?retryWrites=true&w=majority", { useNewUrlParser: true })

var registerSchema = new mongoose.Schema({
    name: String,
    email: String,
    Phoneno: String,
    password: String
})
var register = mongoose.model("register", registerSchema)

app.get("/", function(req, res) {
    res.render("register")
})

app.post("/", function(req, res) {
    register.create({ name: req.body.name, email: req.body.email, Phoneno: req.body.Phoneno, password: req.body.password }, function(err, reg) {
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
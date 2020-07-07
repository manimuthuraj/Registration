var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

mongoose.connect("mongodb+srv://yelp:yelp@cluster0-lfy4s.mongodb.net/yelp?retryWrites=true&w=majority", { useNewUrlParser: true })

var registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 4
    },
    email: {
        type: String,
        required: true
    },
    Phoneno: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 12
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 8
    },
})
var register = mongoose.model("register", registerSchema)

app.get("/", function(req, res) {
    res.render("register")
})

app.post("/", function(req, res) {

    async function saveRegister() {
        const game = new register({
            name: req.body.name,
            email: req.body.email,
            Phoneno: req.body.Phoneno,
            password: req.body.password
        });

        try {
            const result = await game.save();
            console.log(result);
            res.redirect("/")
        } catch (err) {
            console.log(err.message)
            res.render("register", { err: err })
        }
    }
    saveRegister();
})

app.listen(3000, function() {
    console.log("started")
})
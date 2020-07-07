var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")
var passport = require("passport")
var LocalStrategy = require('passport-local').Strategy;
//var session = require('express-session');

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

app.use(require("express-session")({
    secret: "hu",
    resave: false,
    saveUninitialized: false
}))

var register = mongoose.model("register", registerSchema)
registerSchema.plugin(passportLocalMongoose);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(req, user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(user_id, done) {
    console.log('user_id...', user_id);
    // getUserInfo(user_id).then(function(user) {
    // return done(null, user);
    // }, function(err) {
    // return done(err, null);
    // });
});

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



app.get("/login", function(reqq, res) {
    res.render("register")
})

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(username, password, done) {
        console.log(username)
        console.log(password)
        register.findOne({ email: username }, function(err, user) {
            console.log(user)
            if (err) { return done(err); }
            if (!user) {
                return done(null, false);
            }

            if (password != user.password) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));


app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/fail',
        failureFlash: true
    })
);


app.listen(3000, function() {
    console.log("started")
})
const bodyParser = require("body-parser");
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const app = express();

function authenticated(req, res, next) {
    if (req.session.passport.user.username) next();
    else res.sendStatus(401);
}

app.use(
    session({
        secret: "This is a SuperSecret2!",
        name: "SuperSession2",
        cookie: {
            httpOnly: true,
        },
    })
);

app.use(bodyParser.json());

passport.use(
    new LocalStrategy((username, password, done) => {
        if (username !== "bobby" || password !== "john") {
            return done(null, false);
        }

        return done(null, {
            username: "bobby",
        });
    })
);

passport.serializeUser((user, cb) => {
    process.nextTick(() => cb(null, user));
});

passport.deserializeUser((user, cb) => {
    process.nextTick(() => cb(null, user));
});

app.post("/login", passport.authenticate("local"), (req, res) => {
    res.send();
});

app.get("/", authenticated, (req, res) => {
    res.send(`Hello ${req.session.passport.user.username}`);
});

app.listen(3000);

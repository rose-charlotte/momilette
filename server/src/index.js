const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");

function authenticated(req, res, next) {
    if (req.session.user) next();
    else res.sendStatus(401);
}

const app = express();

app.use(
    session({
        secret: "This is a SuperSecret!",
        name: "SuperSession",
        cookie: {
            httpOnly: true,
        },
    })
);

app.use(cookieParser());
app.use(bodyParser.json());

app.post("/login", (req, res) => {
    if (req.body.username !== "bob" || req.body.password !== "john") {
        res.sendStatus(401);

        return;
    }

    req.session.user = {
        username: req.body.username,
    };

    res.sendStatus(200);
});

app.get("/", authenticated, (req, res) => {
    res.send(`Hello ${req.session.user.username}`);
});

app.listen(3000);

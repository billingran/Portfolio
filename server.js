// dotenv
const dotenv = require("dotenv").config();

// express
const express = require("express");
const app = express();

//session
const session = require("express-session");

//flash message
const flash = require("connect-flash");

// routes
const homePage = require("./src/routes/home_routes");

//Connect to mongodb alts
require("./src/models/database");

// Middleware session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: Infinity },
  })
);

// Middleware flash message
app.use(flash());
app.use((req, res, next) => {
  // flash message
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");

  next();
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware of home page
app.use("/", homePage);

// route page not found
app.get("*", (req, res) => {
  return res.status(404).render("error", {
    title: "Page introuvable",
  });
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

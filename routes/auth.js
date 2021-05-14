const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("./../models/User");


router.get("/signup", (req, res) => {
    res.render("signup.hbs")
  });
  
  router.get("/signin", (req, res) => {
    res.render("signin.hbs")
  });
  
  router.post("/signin", async (req, res, next) => {
  
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email: email });
    if (!foundUser) {
      req.flash("error", "Invalid credentials");
      res.redirect("/auth/signin");
    } else {
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
        req.flash("error", "Invalid credentials");
        res.redirect("/auth/signin");
      } else {
        const userObject = foundUser.toObject();
        delete userObject.password; // remove password before saving user in session
        // console.log(req.session, "before defining current user");
        req.session.currentUser = userObject; // Stores the user in the session (data server side + a cookie is sent client side)
        req.flash("success", "Successfully logged in...");
        res.redirect("/");
      }
      console.log(req.body);
    }
  });
  
  router.post("/signup", async (req, res, next) => {
      
    try {
      const newUser = { ...req.body }; // clone req.body with spread operator
      const foundUser = await UserModel.findOne({email: newUser.email });
      console.log(req.body);
  
      if (foundUser) {
        req.flash("warning", "Email already registered");
        res.redirect("/signup");
      } else {
  
        const hashedPassword = bcrypt.hashSync(newUser.password, 10);
        newUser.password = hashedPassword;
        await UserModel.create(newUser);
        req.flash("success", "Congrats ! You are now registered !");
        res.redirect("/signin");
      }
    } catch (err) {
      let errorMessage = "";
      for (field in err.errors) {
        errorMessage += err.errors[field].message + "\n";
      }
      req.flash("error", errorMessage);
      res.redirect("/signup");
    }
    console.log("Hello");
  });
  
module.exports = router;

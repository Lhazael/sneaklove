const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const SneakerModel = require("./../models/Sneaker");
const TageModel = require("./../models/Tag");
const UserModel = require("./../models/User");

// console.log(`\n\n
// -----------------------------
// -----------------------------
//      wax on / wax off !
// -----------------------------
// -----------------------------\n\n`
// );

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", async (req, res, next) => {
 try { console.log(req.params);
  res.render("products", {
    sneakers: await SneakerModel.find({category: req.params.cat}),
  });
 } catch (err) {
  next(err);
}});

router.get("/one-product/:id", async (req, res, next) => {
  try {
res.render("one_product", {
  sneaker: await SneakerModel.findById(req.params.id),
})
} catch (err) {
  next(err);
}});

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
    res.redirect("/signin");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      req.flash("error", "Invalid credentials");
      res.redirect("/signin");
    } else {
      const userObject = foundUser.toObject();
      delete userObject.password; // remove password before saving user in session
      // console.log(req.session, "before defining current user");
      req.session.currentUser = userObject; // Stores the user in the session (data server side + a cookie is sent client side)
      req.flash("success", "Successfully logged in...");
      res.redirect("/");
    }
  }
});

router.post("/signup", async (req, res, next) => {
    
  try {
    const newUser = { ...req.body }; // clone req.body with spread operator
    const foundUser = await UserModel.findOne({email: newUser.email });

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

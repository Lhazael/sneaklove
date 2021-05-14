const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

const SneakerModel = require("./../models/Sneaker");
const TagModel = require("./../models/Tag");
const UserModel = require("./../models/User");

router.get("/", (req, res, next) => {
  SneakerModel.find()
    .then((sneakers) => {
      console.log(sneakers);
      res.render("products_manage.hbs", { sneakers });
    })
    .catch(next);
});

router.get("/prod-add", (req, res) => {
  res.render("products_add.hbs");
});

//   POS - ADD sneaker

router.post("/prod-add", (req, res, next) => {
  SneakerModel.create(req.body)
    .then((dbResult) => {
      console.log(dbResult);
      res.redirect("/dashboard");
    })
    .catch((err) => {
      res.render("products.hbs");
    });
});

// UPDATE

router.get("/prod-edit/:id", (req, res, next) => {
  SneakerModel.findById(req.params.id)
    .then((sneaker) => {
      res.render("product_edit.hbs", { sneaker });
    })
    .catch(next);
});

router.post("/prod-edit/:id", (req, res, next) => {
  SneakerModel.findByIdAndUpdate(req.params.id, req.body)
    .then((sneaker) => {
      res.redirect("/dashboard");
    })
    .catch(next);
});

// DELETE

router.get("/delete/:id", async (req, res, next) => {
  try {
    // use the model to delete one label by id
    await SneakerModel.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard"); // then redirect to labels full list
  } catch (err) {
    next(err);
  }
});

module.exports = router;

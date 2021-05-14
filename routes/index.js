const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const SneakerModel = require("./../models/Sneaker");
const TagModel = require("./../models/Tag");
const UserModel = require("./../models/User");

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

module.exports = router;

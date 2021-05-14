const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  image: {
    type: String,
    default:
      "https://lh3.googleusercontent.com/proxy/E_is_ILk1eSVEMVgZMsKpqsSmMSAPszMcuVKby2LtF80c389MoH2uzbVjj8iUHdKhyR2bbPcdQSMQjpMeV5eW72E"
  },
  category: { type: String, enum: ["Men", "Women", "Kids"] },
  id_tags: [{ type: Schema.Types.ObjectId, ref: "tag" }],
});

const SneakerModel = mongoose.model("sneaker", sneakerSchema);
module.exports = SneakerModel;

require("dotenv").config();
require("./../config/mongodb"); // fetch the db connection
const SneakerModel = require("./../models/Sneaker");
const TagModel = require("./../models/Tag");
const UserModel = require("./../models/User");

const tags = [
    {
        label: "#classic"
    },
    {
        label: "#city"
    },
    {
        label: "#sport"
    },
    {
        label: "#basketball"
    },
    {
        label: "#jordan"
    }
];

(async function insertTags() {
    try {
      await TagModel.deleteMany(); // empty the styles db collection
      const inserted = await TagModel.insertMany(tags); // insert docs in db
      console.log(`seed tags done : ${inserted.length} documents inserted !`);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  })();
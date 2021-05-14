require("dotenv").config();
require("./../config/mongodb"); // fetch the db connection
const SneakerModel = require("./../models/Sneaker");
const TagModel = require("./../models/Tag");
const UserModel = require("./../models/User");

const users = [
  {
    name: "Gérard",
    lastname: "Dupont",
    email: "g.dupont@email.com",
    password: "12345",
  },
  {
    name: "Annie",
    lastname: "Lolo",
    email: "A.l@email.com",
    password: "67890",
  }
];

(async function insertUsers() {
    try {
      await UserModel.deleteMany(); // empty the styles db collection
      const inserted = await UserModel.insertMany(users); // insert docs in db
      console.log(`seed users done : ${inserted.length} documents inserted !`);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  })();
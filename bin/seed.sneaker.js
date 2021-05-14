require("dotenv").config();
require("./../config/mongodb"); // fetch the db connection
const SneakerModel = require("./../models/Sneaker");
const TagModel = require("./../models/Tag");
const UserModel = require("./../models/User");

const sneakers = [
  {
    name: "Air Max 1",
    ref: "012345",
    size: 42,
    description: "Iconic model from Nike",
    price: 100,
    category: "men",

  },
  {
    name: "Air Force 1",
    ref: "023456",
    size: 38,
    description: "Iconic backetball shoe",
    price: 90,
    category: "women",
  
  },
  {
    name: "Jordan 4",
    ref: "156379",
    size: 45,
    description: "The best basketball shoe",
    price: 150,
    category: "men",
    
  }
];

(async function insertSneakers() {
  try {
    await SneakerModel.deleteMany(); // empty the styles db collection
    const inserted = await SneakerModel.insertMany(sneakers); // insert docs in db
    console.log(`seed sneakers done : ${inserted.length} documents inserted !`);
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();

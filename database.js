const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Rahil:Rahil@cluster0.rcy1mug.mongodb.net/?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.error(
  "error",
  console.error.bind(console, "error in connecting with mongodb")
);

db.once("open", () => {
  console.log("succesfully connecting with mongo db");
});

module.exports = db;
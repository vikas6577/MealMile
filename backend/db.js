const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/MealMiles";
const connectToMongo = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

    .then(() => console.log("Connected Successfully"))
    .catch((er) => {
      console.error(err);
    });
};

module.exports = connectToMongo;



const mongoose = require("mongoose");

const mongooConnect = () => {
  try {
    mongoose
      .connect("mongodb://127.0.0.1:27017/cinet")
      .then(() => {
        console.log("db connect");
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = mongooConnect;

const mongoose = require("mongoose");

exports.connectDB = () => {
  try {
    mongoose
      .connect("mongodb://localhost:27017", {
        dbName: "todo-list",
      })
      .then(() => console.log("DB is Connected"))
      .catch(() => console.log("DB is While Connected"));
  } catch (error) {
    console.log("DB Connection error", error);
  }
};
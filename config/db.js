const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/todo-list")
      console.log("DB Connected");
  } catch (error) {
    console.log("DB Connection error", error);
  }
};
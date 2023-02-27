const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("../models/login");
require("../models/employee");
require("../models/leave");
require("../models/project");
require("../models/attendance");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to db");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
    // throw error;
  }
};
module.exports = {
  connect,
};

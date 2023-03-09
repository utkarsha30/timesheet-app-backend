const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Login = mongoose.model("Login");

const getEmployeeById = (id) => {
  const empId = mongoose.Types.ObjectId(id);
  return Login.findById(empId).populate("employee");
};
const postnewLogin = (details) => {
  return Login.create(details);
};
const validateUser = async (loginCredentials) => {
  const user = await Login.findOne({
    email: loginCredentials.email,
  }).populate("employee");
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(
    loginCredentials.password,
    user.password
  );

  if (!isMatch) {
    return null;
  }

  return user;
};
module.exports = {
  getEmployeeById,
  postnewLogin,
  validateUser,
};

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Login = mongoose.model("Login");

const getEmployeeById = (id) => {
  const empId = mongoose.Types.ObjectId(id);
  return Login.findById(empId).populate("employee");
};
const postnewLogin = (bodyDetails) => {
  return Login.create(bodyDetails);
};
const validateUser = async (loginCredentials) => {
  const user = await Login.findOne({
    email: loginCredentials.email,
  });
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

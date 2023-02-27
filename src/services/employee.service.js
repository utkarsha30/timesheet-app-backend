const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");

const registerNewEmployee = (bodyDetails) => {
  return Employee.create(bodyDetails);
};
const getEmpByEmail = (email) => {
  return Employee.find(
    {
      email: email,
    },
    {
      _id: 1,
    }
  );
};
const getAllEmp = () => {
  return Employee.find(
    {
      role: "employee",
    },
    {
      _id: 1,
      email: 1,
      name: 1,
    }
  );
};
module.exports = {
  registerNewEmployee,
  getAllEmp,
  getEmpByEmail,
};

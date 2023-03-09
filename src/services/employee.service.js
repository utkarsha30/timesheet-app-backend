const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");

const registerNewEmployee = (bodyDetails) => {
  return Employee.create(bodyDetails);
};
const updateEmployeeDetails = (id, details) => {
  return Employee.findByIdAndUpdate(id, details, {
    returnOriginal: false,
    runValidators: true,
  });
};
const getEmployeeLeaves = (id) => {
  return Employee.findById(
    {
      _id,
    },
    {
      noOfLeaves: 1,
    }
  );
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
const getAllUsers = () => {
  return Employee.find(
    {},
    {
      _id: 1,
      email: 1,
      name: 1,
    }
  );
};
const getEmployeeById = (id) => {
  return Employee.findById(id).populate("leaves");
};
module.exports = {
  registerNewEmployee,
  getAllEmp,
  getEmpByEmail,
  getAllUsers,
  updateEmployeeDetails,
  getEmployeeLeaves,
  getEmployeeById,
};

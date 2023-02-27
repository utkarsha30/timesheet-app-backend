const employeeService = require("../services/employee.service");
const { Errors } = require("../constants");
const registerNewEmployee = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      message: `Request body is missing, and needs to have the new workshop's details`,
    });
  }
  try {
    const newEmployee = await employeeService.registerNewEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getAllEmp = async (req, res, next) => {
  try {
    const allEmployees = await employeeService.getAllEmp();
    res.status(200).json(allEmployees);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerNewEmployee,
  getAllEmp,
};

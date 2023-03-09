const employeeService = require("../services/employee.service");
const { Errors } = require("../constants");

const registerNewEmployee = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have for creating new employee`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const newEmployee = await employeeService.registerNewEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
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
const getEmployeeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const emp = await employeeService.getEmployeeById(id);

    res.status(200).json(emp);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerNewEmployee,
  getAllEmp,
  getEmployeeById,
};

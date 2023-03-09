const loginService = require("../services/login.service");
const employeeService = require("../services/employee.service");
const JWT = require("jsonwebtoken");
const { Errors } = require("../constants");
const getEmployeeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    //res.locals.clamins have local instance of logged in user
    console.log(res.locals.claims);
    const match = await loginService.getEmployeeById(id);
    if (!match) {
      res.json({
        status: "error",
        data: `Employee with ${id} does not exist`,
      });
    }
    res.json({
      status: "success",
      data: match,
    });
  } catch (error) {
    res.json({
      status: "error",
      data: error.message,
    });
  }
};
const postNewLogin = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      message: `Request body is missing, and needs to have the new workshop's details`,
    });
  }

  try {
    const { email, password } = req.body;
    const emp = await employeeService.getAllUsers();
    let empId = "";
    // console.log(emp);
    emp.forEach((employee) => {
      if (employee.email === email) {
        empId = employee._id;
      }
    });

    if (!empId) {
      const error = new Error(`Employee with ${email} does not exist`);
      error.name = Errors.NotFound;
      return next(error);
    }

    const newLogin = await loginService.postnewLogin({
      email: email,
      password: password,
      employee: empId,
    });
    res.status(201).json({
      status: "success",
      data: newLogin,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const validateUser = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    const error = new Errors(
      `Request body is missing, and needs to have login details`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const user = await loginService.validateUser(req.body);
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: `Invalid credentials, `,
      });
    }
    console.log("email", user);
    //generate JWT
    const claims = {
      _id: user.employee._id,
      name: user.employee.name,
      email: user.employee.email,
      role: user.employee.role,
      approver: user.employee.reportingSupervisor,
    };
    JWT.sign(
      claims,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          err.name = Errors.InternalServerError;
          return next(err);
        }
        console.log(user);
        res.json({
          id: user.employee._id,
          name: user.employee.name,
          email: user.employee.email,
          role: user.employee.role,
          approver: user.employee.reportingSupervisor,
          token,
        });
      }
    );
  } catch (error) {
    const err = new Error("Something went wrong during login");
    err.name = Errors.InternalServerError;
    return next(err);
  }
};

module.exports = {
  getEmployeeById,
  postNewLogin,
  validateUser,
};

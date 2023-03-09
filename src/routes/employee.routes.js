const { Router } = require("express");
const employeeCtrl = require("../controllers/employee.controller");

const router = Router();
router.get("/", employeeCtrl.getAllEmp);
router.get("/:id", employeeCtrl.getEmployeeById);
router.post("/register", employeeCtrl.registerNewEmployee);

module.exports = router;

const { Router } = require("express");
const loginController = require("../controllers/login.controller");
const { authenticate, authorize } = require("../middelware/auth");
const router = Router();
router.post("/", loginController.validateUser);
router.get("/:id", authenticate, loginController.getEmployeeById);
router.post("/register", loginController.postNewLogin);

module.exports = router;

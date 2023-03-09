const { Router } = require("express");
const projectCtrl = require("../controllers/project.controller");
const { authenticate, authorize } = require("../middelware/auth");
const router = Router();

router.get("/", projectCtrl.getAllProjects);
router.post("/", authenticate, authorize("admin"), projectCtrl.postNewProject);
router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  projectCtrl.patchProject
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  projectCtrl.deleteProject
);

module.exports = router;

const { Router } = require("express");
const leaveCtrl = require("../controllers/leave.controller");
const { authenticate, authorize } = require("../middelware/auth");
const router = Router();

router.get("/:id", leaveCtrl.getLeaveById);
router.patch("/:id", authenticate, authorize("employee"), leaveCtrl.patchLeave);
router.delete(
  "/:id",
  authenticate,
  authorize("employee"),
  leaveCtrl.deleteLeave
);
router.post("/", authenticate, authorize("employee"), leaveCtrl.postNewLeave);

module.exports = router;

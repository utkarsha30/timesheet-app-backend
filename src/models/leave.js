const mongoose = require("mongoose");
const leaveSchema = new mongoose.Schema({
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "applied",
    enum: ["applied", "approved", "rejected"],
  },
  type: {
    type: String,
    default: "casual leave",
    enum: ["casual leave", "optional leave", "maternity leave", "sick leave"],
  },
  approver: {
    userId: String,
    email: String,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});
mongoose.model("Leave", leaveSchema);

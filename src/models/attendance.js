const mongoose = require("mongoose");
const attendanceSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  attendanceHours: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "open",
    enum: ["open", "submitted", "approved"],
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  leaveCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Leave",
  },
  projectCode: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      //to stop creating id for subdocuments
      _id: false,
    },
  ],
  approver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
});
mongoose.model("Attendance", attendanceSchema);

const mongoose = require("mongoose");
const Attendance = mongoose.model("Attendance");
const postNewAttendance = (details) => {
  return Attendance.create(details);
};
module.exports = {
  postNewAttendance,
};

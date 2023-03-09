const mongoose = require("mongoose");
const Leave = mongoose.model("Leave");

const postNewLeave = (details) => {
  return Leave.create(details);
};
const getLeaveById = (Id) => {
  return Leave.findById(Id);
};
const patchLeave = (id, details) => {
  return Leave.findByIdAndUpdate(id, details, {
    returnOriginal: false,
    runValidators: true,
  });
};
const deleteLeave = (id) => {
  return Leave.findByIdAndDelete(id);
};
module.exports = {
  postNewLeave,
  getLeaveById,
  patchLeave,
  deleteLeave,
};

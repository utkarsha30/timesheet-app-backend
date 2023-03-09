const attendanceService = require("../services/attendance.service");
const { Errors } = require("../constants");

const postNewAttendance = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have the attendance details`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
  } catch (error) {
    next(error);
  }
};

const leaveService = require("../services/leave.service");
const { Errors } = require("../constants");
const mongoose = require("mongoose");
const postNewLeave = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have the new leave details`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const loggedinUser = res.locals.claims;
    const empId = mongoose.Types.ObjectId(loggedinUser._id);

    req.body.approver = {
      userId: loggedinUser.approver.userId,
      email: loggedinUser.approver.email,
    };
    req.body.employee = empId;

    console.log(req.body);
    const newLeave = await leaveService.postNewLeave(req.body);
    res.status(200).json(newLeave);
  } catch (error) {
    next(error);
  }
};
const getLeaveById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const leavecode = await leaveService.getLeaveById(id);
    if (!leavecode) {
      const error = new Error(`Leavecode with id = ${id} does not exist`);
      error.name = Errors.NotFound;
      return next(error);
    }
    res.status(200).json(leavecode);
  } catch (error) {
    next(error);
  }
};
const patchLeave = async (req, res, next) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have details of leavecode to be updated`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const updatedLeave = await leaveService.patchLeave(id, req.body);
    if (!updatedLeave) {
      const error = new Error(`Leavecode with id = ${id} does not exist`);
      error.name = Errors.NotFound;
      return next(error);
    }
    res.status(200).json(updatedLeave);
  } catch (error) {
    next(error);
  }
};
const deleteLeave = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedLeave = await leaveService.deleteLeave(id);
    if (!deletedLeave) {
      const error = new Error(`Leavecode with id = ${id} does not exist`);
      error.name = Errors.NotFound;
      return next(error);
    }
    res.json(deletedLeave);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  postNewLeave,
  getLeaveById,
  patchLeave,
  deleteLeave,
};

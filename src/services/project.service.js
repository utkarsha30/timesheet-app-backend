const mongoose = require("mongoose");
const Project = mongoose.model("Project");
const getAllPRojects = () => {
  return Project.find();
};
const postNewProject = (details) => {
  return Project.create(details);
};
const getProjectById = (id) => {
  return Project.findById(id);
};
const patchProject = (id, details) => {
  return Project.findByIdAndUpdate(id, details, {
    returnOriginal: false,
    runValidators: true,
  });
};
const deleteProject = (id) => {
  return Project.findByIdAndDelete(id);
};
module.exports = {
  getAllPRojects,
  postNewProject,
  patchProject,
  getProjectById,
  deleteProject,
};

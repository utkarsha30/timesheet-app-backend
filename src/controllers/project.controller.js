const projectService = require("../services/project.service");
const { Errors } = require("../constants");

const postNewProject = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have the new project's details`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    if (req.body.endDate < req.body.startDate) {
      const error = new Error(`Project start date is beyond project end date`);
      error.name = Errors.BadRequest;
      return next(error);
    }
    const newProject = await projectService.postNewProject(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};
const patchProject = async (req, res, next) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have the new project's details`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const updatedProject = await projectService.patchProject(id, req.body);
    if (updatedProject === null) {
      const error = new Error(`A Project with id = ${id} does not exist`);
      error.name = Errors.NotFound;

      return next(error);
    }
    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};
const getAllProjects = async (req, res, next) => {
  try {
    const allProjects = await projectService.getAllPRojects();
    res.status(200).json(allProjects);
  } catch (error) {
    next(error);
  }
};
const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProject = await projectService.deleteProject(id);
    if (deletedProject === null) {
      const error = new Error(`The Projectcode with id = ${id} does not exist`);
      error.name = Errors.NotFound;
      return next(error);
    }
    res.status(200).json(deletedProject);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  postNewProject,
  patchProject,
  getAllProjects,
  deleteProject,
};

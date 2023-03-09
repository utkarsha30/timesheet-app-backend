const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
    designation: {
      type: String,
    },
    role: {
      type: String,
      default: "employee",
      enum: ["admin", "employee"],
    },
    designation: {
      type: String,
      required: true,
    },
    projectCodes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        //to stop creating id for subdocuments
        _id: false,
      },
    ],
    reportingSupervisor: {
      userId: String,
      email: String,
    },
    supervisingEmployees: [
      {
        userId: String,
        email: String,
        //to stop creating id for subdocuments
        _id: false,
      },
    ],
    noOfLeaves: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//add profile picture

employeeSchema.virtual("leaves", {
  ref: "Leave",
  localField: "_id",
  foreignField: "employee", // the field in the other collection (Topic) that references a document in this collection (Workshop)
});

mongoose.model("Employee", employeeSchema);

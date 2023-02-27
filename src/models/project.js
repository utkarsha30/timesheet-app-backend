const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  billability: {
    type: String,
    default: "non-billable",
    enum: ["billable", "non-billable"],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  tasks: [
    {
      name: String,
      //to stop creating id for subdocuments
      _id: false,
    },
  ],
});
mongoose.model("Project", projectSchema);

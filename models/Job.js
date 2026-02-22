const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Applied", "Interview", "Rejected", "Selected"],
    default: "Applied"
  },
  dateApplied: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model("Job", JobSchema);
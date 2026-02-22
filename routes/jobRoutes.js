const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// Add new job
router.post("/add",authMiddleware, async (req, res) => {
  try {
    const { company, role, status, notes } = req.body;

    const newJob = new Job({
  userId: req.user.userId,
  company,
  role,
  status,
  notes
});

    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get all jobs
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { status, search, sort } = req.query;

    let query = { userId: req.user.userId };

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Search by company (case insensitive)
    if (search) {
      query.company = { $regex: search, $options: "i" };
    }

    let jobsQuery = Job.find(query);

    // Sorting
    if (sort === "latest") {
      jobsQuery = jobsQuery.sort({ dateApplied: -1 });
    } else if (sort === "oldest") {
      jobsQuery = jobsQuery.sort({ dateApplied: 1 });
    }

    const jobs = await jobsQuery;

    res.json(jobs);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update job status
router.put("/:id",authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete job
router.delete("/:id",authMiddleware, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
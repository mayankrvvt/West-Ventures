import express from "express";
import Job from "../models/Job.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

// Public: only published/open positions are returned.
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find({ status: "open" }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error("GET /api/jobs", error);
    res.status(500).json({ message: "Unable to load jobs." });
  }
});

// Admin: list every job, including drafts and closed jobs.
router.get("/admin/all", requireAdmin, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error("GET /api/jobs/admin/all", error);
    res.status(500).json({ message: "Unable to load admin jobs." });
  }
});

// Public: a single open job.
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, status: "open" });
    if (!job) return res.status(404).json({ message: "Job not found." });
    res.json(job);
  } catch (error) {
    console.error("GET /api/jobs/:id", error);
    res.status(400).json({ message: "Invalid job id." });
  }
});

router.post("/", requireAdmin, async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    console.error("POST /api/jobs", error);
    res.status(400).json({ message: error.message || "Unable to create job." });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) return res.status(404).json({ message: "Job not found." });
    res.json(job);
  } catch (error) {
    console.error("PUT /api/jobs/:id", error);
    res.status(400).json({ message: error.message || "Unable to update job." });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found." });
    res.json({ message: "Job deleted." });
  } catch (error) {
    console.error("DELETE /api/jobs/:id", error);
    res.status(400).json({ message: "Invalid job id." });
  }
});

export default router;

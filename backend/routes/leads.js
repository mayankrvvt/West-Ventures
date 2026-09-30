import express from "express";
import Lead from "../models/Lead.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

const validStatuses = [
  "new",
  "contacted",
  "qualified",
  "converted",
  "closed",
];

/*
|--------------------------------------------------------------------------
| CREATE LEAD
|--------------------------------------------------------------------------
*/

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      firm = "",
      region = "BC",
      plan = "A",
    } = req.body || {};

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Name is required.",
      });
    }

    if (!email?.trim()) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    const lead = await Lead.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      firm: firm.trim(),
      region,
      plan,
      source: "home-lead-capture",
    });

    return res.status(201).json({
      message: "Lead submitted successfully.",
      lead,
    });
  } catch (error) {
    console.error("POST /api/leads:", error);

    return res.status(400).json({
      message:
        error.message || "Unable to submit lead.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| GET ALL LEADS - ADMIN
|--------------------------------------------------------------------------
*/

router.get("/admin/all", requireAdmin, async (req, res) => {
  try {
    const leads = await Lead.find()
      .sort({ createdAt: -1 });

    return res.json(leads);
  } catch (error) {
    console.error(
      "GET /api/leads/admin/all:",
      error
    );

    return res.status(500).json({
      message: "Unable to load leads.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| UPDATE LEAD
|--------------------------------------------------------------------------
*/

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const updates = {};

    if (req.body.status !== undefined) {
      if (!validStatuses.includes(req.body.status)) {
        return res.status(400).json({
          message: "Invalid lead status.",
        });
      }

      updates.status = req.body.status;
    }

    if (req.body.name !== undefined) {
      updates.name = String(req.body.name).trim();
    }

    if (req.body.email !== undefined) {
      updates.email = String(req.body.email)
        .trim()
        .toLowerCase();
    }

    if (req.body.firm !== undefined) {
      updates.firm = String(req.body.firm).trim();
    }

    if (req.body.region !== undefined) {
      updates.region = req.body.region;
    }

    if (req.body.plan !== undefined) {
      updates.plan = req.body.plan;
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found.",
      });
    }

    return res.json(lead);
  } catch (error) {
    console.error(
      "PUT /api/leads/:id:",
      error
    );

    return res.status(400).json({
      message:
        error.message || "Unable to update lead.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| DELETE LEAD
|--------------------------------------------------------------------------
*/

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(
      req.params.id
    );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found.",
      });
    }

    return res.json({
      message: "Lead deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE /api/leads/:id:",
      error
    );

    return res.status(400).json({
      message: "Invalid lead ID.",
    });
  }
});

export default router;
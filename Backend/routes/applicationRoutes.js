const express = require("express");
const Application = require("../models/Application");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/* CREATE APPLICATION */
router.post("/", protect, async (req, res) => {
  try {
    const application = await Application.create({
      ...req.body,
      user: req.user,
    });
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* GET USER APPLICATIONS */
router.get("/", protect, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user }).sort({
      createdAt: -1,
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// UPDATE APPLICATION STATUS
router.put("/:id", protect, async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = req.body.status || application.status;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const app = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

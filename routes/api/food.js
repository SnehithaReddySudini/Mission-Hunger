const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Food model
const Food = require("../../models/Food");

// @route   POST api/food/add
// @desc    Add food donation (Private - Donors only)
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newFood = new Food({
      donorId: req.user.id, // Comes from the JWT token
      foodName: req.body.foodName,
      description: req.body.description,
      quantity: req.body.quantity,
      expiryDate: req.body.expiryDate
    });

    newFood.save()
      .then(food => res.json(food))
      .catch(err => console.log(err));
  }
);
router.get(
  "/available",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Food.find({ status: "available" })
      .populate("donorId", ["name", "email"]) // This pulls the donor's name/email into the list
      .sort({ date: -1 })
      .then(foods => res.json(foods))
      .catch(err => res.status(404).json({ nofoodfound: "No food available at this time" }));
  }
);
router.get(
  "/mydonations",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Food.find({ donorId: req.user.id })
      .populate("receiverId", ["name", "email"]) // See who requested it
      .sort({ date: -1 })
      .then(foods => res.json(foods))
      .catch(err => res.status(404).json({ nofood: "You haven't posted any food yet" }));
  }
);
// @route   POST api/food/accept/:id
// @desc    Donor accepts a specific request
// @access  Private
router.post(
  "/accept/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const food = await Food.findById(req.params.id);

      if (!food) {
        return res.status(404).json({ foodnotfound: "No food found with that ID" });
      }

      // SECURITY: Check if the logged-in user is actually the one who posted the food
      if (food.donorId.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: "User not authorized to accept this" });
      }

      // Update status to accepted
      food.status = "accepted";
      
      const updatedFood = await food.save();
      res.json(updatedFood);
    } catch (err) {
      res.status(500).json({ error: "Server error while accepting request" });
    }
  }
);
// @route   POST api/food/request/:id
// @desc    Receiver (NGO) requests food
// @access  Private
router.post(
  "/request/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const food = await Food.findById(req.params.id);

      // 1. Check if food is still available
      if (food.status !== "available") {
        return res.status(400).json({ alreadyrequested: "This food is no longer available" });
      }

      // 2. Set the status and the receiver's ID
      food.status = "requested";
      food.receiverId = req.user.id;

      const savedFood = await food.save();
      res.json(savedFood);
    } catch (err) {
      res.status(500).json({ error: "Error requesting food" });
    }
  }
);
router.get(
  "/myrequests",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Food.find({ receiverId: req.user.id })
      .populate("donorId", ["name", "email"]) // So the NGO knows who to contact
      .sort({ date: -1 })
      .then(requests => res.json(requests))
      .catch(err => res.status(404).json({ norequests: "You haven't requested any food yet" }));
  }
);
// @route   GET api/food/admin/all
// @desc    Get ALL food items for Admin tracking
// @access  Private (Admin Only)
router.get(
  "/admin/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Optional: Security check to make sure the logged-in user is actually an admin
    if (req.user.role !== "admin") {
      return res.status(401).json({ notauthorized: "User not authorized" });
    }

    Food.find()
      .populate("donorId", ["name", "email"])
      .populate("receiverId", ["name", "email"])
      .sort({ date: -1 })
      .then(foods => res.json(foods))
      .catch(err => res.status(404).json({ nofoodsfound: "No food items found" }));
  }
);
// @route   GET api/food/admin/all
// @desc    Get ALL system food items for Admin tracking
// @access  Private (Admin Profile Verification Needed)
router.get(
  "/admin/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Safety check: verify the logged-in user is an admin
    if (req.user.role !== "admin") {
      return res.status(401).json({ notauthorized: "User profile lacks administrative access privileges" });
    }

    Food.find()
      .populate("donorId", ["name", "email"])
      .populate("receiverId", ["name", "email"])
      .sort({ date: -1 })
      .then((foods) => res.json(foods))
      .catch((err) => res.status(404).json({ nofoodsfound: "No transaction history located in database" }));
  }
);
module.exports = router;
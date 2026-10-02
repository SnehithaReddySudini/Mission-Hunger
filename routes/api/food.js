const express = require("express");
const router = express.Router();
const passport = require("passport");
const allowRoles = require("../../middleware/role");

// Load Food model
const Food = require("../../models/Food");

const jwtAuth = passport.authenticate("jwt", { session: false });

// @route   POST api/food/add
// @desc    Add food donation
// @access  Private (donor only)
router.post("/add", jwtAuth, allowRoles("donor"), (req, res) => {
  const newFood = new Food({
    donorId: req.user.id,
    foodName: req.body.foodName,
    description: req.body.description,
    quantity: req.body.quantity,
    expiryDate: req.body.expiryDate,
  });

  newFood
    .save()
    .then((food) => res.json(food))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Could not add food" });
    });
});

// @route   GET api/food/available
// @desc    List available food
// @access  Private (any logged-in user)
router.get("/available", jwtAuth, (req, res) => {
  Food.find({ status: "available" })
    .populate("donorId", ["name", "email"])
    .sort({ date: -1 })
    .then((foods) => res.json(foods))
    .catch(() =>
      res.status(404).json({ nofoodfound: "No food available at this time" })
    );
});

// @route   GET api/food/mydonations
// @desc    Donor's own donations
// @access  Private (donor only)
router.get("/mydonations", jwtAuth, allowRoles("donor"), (req, res) => {
  Food.find({ donorId: req.user.id })
    .populate("receiverId", ["name", "email"])
    .sort({ date: -1 })
    .then((foods) => res.json(foods))
    .catch(() =>
      res.status(404).json({ nofood: "You haven't posted any food yet" })
    );
});

// @route   POST api/food/accept/:id
// @desc    Donor accepts a request
// @access  Private (donor only)
router.post("/accept/:id", jwtAuth, allowRoles("donor"), async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res
        .status(404)
        .json({ foodnotfound: "No food found with that ID" });
    }

    if (food.donorId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ notauthorized: "User not authorized to accept this" });
    }

    food.status = "accepted";
    const updatedFood = await food.save();
    res.json(updatedFood);
  } catch (err) {
    res.status(500).json({ error: "Server error while accepting request" });
  }
});

// @route   POST api/food/request/:id
// @desc    Receiver/NGO requests food
// @access  Private (receiver / ngo)
router.post(
  "/request/:id",
  jwtAuth,
  allowRoles("receiver", "ngo"),
  async (req, res) => {
    try {
      const food = await Food.findById(req.params.id);

      if (!food) {
        return res
          .status(404)
          .json({ foodnotfound: "No food found with that ID" });
      }

      if (food.status !== "available") {
        return res
          .status(400)
          .json({ alreadyrequested: "This food is no longer available" });
      }

      food.status = "requested";
      food.receiverId = req.user.id;

      const savedFood = await food.save();
      res.json(savedFood);
    } catch (err) {
      res.status(500).json({ error: "Error requesting food" });
    }
  }
);

// @route   GET api/food/myrequests
// @desc    Receiver's own requests
// @access  Private (receiver / ngo)
router.get(
  "/myrequests",
  jwtAuth,
  allowRoles("receiver", "ngo"),
  (req, res) => {
    Food.find({ receiverId: req.user.id })
      .populate("donorId", ["name", "email"])
      .sort({ date: -1 })
      .then((requests) => res.json(requests))
      .catch(() =>
        res
          .status(404)
          .json({ norequests: "You haven't requested any food yet" })
      );
  }
);

// @route   GET api/food/admin/all
// @desc    All food items for admin tracking
// @access  Private (admin only)
router.get("/admin/all", jwtAuth, allowRoles("admin"), (req, res) => {
  Food.find()
    .populate("donorId", ["name", "email"])
    .populate("receiverId", ["name", "email"])
    .sort({ date: -1 })
    .then((foods) => res.json(foods))
    .catch(() =>
      res.status(404).json({ nofoodsfound: "No food items found" })
    );
});

module.exports = router;
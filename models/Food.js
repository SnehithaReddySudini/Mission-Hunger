const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  donorId: { type: Schema.Types.ObjectId, ref: "users" }, // Link to the user who posted
  foodName: { type: String, required: true },
  description: { type: String },
  quantity: { type: String, required: true },
  expiryDate: { type: Date },
  status: { 
    type: String, 
    enum: ["available", "requested", "accepted", "completed"], 
    default: "available" 
  },
  receiverId: { type: Schema.Types.ObjectId, ref: "users", default: null }
});

module.exports = Food = mongoose.model("food", FoodSchema);
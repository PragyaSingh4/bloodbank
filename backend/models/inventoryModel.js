const mongoose = require("mongoose");

// Inventory schema
const inventorySchema = new mongoose.Schema(
  {
    // Blood group
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    // Blood quantity
    quantity: {
      type: Number,
      required: true,
    },

    // Donation or request
    inventoryType: {
      type: String,
      required: true,
      enum: ["in", "out"],
    },

    // Donor email
    email: {
      type: String,
      required: true,
    },

    // Organisation managing inventory
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Hospital requesting blood
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Donor reference
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  // Timestamps
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Inventory", inventorySchema);
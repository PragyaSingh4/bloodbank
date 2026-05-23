const mongoose = require("mongoose");
const validator = require("validator");

// User schema
const userSchema = new mongoose.Schema(
  {
    // Full name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Email address
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid Email"],
    },

    // Password
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // hides password
    },

    // User role
    role: {
      type: String,
      enum: ["admin", "donor", "hospital", "organisation"],
      required: true,
    },

    // Blood group
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    // Phone number
    phone: {
      type: String,
      required: true,
    },

    // Address
    address: {
      type: String,
      required: true,
    },

    // Organisation name
    organisationName: {
      type: String,
    },

    // Hospital name
    hospitalName: {
      type: String,
    },

    // Website link
    website: {
      type: String,
    },
  },

  // Adds createdAt & updatedAt
  {
    timestamps: true,
  }
);

// Export model
module.exports = mongoose.model("User", userSchema);
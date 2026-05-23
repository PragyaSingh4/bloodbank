const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER CONTROLLER
const registerController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      bloodGroup,
      phone,
      address,
      organisationName,
      hospitalName,
      website,
    } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      bloodGroup,
      phone,
      address,
      organisationName,
      hospitalName,
      website,
    });

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};
// LOGIN CONTROLLER
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email }).select("+password");

    // If user not found
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    // Wrong password
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Hide password before response
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error:error.message,
    });
  }
};

module.exports = { registerController,loginController, };
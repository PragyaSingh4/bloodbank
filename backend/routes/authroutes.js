const express = require("express");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");
const {
  registerController,
  loginController,
} = require("../controllers/authController");

const router = express.Router();

// REGISTER API
router.post("/register", registerController);

// PROTECTED ROUTE
router.get("/current-user", authMiddleware, (req, res) => {
  res.status(200).send({
    success: true,
    user: req.user,
  });
});

// LOGIN API
router.post("/login", loginController);

// ADMIN ONLY ROUTE
router.get(
  "/admin-only",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.status(200).send({
      success: true,
      message: "Welcome Admin",
    });
  }
);

module.exports = router;
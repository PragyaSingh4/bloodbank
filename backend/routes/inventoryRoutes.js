const express = require("express");

const {
  createInventoryController,
  getBloodGroupController,
  requestBloodController,
  getInventoryController,
  getDashboardAnalyticsController,
} = require("../controllers/inventoryController");

const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Add Inventory
router.post(
  "/create-inventory",
  authMiddleware,
  roleMiddleware("admin", "organisation"),
  createInventoryController
);
// GET BLOOD GROUP DATA
router.get(
  "/blood-groups",
  authMiddleware,
  getBloodGroupController
);

// REQUEST BLOOD
router.post(
  "/request-blood",
  authMiddleware,
  roleMiddleware("hospital"),
  requestBloodController
);

// GET INVENTORY HISTORY
router.get(
  "/get-inventory",
  authMiddleware,
  getInventoryController
);

// DASHBOARD ANALYTICS
router.get(
  "/dashboard-analytics",
  authMiddleware,
  roleMiddleware("admin"),
  getDashboardAnalyticsController
);

module.exports = router;
const Inventory = require("../models/inventoryModel");
const mongoose = require("mongoose");

// Add inventory
const createInventoryController = async (req, res) => {
  try {
    const {
      email,
      inventoryType,
      bloodGroup,
      quantity,
      organisation,
      hospital,
      donor,
    } = req.body;

    // Create inventory record
    const inventory = await Inventory.create({
      email,
      inventoryType,
      bloodGroup,
      quantity,
      organisation,
      hospital,
      donor,
    });

    res.status(201).send({
      success: true,
      message: "Inventory Added Successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in Create Inventory API",
      error,
    });
  }
};

// Get blood group details
const getBloodGroupController = async (req, res) => {
  try {
    
    // Get all blood records
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    const bloodData = [];

    // Loop through each blood group
    for (const group of bloodGroups) {

      // Total donated blood
      const totalIn = await Inventory.aggregate([
        {
          $match: {
            bloodGroup: group,
            inventoryType: "in",
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);

      // Total requested blood
      const totalOut = await Inventory.aggregate([
        {
          $match: {
            bloodGroup: group,
            inventoryType: "out",
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);

      // Final available blood
      const availableBlood =
        (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

      bloodData.push({
        bloodGroup: group,
        totalIn: totalIn[0]?.total || 0,
        totalOut: totalOut[0]?.total || 0,
        availableBlood,
      });
    }

    res.status(200).send({
      success: true,
      message: "Blood Group Data Fetched Successfully",
      bloodData,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in Blood Group API",
      error,
    });
  }
};

// Request blood
const requestBloodController = async (req, res) => {
  try {
    const {
      bloodGroup,
      quantity,
      organisation,
      hospital,
      email,
    } = req.body;

    // Calculate total donated blood
const totalIn = await Inventory.aggregate([
  {
    $match: {
      organisation: new mongoose.Types.ObjectId(organisation),
      bloodGroup,
      inventoryType: "in",
    },
  },
  {
    $group: {
      _id: "$bloodGroup",
      total: { $sum: "$quantity" },
    },
  },
]);

// Calculate total requested blood
const totalOut = await Inventory.aggregate([
  {
    $match: {
      organisation: new mongoose.Types.ObjectId(organisation),
      bloodGroup,
      inventoryType: "out",
    },
  },
  {
    $group: {
      _id: "$bloodGroup",
      total: { $sum: "$quantity" },
    },
  },
]);

    // Available blood
    const availableBlood =
      (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

    // Check stock
    if (availableBlood < quantity) {
      return res.status(400).send({
        success: false,
        message: `Only ${availableBlood} units available`,
      });
    }

    // Create blood request
    const inventory = await Inventory.create({
      bloodGroup,
      quantity,
      organisation,
      hospital,
      email,
      inventoryType: "out",
    });

    res.status(201).send({
      success: true,
      message: "Blood Requested Successfully",
      inventory,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in Request Blood API",
      error:error.message,
    });
  }
};

// Get inventory history
const getInventoryController = async (req, res) => {
  try {

    // Fetch all inventory data
    const inventory = await Inventory.find()
      .populate("donor")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Inventory Data Fetched Successfully",
      inventory,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in Get Inventory API",
      error: error.message,
    });
  }
};

// Get dashboard analytics
const getDashboardAnalyticsController = async (req, res) => {
  try {

    // Import user model
    const User = require("../models/userModel");

    // Count donors
    const totalDonors = await User.countDocuments({
      role: "donor",
    });

    // Count hospitals
    const totalHospitals = await User.countDocuments({
      role: "hospital",
    });

    // Count organisations
    const totalOrganisations = await User.countDocuments({
      role: "organisation",
    });

    // Total blood donated
    const totalBloodIn = await Inventory.aggregate([
      {
        $match: {
          inventoryType: "in",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$quantity" },
        },
      },
    ]);

    // Total blood requested
    const totalBloodOut = await Inventory.aggregate([
      {
        $match: {
          inventoryType: "out",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$quantity" },
        },
      },
    ]);

    // Available blood
    const availableBlood =
      (totalBloodIn[0]?.total || 0) -
      (totalBloodOut[0]?.total || 0);

    res.status(200).send({
      success: true,
      message: "Dashboard Analytics Fetched Successfully",

      analytics: {
        totalDonors,
        totalHospitals,
        totalOrganisations,
        totalBloodIn: totalBloodIn[0]?.total || 0,
        totalBloodOut: totalBloodOut[0]?.total || 0,
        availableBlood,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in Dashboard Analytics API",
      error: error.message,
    });
  }
};

module.exports = {
  createInventoryController,
  getBloodGroupController,
  requestBloodController,
  getInventoryController,
  getDashboardAnalyticsController,
};

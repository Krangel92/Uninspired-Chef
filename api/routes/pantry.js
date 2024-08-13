const express = require("express");

const PantryController = require("../controllers/pantry");

const router = express.Router();

// routes for Pantry router
router.post("/create-pantry", PantryController.createPantry);
router.get("/get-pantry", PantryController.getPantry);

module.exports = router;

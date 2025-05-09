const express = require('express');

const { FlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares');

const router = express.Router();

// /api/v1/airports POST
router.post('/',
    FlightMiddlewares.validateCreateRequest, 
    FlightController.createFlight);


module.exports = router;
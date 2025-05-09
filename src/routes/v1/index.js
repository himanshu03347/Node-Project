const express = require('express');

const {InfoController} = require('../../controllers');
const airplaneRoutes = require('./airplane-routes');
const cityRoutes = require('./city-routes');
const AirportRoutes = require('./airport-routes');
const FlightRoutes = require('./flight-routes');

const router = express.Router();


router.use('/airplanes', airplaneRoutes);
router.use('/cities', cityRoutes);
router.use('/airports', AirportRoutes);
router.use('/flights', FlightRoutes);
router.get('/info', InfoController.info);

module.exports = router;
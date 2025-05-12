const { StatusCodes } = require('http-status-codes');

const { FlightService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { error } = require('../utils/common/error-response');

/**
 * POST: /flights
 * req-body { 
*   flightNumber: 'UK 808', 
*   airplaneId: 'a380', 
*   depatureAirportId: 12, 
*   arrivalAirportId: 11,  
*   arrivalTime: '11:10:00',       
*   departureTime: '9:10:00',     
*   price: 2000,             
*   boardingGate: '12A',      
*   TotalSeats: 120  
 * }
 */

async function createFlight(req, res){
    try {
        const flight = await FlightService.createFlight({
            id: req.body.id,
            flightNumber: req.body.flightNumber, 
            airplaneId: req.body.airplaneId, 
            departureAirportId: req.body.departureAirportId, 
            arrivalAirportId: req.body.arrivalAirportId,  
            arrivalTime: req.body.arrivalTime,       
            departureTime: req.body.departureTime,     
            price: req.body.price,             
            boardingGate: req.body.boardingGate,      
            TotalSeats: req.body.TotalSeats
        });
        SuccessResponse.message = 'Successfully create an Flight';
        SuccessResponse.data = flight;

        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    }catch(error){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getAllFlights(req, res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = 'Something went wrong while getting Flights data';
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
        
    }
}

module.exports = {
    createFlight,
    getAllFlights
}
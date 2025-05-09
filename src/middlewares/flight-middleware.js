const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next){
    if(!req.body.flightNumber){
        ErrorResponse.message = 'Something Went wrong while creating Flight';
        ErrorResponse.error = new AppError('Flight Number Not Found!', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.airplaneId){
        ErrorResponse.message = 'Something Went wrong while creating Flight';
        ErrorResponse.error = new AppError('AirplaneId Not Found!', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message = 'Something Went wrong while creating Flight';
        ErrorResponse.error = new AppError('Departure AirportId Not Found!', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message = 'Something Went wrong while creating Flight';
        ErrorResponse.error = new AppError('Arrival AirportId Not Found!', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message = 'Something Went wrong while creating Flight';
        ErrorResponse.error = new AppError('Arrival Time Not Found!', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.departureTime){
        ErrorResponse.message = 'Something Went wrong while creating Flight';
        ErrorResponse.error = new AppError('Departure Time Not Found!', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.price){
        ErrorResponse.message = 'Something Went wrong while creating Flight';
        ErrorResponse.error = new AppError('Price Not Found!', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.TotalSeats){
        ErrorResponse.message = 'Something Went wrong while creating Flight';
        ErrorResponse.error = new AppError('Total Seats Not Found!', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}
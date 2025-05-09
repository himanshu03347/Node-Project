const { StatusCodes } = require('http-status-codes');

const { AirportService } = require('../services')
const { SuccessResponse, ErrorResponse } = require('../utils/common');


/**
 * POST: /airports
 * req-body {name: "IGI", cityId: 5, code: "DEL"}
 */

async function createAirport(req, res){
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });
        SuccessResponse.message = 'Successfully create an airport';
        SuccessResponse.data = airport;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    }catch(error){
        ErrorResponse.message = 'Something went wrong while creating airplane';
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


/**
 * get: /airports
 * req-body { }
 */
async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.message = 'Successfully fetch all airports';
        SuccessResponse.data = airports;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
    
}

/**
 * get: /airports/:id
 * req-body { }
 */

async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.message = 'Successfully fetch an airport';
        SuccessResponse.data = airport;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
    
}


/**
 * DELETE : /airports/:id 
 * req-body { } 
 */
async function destroyAirport(req, res) {
    try {
    const airport = await AirportService.destroyAirport(req.params.id);
    SuccessResponse.message = 'Successfully deleted an airport';
    SuccessResponse.data = airport;
    return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * UPDATE : /airports/:id 
 * req-body { name: "IGI", cityId: 5, code: "DEL"} 
 */
async function updateAirport(req, res) {
    try {
    const airplane = await AirportService.updateAirport(req.params.id, req.body);
    SuccessResponse.message = 'Successfully updated an airport record';
    SuccessResponse.data = airplane;
    return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}

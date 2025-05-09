const {StatusCodes} = require('http-status-codes');

const { CityService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const { error } = require('../utils/common/error-response');

/**
 * POST: /cities
 * req-body {name: 'Lodon'}
 */
async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
            name: req.body.name
        });
        SuccessResponse.message = 'Successfully create an city';
        SuccessResponse.data = city;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    }catch(error){
        ErrorResponse.message = 'Something went wrong while creating city';
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * GET : /cities/ 
 * req-body { } 
 */
async function getCities(req, res) {
    try {
        const cities = await CityService.getCities();
        SuccessResponse.data = cities;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = 'Cities Not Found!';
        ErrorResponse.error = error;
        return res 
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}


/**
 * GET : /cities/:id 
 * req-body { } 
 */
async function getCity(req, res) {
    try {
        const city = await CityService.getCity(req.params.id);
        SuccessResponse.data = city;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = 'Cities Not Found!';
        ErrorResponse.error = error;
        return res 
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}


/**
 * DELETE : /cities/:id 
 * req-body { } 
 */
async function destroyCity(req, res) {
    try {
        const city = await CityService.destroyCity(req.params.id);
        SuccessResponse.data = city;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = 'City Not Found!';
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

/**
 * UPDATE : /cities/:id 
 * req-body { "name": 'Mumbai'} 
 */
async function updateCity(req, res) {
    try {
        const city = await CityService.updateCity(req.params.id, req.body);
        SuccessResponse.data = city;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = 'Object Not found in DB';
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
        
    }
}


module.exports = {
    getCities,
    getCity,
    createCity,
    destroyCity,
    updateCity
}
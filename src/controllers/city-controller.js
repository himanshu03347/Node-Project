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
 * DELETE : /cities/:id 
 * req-body { } 
 */
async function destroyCity(req, res) {
    try {
        // console.log(req.params.id)
        const city = await CityService.destroyCity(req.params.id);
        console.log(city)
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

module.exports = {
    createCity,
    destroyCity
}
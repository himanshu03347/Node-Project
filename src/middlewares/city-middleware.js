const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next){
    if(!req.body.name || req.body.name == " "){
        ErrorResponse.message = 'Something went wrong while creating creating';
        ErrorResponse.error = new AppError(['City name not found in the incoming request the correct way', StatusCodes.BAD_REQUEST]);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {validateCreateRequest}
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next){
    if(!req.body.name || !req.body.code || !req.body.cityId){
        ErrorResponse.message = 'Something Went wrong while creating Airport';
        ErrorResponse.error = new AppError('Name, Code or cityId Not Found!', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}
const { StatusCodes } = require('http-status-codes');

const { FlightRepository }= require('../repositories');
const AppError = require('../utils/errors/app-error');

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explantion = [];
            error.errors.forEach((err) => {
                explantion.push(err.message);
            });
            throw new AppError(explantion, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight
}
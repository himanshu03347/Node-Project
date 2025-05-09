const { StatusCodes } = require('http-status-codes');

const { AirportRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error');

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explantion = [];
            error.errors.forEach((err) => {
                explantion.push(err.message);
            });
            throw new AppError(explantion, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try{
        const airport = await airportRepository.getAll();
        return airport;
    } catch(error) {
        throw new AppError('Cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

async function getAirport(id) {
    try {
        const airportgetAirport = await airportRepository.get(id);
        return airportgetAirport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airport you request does not exist', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the airport', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
    
}

async function destroyAirport(id) {
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airport you request to delete does not exist', error.statusCode);
        }
        throw new AppError('Cannot delete data of the airport', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}

async function updateAirport(id, data) {
    try {
        const response = await airportRepository.update(id, data);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airport you request to update does not exist', error.statusCode);
        }
        throw new AppError('Cannot update data of the airport', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}

module.exports = { 
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
};
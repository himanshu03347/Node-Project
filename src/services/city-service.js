const { StatusCodes } = require('http-status-codes');

const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();


async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explantion = [];
            error.errors.forEach((err) => {
                explantion.push(err.message);
            });
            throw new AppError(explantion, StatusCodes.BAD_REQUEST)
        }
        // if(error.name == 'SequelizeUniqueConstraintError'){
        //     let explantion = [];
        //     error.errors.forEach((err) => {
        //         explantion.push(err.message);
        //     });
        //     throw new AppError(explantion, StatusCodes.CONFLICT)
        // }
        throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCities() {
    try {
        const response = await cityRepository.getAll();
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Cities Database is empty', error.statusCode);
        }
        throw new AppError('Cannot find the cities data', StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

async function getCity(id) {
    try {
        const response = await cityRepository.get(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The city you request to find doesnot not exist in DB', error.statusCode);
        }
        throw new AppError('Cannot find the data of the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

async function destroyCity(id) {
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The city you request to delete does not exist', error.statusCode);
        }
        throw new AppError('Cannot delete data of the city', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}

async function updateCity(id, data) {
    try {
        const response = await cityRepository.update(id, data);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you request to delete does not exist', error.statusCode);
        }
        throw new AppError('Cannot delete data of the airplane', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
    
}


module.exports = {
    getCities,
    getCity,
    createCity,
    destroyCity,
    updateCity
}
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

module.exports = {
    createCity
}
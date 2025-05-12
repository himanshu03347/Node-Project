const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const { FlightRepository }= require('../repositories');
const { compareTime } = require('../utils/helpers/datetime-helper');
const AppError = require('../utils/errors/app-error');

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const departTime = data.departureTime;
        const arrTime = data.arrivalTime;
        if(compareTime(arrTime, departTime)){
            const flight = await flightRepository.create(data);
            return flight;
        }else {
            throw new AppError('Arrival Time must be after Departure Time', StatusCodes.BAD_REQUEST);
        }
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        if(error.name == 'SequelizeValidationError'){
            let explantion = [];
            error.errors.forEach((err) => {
                explantion.push(err.message);
            });
            throw error;
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = {};
    // trips= 'MUM-DEL'
    if(query.trips){
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        // to do: add a check that they are not same
    }
    if(query.price){
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined) ? 20000: maxPrice)]
        }
    }
    if(query.travellers) {
        customFilter.TotalSeats = {
            [Op.gte]: query.travellers
        }
    }
    if(query.tripDate){
        customFilter.departureTime ={
            [Op.gte]: query.tripDate
        }
    }
    if(query.sort) {
        const params = query.sort.split(',');
        const sortFilters =params.map((param) => param.split('_'));
        sortFilter = sortFilters
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}


module.exports = {
    createFlight,
    getAllFlights
}
const { Logger } = require('../config');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
            const response = await this.model.create(data);
            return response;
    }

    async destroy(data) {
        try{
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            });
            if(!response) {
                throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND)
            }
            return response;
        }catch(error){
            Logger.error('Something went wrong in the Crud Repo: destroy');
            throw error;
        }
    }

    async get(data) {
        try{
            const response = await this.model.findByPk(data);
            if(!response) {
                throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND)
            }
            return response;
        }catch(error){
            Logger.error('Something went wrong in the Crud Repo: get');
            throw error;
        }
    }

    async getAll() {
        try{
            const response = await this.model.findAll();
            return response;
        }catch(error){
            Logger.error('Something went wrong in the Crud Repo: getAll');
            throw error;
        }
    }


    async update(id, data) {    // data -> {col: value, ...}
        try{
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            if (response === 0) {
                throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND)
            }
            Logger.info(`Successfully updated ${response} row(s)`);
            return response;
        }catch(error){
            // Logger.error('Something went wrong in the Crud Repo: update');
            Logger.error(`Crud Repo: update - ${error.message}`);
            throw error;
        }
    }
}

module.exports = CrudRepository;
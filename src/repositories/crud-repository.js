const { Logger } = require('../config')

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        console.log('Inside repository')
        try{
            const reponse = await this.model.create(data);
            return reponse;
        }catch(error){
            Logger.error('Something went wrong in the Crud Repo: create');
            throw error;
        }
    }

    async destroy(data) {
        try{
            const reponse = await this.model.destroy({
                where: {
                    id: data
                }
            });
            return reponse;
        }catch(error){
            Logger.error('Something went wrong in the Crud Repo: destroy');
            throw error;
        }
    }

    async get(data) {
        try{
            const reponse = await this.model.findByPk(data);
            return reponse;
        }catch(error){
            Logger.error('Something went wrong in the Crud Repo: get');
            throw error;
        }
    }

    async getAll() {
        try{
            const reponse = await this.model.findAll();
            return reponse;
        }catch(error){
            Logger.error('Something went wrong in the Crud Repo: getAll');
            throw error;
        }
    }


    async update(id, data) {    // data -> {col: value, ...}
        try{
            const reponse = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return reponse;
        }catch(error){
            Logger.error('Something went wrong in the Crud Repo: update');
            throw error;
        }
    }
}

module.exports = CrudRepository;
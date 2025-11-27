const { SportService, Trainer, GymHall } = require('../models');

class ContentRepository {

    async getAllServices() {
        return await SportService.findAll();
    }

    async saveService(serviceData) {
        if(serviceData.id) {
            return await SportService.update(
                serviceData, 
                { where: 
                    {id : serviceData.id}
                }
            );
        }
        return await SportService.create(serviceData);
    }

    async deleteService(id){
        return await SportService.destroy(
            { where: {id} }
        );
    }

    async getAllTrainers() {
        return await Trainer.findAll();
    }

    async saveTrainer(trainerData) {
        if(trainerData.id) {
            return await Trainer.update(
                trainerData, 
                { where: 
                    {id : trainerData.id}
                }
            );
        }
        return await Trainer.create(trainerData);
    }

    async deleteTrainer(id) {
        return await Trainer.destroy(
            { where: {id} }
        );
    }

    async getAllGymHalls() {
        return await GymHall.findAll();
    }

    async saveGymHall(hallData) {
        if(hallData.id) {
            return await GymHall.update(
                hallData, 
                { where: 
                    {id : hallData.id}
                }
            );
        }
        return await GymHall.create(hallData);
    }

}

module.exports = new ContentRepository();
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
        return await GymHall.findAll({
            include: [
                {
                    model: SportService,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                },
                {
                    model: Trainer,
                    attributes: ['id', 'firstName', 'lastName'],
                    through: { attributes: [] }
                }
            ]
        });
    }

    async saveGymHall(data) {
        const hall = await GymHall.create({
            name: data.name,
            capacity: data.capacity,
            location: data.location,
            photoUrl: data.photoUrl
        });

        if (data.serviceIds && data.serviceIds.length > 0) {
            await hall.setSportServices(data.serviceIds);
        }

        if (data.trainerIds && data.trainerIds.length > 0) {
            await hall.setTrainers(data.trainerIds);
        }

        return hall;
    }

    async deleteGymHall(id) {
        return await GymHall.destroy(
            { where: {id} }
        );
    }

}

module.exports = new ContentRepository();
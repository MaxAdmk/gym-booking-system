const ContentRepository = require('../repositories/ContentRepository');
const UserRepository = require('../repositories/UserRepository');

class AdminService {

    //User managment
    async blockUser(userId) {
        return await UserRepository.delete(userId);
    }

    async getAllUsers() {
        return await UserRepository.findAll();
    }

    // Content management (Services)
    async createService(data) {
        return await ContentRepository.saveService(data);
    }

    async updateService(id, data) {
        return await ContentRepository.saveService({ ...data, id });
    }

    async deleteService(id) {
        return await ContentRepository.deleteService(id);
    }

    // Content Management (Trainers)
    async createTrainer(data) {
        return await ContentRepository.saveTrainer(data);
    }

    async updateTrainer(id, data) {
        return await ContentRepository.saveTrainer({ ...data, id });
    }

    async deleteTrainer(id) {
        return await ContentRepository.deleteTrainer(id);
    }

    // Content Management (GymHalls)
    async createGym(data) {
        return await ContentRepository.saveGymHall(data);
    }

    async deleteGym(id) {
        return await ContentRepository.deleteGymHall(id);
    }

}

module.exports = new AdminService();
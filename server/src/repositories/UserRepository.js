const { User } = require('../models');

class UserRepository {

    async save(userData){
        return await User.create(userData);
    }

    async findById(id){
        return await User.findByPk(id);
    }

    async findByEmail(email){
        return await User.findOne({
            where: {email}
        });
    }

    async findAll() {
        return await User.findAll();
    }

    async delete(id){
        return await User.destroy({
            where: {id}
        });
    }
}

module.exports = new UserRepository();
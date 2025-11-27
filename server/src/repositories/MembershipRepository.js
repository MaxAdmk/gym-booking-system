const { Membership } = require('../models');

class MembershipRepository{

    async save(membershipData) {
        return await Membership.create(membershipData);
    }

    async findActiveByUserId(userId) {
        return await Membership.findOne(
            { where: {
                userId: userId, 
                status: 'ACTIVE'
                }   
            }
        );
    }

    async delete(id) {
        return await Membership.destroy({
            where: {id}
        });
    }

}

module.exports = new MembershipRepository();
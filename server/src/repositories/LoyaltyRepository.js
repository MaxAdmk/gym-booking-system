const { LoyaltyCard } = require('../models');

class LoyaltyCardRepository{

    async findByUserId(userId) {
        return await LoyaltyCard.findOne({
            where: {userId}
        });
    }

    async updatePoints(cardId, newPointsAmount) {
        return await LoyaltyCard.update(
            { pointBalance: newPointsAmount },
            { where: { id: cardId } }
        );
    }

    async updateLevel(cardId, newLevel) {
        return await LoyaltyCard.update(
            { level: newLevel },
            { where: {id: cardId} }
        );
    }

    async createLoyaltyCard(userId) {
        return await LoyaltyCard.create(
            { userId, level: 'STANDART', pointBalance: 0 }
        );
    }

}

module.exports = new LoyaltyCardRepository();
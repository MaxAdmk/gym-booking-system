const LoyaltyRepository = require('../../repositories/LoyaltyRepository');
const StandartStrategy = require('./StandardStrategy');
const PremiumStrategy = require('./PremiumStrategy');

class LoyaltyService {

    constructor() {
        this.repo = LoyaltyRepository;
    }

    getStrategy(level) {
        if (level === 'PREMIUM') {
            return PremiumStrategy;
        } else {
            return StandartStrategy;
        }
    }

    async calculatePoints(amount, cardLevel) {
        const strategy = this.getStrategy(cardLevel);
        return strategy.calculate(amount);
    }

    async processBookingBonus(userId, amount) {
        const card = await this.repo.findByUserId(userId);
        if (!card) return;

        const pointsToAdd = await this.calculatePoints(amount, card.level);

        const newBalance = card.pointBalance + pointsToAdd;

        await this.repo.updatePoints(card.id, newBalance);
    }

    async upgradeLevel(userId) {
        const card = await this.repo.findByUserId(userId);

        if (card && card.level === 'STANDART') {
            await this.repo.updateLevel(card.id, 'PREMIUM')
            return true;
        } else {
            return false
        }
    }

}

module.exports = new LoyaltyService();
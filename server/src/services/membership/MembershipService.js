const MembershipRepository = require('../../repositories/MembershipRepository');
const MembershipFactory = require('./MembershipFactory');
const LoyaltyService = require('../loyalty/LoyaltyService');

class MembershipService {

    constructor() {
        this.repo = MembershipRepository;

        this.prices = {
            'SINGLE': 100,
            'MONTHLY': 800,
            'CORPORATE': 5000
        };
    }

    async buyMembership(userId, type) {
        const membershipData = MembershipFactory.createMembershipData(userId, type);

        const newMembership = await this.repo.save(membershipData);

        const price = this.prices[type] || 0;
        if (price > 0) {
            console.log('Adding loyalty poinst for ${type} membership ${price}UAH');
            await LoyaltyService.processBookingBonus(userId, price);
        }

        return newMembership;
    }

    async checkStatus(userId) {
        const membership = await this.repo.findActiveByUserId(userId);

        if (!membership) return false;

        const today = new Date();
        const end = new Date(membership.endDate);

        return today <= end;
    }

}

module.exports = new MembershipService();
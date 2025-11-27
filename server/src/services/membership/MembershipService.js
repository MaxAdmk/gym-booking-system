const MembershipRepository = require('../../repositories/MembershipRepository');
const MembershipFactory = require('./MembershipFactory');

class MembershipService {

    constructor() {
        this.repo = MembershipRepository;
    }

    async buyMembership(userId, type) {
        const membershipData = MembershipFactory.createMembershipData(userId, type);

        const newMembership = await this.repo.save(membershipData);

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
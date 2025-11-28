const MembershipService = require('../services/membership/MembershipService');
const LoyaltyRepository = require('../repositories/LoyaltyRepository');
const UserRepository = require('../repositories/UserRepository');

class ProfileController {

    async getProfile(req, res) {
        try {
            const { userId } = req.params;
            const user = await UserRepository.findById(userId);
            const card = await LoyaltyRepository.findByUserId(userId);
            const membership = await MembershipService.repo.findActiveByUserId(userId);

            res.json({ user, card, membership });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async buyMembership(req, res) {
        try {
            const { userId, type } = req.body;
            const membership = await MembershipService.buyMembership(userId, type);
            res.status(201).json(membership);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

module.exports = new ProfileController();
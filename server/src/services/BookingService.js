const BookingRepository = require('../repositories/BookingRepository');
const LoyaltyService = require('./loyalty/LoyaltyService');
const MembershipRepository = require('../repositories/MembershipRepository');
const ContentRepository = require('../repositories/ContentRepository');

class BookingService {

    async checkAvailability(hallId, trainerId, startTime, endTime) {
        if (!trainerId) {
            return { available: false, reason: 'Trainer is required for this booking!' };
        }

        const now = new Date();
        const start = new Date(startTime);
        if (start < now) {
            return { available: false, reason: 'Cannot book in the past!' };
        }

        const hallConflicts = await BookingRepository.findActiveByHallAndDate(hallId, startTime, endTime);
        if (hallConflicts.length > 0) return { available: false, reason: 'Hall is busy' };

        const trainerConflicts = await BookingRepository.findActiveByTrainerAndDate(trainerId, startTime, endTime);
        if (trainerConflicts.length > 0) return { available: false, reason: 'Trainer is busy' };

        return { available: true };
    }

    async calculatePrice(serviceId, userId) {
        const services = await ContentRepository.getAllServices();
        const service = services.find(s => s.id == serviceId);
        
        if (!service) throw new Error('Service not found');
        let finalPrice = parseFloat(service.price);

        const membership = await MembershipRepository.findActiveByUserId(userId);

        if (membership && membership.type === 'CORPORATE' && service.category === 'Swimming') {
            console.log('CORPORATE PERK APPLIED: Free Pool Access');
            return 0; 
        }

        return finalPrice;
    }

}

module.exports = new BookingService();
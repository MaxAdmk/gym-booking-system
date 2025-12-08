const AdminService = require('../services/AdminService');
const NotificationService = require('../services/NotificationService');

class AdminController {

    async deleteUser(req, res) {
        try {
            await AdminService.blockUser(req.params.id);
            res.json({ message: 'User deleted/blocked' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createService(req, res) {
        try {
            const service = await AdminService.createService(req.body);
            res.status(201).json(service);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createTrainer(req, res) {
        try {
            const trainer = await AdminService.createTrainer(req.body);
            res.status(201).json(service);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createGymHall(req, res) {
        try {
            const gymHall = await AdminService.createGym(req.body);
            res.status(201).json(gymHall);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async triggerReminders(req, res) {
        try {
            const result = await NotificationService.sendReminders();
            res.json({ message: `Reminders sent for ${result.count} bookings.` });
        } catch (error) { 
            console.error(error);
            res.status(500).json({ error: error.message }); 
        }
    }

}

module.exports = new AdminController(); 
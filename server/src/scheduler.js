const cron = require('node-cron');
const NotificationService = require('./services/NotificationService');

const initScheduledJobs = () => {
    console.log('Scheduler initialized.');

    // Each day at 9 am
    cron.schedule('0 9 * * *', async () => {
        console.log('Running daily reminder task...');
        try {
            const result = await NotificationService.sendReminders();
            console.log(`Daily reminders sent to ${result.count} users.`);
        } catch (error) {
            console.error('Error running daily reminders:', error);
        }
    });
};

module.exports = initScheduledJobs;
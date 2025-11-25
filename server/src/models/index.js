const sequelize = require('../config/database').sequelize;

// Importing models
const User = require('./User');
const Booking = require('./Booking');
const GymHall = require('./GymHall');
const LoyaltyCard = require('./LoyaltyCard');
const Membership = require('./Membership');
const Notification = require('./Notification');
const SportService = require('./SportService');
const Trainer = require('./Trainer');

// Defining connections

// User -> LoyaltyCard (1:1)
User.hasOne( LoyaltyCard, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
LoyaltyCard.belongsTo( User, {
    foreignKey: 'userId'
});

// User -> Membership (1:N)
User.hasMany( Membership, {
    foreignKey: 'userId'
});
Membership.belongsTo( User, {
    foreignKey: 'userId'
});

// User -> Notification (1:N)
User.hasMany( Notification, {
    foreignKey: 'userId'
});
Notification.belongsTo( User, {
    foreignKey: 'userId'
});

// User -> Booking (1:N)
User.hasMany( Booking, {
    foreignKey: 'userId'
});
Booking.belongsTo( User, {
    foreignKey: 'userId'
});

// Booking connections

// Booking -> GymHall (N:1)
GymHall.hasMany( Booking, {
    foreignKey: 'hallId'
});
Booking.belongsTo( GymHall, {
    foreignKey: 'hallId',
});

// Booking -> SportService (N:1)
SportService.hasMany( Booking, {
    foreignKey: 'serviceId'
});
Booking.belongsTo( SportService, {
    foreignKey: 'serviceId'
})

// Booking -> Trainer (N:1)
Trainer.hasMany( Booking, {
    foreignKey: 'trainerId'
});
Booking.belongsTo( Trainer, {
    foreignKey: 'trainerId'
});

// Exporting the db object

const db = {
    sequelize,
    User,
    Booking,
    GymHall,
    LoyaltyCard,
    Membership,
    Notification,
    SportService,
    Trainer
};

module.exports = db;
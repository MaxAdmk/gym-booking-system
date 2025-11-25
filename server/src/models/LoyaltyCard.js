const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 

// Defining LoyaltyCard model
const LoyaltyCard = sequelize.define('LoyaltyCard', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pointBalance: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    level: {
        type: DataTypes.ENUM('STANDART', 'PREMIUM'),
        defaultValue: 'STANDART'
    } 
}, {
    timestamps: false
});

module.exports = LoyaltyCard;
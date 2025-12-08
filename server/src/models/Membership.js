const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 

// Defining Membership model
const Membership = sequelize.define('Membership', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('MONTHLY', 'SINGLE', 'CORPORATE'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'EXPIRED'),
        defaultValue: 'ACTIVE'
    }
}, {
    timestamps: true
});

module.exports = Membership;
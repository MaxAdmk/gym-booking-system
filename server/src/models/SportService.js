const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 

// Defining SportService model
const SportService = sequelize.define('SportService', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    difficultyLevel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ageCategory: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        defaultValue: 'Adults' 
    }
}, {
    timestamps: false
});

module.exports = SportService;
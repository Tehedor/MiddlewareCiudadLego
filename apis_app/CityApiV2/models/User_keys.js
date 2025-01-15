// models/User.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db_app_apis_database');

const EnvConfig = require('../utils/env.config');
const {  limit_api_key, time_limit_api_key} = EnvConfig();

class User_keys extends Model {}

User_keys.init(  {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    api_key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    request_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    request_count_limit: {
        type: DataTypes.INTEGER,
        defaultValue: limit_api_key
    },
    time_limit_api_key : {
        type: DataTypes.INTEGER,
        defaultValue: time_limit_api_key
    },

    remaining_requests:{
        type: DataTypes.INTEGER,
        defaultValue: limit_api_key
    },
    last_date_period:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'User_keys',
    tableName: 'api_keys',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User_keys;

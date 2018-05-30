const Sequelize = require('sequelize');
var sequelize = require('../config.js');

var db = {};

db.ItemModel = sequelize.define('items', {        
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: Sequelize.STRING,
        field: 'code' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    area: {
        type: Sequelize.STRING,
        field: 'area'
    },
    headquarter: {
        type: Sequelize.STRING,
        field: 'headquarter'
    },
    entity: {
        type: Sequelize.STRING,
        field: 'entity'
    },
    logotipo: {
        type: Sequelize.STRING,
        field: 'logotipo'
    }
});

db.sequelize = sequelize;
module.exports = db;
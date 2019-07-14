const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Order = sequelize.define("order", {
  id: {
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER
  }
});

module.exports = Order;

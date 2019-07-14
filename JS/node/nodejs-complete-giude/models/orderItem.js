const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const OrderItem = sequelize.define("orderItem", {
  id: {
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  quantity: Sequelize.INTEGER
});

module.exports = OrderItem;

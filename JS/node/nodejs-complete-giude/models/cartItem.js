const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const CartItem = sequelize.define("cartItem", {
  id: {
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  quatity: Sequelize.INTEGER
});

module.exports = CartItem;

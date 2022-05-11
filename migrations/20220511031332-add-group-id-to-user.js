'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'group_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Groups',
        key: 'id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'group_id')
  }
}

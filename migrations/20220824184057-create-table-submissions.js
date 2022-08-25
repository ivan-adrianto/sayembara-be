"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("submissions", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      participant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      contest_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      thumbnail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('submissions', {
      type: 'foreign key',
      name: 'SUBMISSIONS__CONTEST_ID',
      fields: ['contest_id'],
      references: {
        table: 'contests',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('submissions', {
      type: 'foreign key',
      name: 'SUBMISSIONS__PARTICIPANT_ID',
      fields: ['participant_id'],
      references: {
        table: 'users',
        field: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("submissions");
  },
};

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("subs_images", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      submission_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });

    await queryInterface.addConstraint('subs_images', {
      type: 'foreign key',
      name: 'IMAGES__SUBMISSION_ID',
      fields: ['submission_id'],
      references: {
        table: 'submissions',
        field: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("subs_images");
  },
};

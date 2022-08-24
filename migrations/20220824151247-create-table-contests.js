"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("contests", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contest_status: {
        type: Sequelize.ENUM,
        values: ["Open", "Pending", "Closed"],
        allowNull: false
      },
      payment_status: {
        type: Sequelize.ENUM,
        values: ["Paid", "Unpaid"],
        allowNull: false
      },
      prize: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      announcement_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      winner_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      provider_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('contests', {
      type: 'foreign key',
      name: 'CONTESTS__WINNER_ID',
      fields: ['winner_id'],
      references: {
        table: 'users',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('contests', {
      type: 'foreign key',
      name: 'CONTESTS__CATEGORY_ID',
      fields: ['category_id'],
      references: {
        table: 'categories',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('contests', {
      type: 'foreign key',
      name: 'CONTESTS__PROVIDER_ID',
      fields: ['provider_id'],
      references: {
        table: 'users',
        field: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("contests");
  },
};

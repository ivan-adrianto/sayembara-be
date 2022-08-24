"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("categories", [
      { id: 1, name: "Logo Design Contest" },
      { id: 2, name: "UI/UX Design Contest" },
      { id: 3, name: "Banner/Poster Design Contest" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("subs_images", [
      {
        id: 1,
        image: "localhost:8080/images/1663507748733.jpg",
        submission_id: 1,
      },
      {
        id: 2,
        image: "localhost:8080/images/1663507748777.jpg",
        submission_id: 1,
      },
      {
        id: 3,
        image: "localhost:8080/images/1663507748824.jpg",
        submission_id: 1,
      },
      {
        id: 4,
        image: "localhost:8080/images/1663562695865.jpg",
        submission_id: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("subs_images", null, {});
  },
};

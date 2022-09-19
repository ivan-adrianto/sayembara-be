"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("submissions", [
      {
        id: 1,
        participant_id: 1,
        contest_id: 1,
        thumbnail: "localhost:8080/images/1663507748693.jpg",
        title: "Three Musketeers",
        description:
          "In August 2013, we set out with a goal to create a free and easy to use service to generate random user data for application testing.",
      },
      {
        id: 2,
        participant_id: 2,
        contest_id: 1,
        thumbnail: "localhost:8080/images/1663562695795.jpg",
        title: "kawa",
        description:
          "Kawamatsu no Kappa suiton indigeneous prodigy swordsmen around the world of wonder",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("submissions", null, {});
  },
};

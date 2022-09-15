"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("submissions", [
      {
        id: 1,
        participant_id: 1,
        contest_id: 1,
        thumbnail: "https://picsum.photos/id/111/200",
        title: "The Great Wall",
        description: "this is the part where i nononoo nono o no",
      },
      {
        id: 2,
        participant_id: 1,
        contest_id: 2,
        thumbnail: "https://picsum.photos/id/112/200",
        title: "The Bing Bingo",
        description: "this is the part where i huwooo",
      },
      {
        id: 3,
        participant_id: 2,
        contest_id: 2,
        thumbnail: "https://picsum.photos/id/112/200",
        title: "The Bing Bingo",
        description: "this is the part where i huwooo",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("submissions", null, {});
  },
};

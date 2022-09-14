"use strict";
const bcrypt = require("bcrypt")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        fullname: "Ivan Adrianto",
        email: "ivan@mail.com",
        password: await bcrypt.hash("password", 10),
        role: "participant",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        fullname: "Kawamatsu Kappa",
        email: "kawamatsu@mail.com",
        password: await bcrypt.hash("password", 10),
        role: "participant",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        fullname: "hiyori",
        email: "hiyori@mail.com",
        password: await bcrypt.hash("password", 10),
        role: "participant",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};

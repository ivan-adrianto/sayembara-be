"use strict";

const today = new Date()
const newDate = (days) => {
  today.setDate(today.getDate() + days)
  return today 
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("contests", [
      {
        id: 1,
        title: "Lomba Desain Logo Jamu Kaeno",
        prize: 100000000,
        contest_status: "Open",
        payment_status: "Unpaid",
        due_date: newDate(8),
        announcement_date: newDate(12),
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt maiores ratione veritatis, fugit blanditiis molestias rerum quibusdam deserunt vitae quasi id quos dicta, sed excepturi laborum facilis odio quae. Aliquam!",
        category_id: 1,
        provider_id: 1,
        winner_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        title: "Lomba Desain Starsky",
        prize: 130000000,
        due_date: newDate(5),
        announcement_date: newDate(8),
        contest_status: "Open",
        payment_status: "Unpaid",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt maiores ratione veritatis, fugit blanditiis molestias rerum quibusdam deserunt vitae quasi id quos dicta, sed excepturi laborum facilis odio quae. Aliquam!",
        category_id: 1,
        provider_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        title: "Lomba Desain UI Kaeno Apps ",
        prize: 200000000,
        due_date: newDate(20),
        announcement_date: newDate(26),
        contest_status: "Open",
        payment_status: "Unpaid",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt maiores ratione veritatis, fugit blanditiis molestias rerum quibusdam deserunt vitae quasi id quos dicta, sed excepturi laborum facilis odio quae. Aliquam!",
        category_id: 2,
        provider_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("contests", null, {});
  },
};

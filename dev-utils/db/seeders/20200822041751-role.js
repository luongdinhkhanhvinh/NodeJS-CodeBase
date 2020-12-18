"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("role", [
      {
        id: 1,
        name: "admin",
        full_name: "Siêu Admin",
        abbreviation: "SPA",
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("role", null, {});
  },
};

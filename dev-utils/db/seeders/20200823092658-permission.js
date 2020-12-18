"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("permission", permision);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("permission", null, {});
  },
};

const permision = [
  // User
  { id: 1, resource: "user", action: "update:own", attributes: "*" },
  { id: 2, resource: "user", action: "read:own", attributes: "*" },
  { id: 3, resource: "user", action: "read:any", attributes: "*" },
];

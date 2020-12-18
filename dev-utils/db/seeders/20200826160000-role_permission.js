"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("role_permission", granted);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("role_permission", null, {});
  },
};

const granted = [
  // Admin
  { role_id: 1, permission_id: 1 },
  { role_id: 1, permission_id: 2 },
  { role_id: 1, permission_id: 3 },
];

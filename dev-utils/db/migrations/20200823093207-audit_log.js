"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("audit_log", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "user",
          },
          key: "id",
        },
      },
      log_time: {
        type: Sequelize.DATE,
      },
      request_url: {
        type: Sequelize.STRING,
      },
      controller_name: {
        type: Sequelize.STRING,
      },
      action_name: {
        type: Sequelize.STRING,
      },
      response_code: {
        type: Sequelize.STRING,
      },
      auth_token: {
        type: Sequelize.STRING,
      },
      source_ip: {
        type: Sequelize.STRING,
      },
      request_body: {
        type: Sequelize.STRING,
      },
      request_date: {
        type: Sequelize.DATE,
      },
      request_device_info: {
        type: Sequelize.STRING,
      },
      request_user_agent: {
        type: Sequelize.STRING,
      },
      response_body: {
        type: Sequelize.STRING,
      },
      response_date: {
        type: Sequelize.DATE,
      },
      response_error: {
        type: Sequelize.STRING,
      },
      tracking_id: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("audit_log");
  },
};

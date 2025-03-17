"use strict";

const bcrypt = require("bcrypt");
const { QueryTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@pass.es";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin1234";

    // Verificar si el usuario admin ya existe
    const existingUser = await queryInterface.sequelize.query(
      "SELECT * FROM users_login WHERE email = ?",
      {
        replacements: [adminEmail],
        type: QueryTypes.SELECT,
      }
    );

    if (existingUser.length === 0) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await queryInterface.bulkInsert("users_login", [
        {
          email: adminEmail,
          password: hashedPassword,
          is_admin: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
      console.log("Admin user created.");
    } else {
      console.log("Admin user already exists.");
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users_login", { email: process.env.ADMIN_EMAIL || "admin@example.com" });
  },
};

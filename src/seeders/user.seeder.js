import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import User from "../models/User.js";

const defaultUsers = [
  {
    name: "Admin",
    email: "admin@vinilos.com",
    password: "admin123",
    admin: true,
  },
  {
    name: "Usuario",
    email: "user@vinilos.com",
    password: "user1234",
    admin: false,
  },
];

const seedUsers = async () => {
  try {
    await connectDB();

    for (const seedUser of defaultUsers) {
      const hashedPassword = await bcrypt.hash(seedUser.password, 10);

      await User.findOneAndUpdate(
        { email: seedUser.email },
        {
          name: seedUser.name,
          email: seedUser.email,
          password: hashedPassword,
          admin: seedUser.admin,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    }

    console.log("Usuarios cargados correctamente");
    console.log("Admin: admin@vinilos.com / admin123");
    console.log("Usuario: user@vinilos.com / user1234");
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedUsers();

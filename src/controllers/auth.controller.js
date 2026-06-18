import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
};

const isPasswordValid = (password) => {
  return password.length >= 6;
};

const getJwtSecret = () => {
  return process.env.JWT_SECRET || "dev_jwt_secret_change_me";
};

const isBcryptHash = (value) => {
  return typeof value === "string" && value.startsWith("$2");
};

const comparePassword = async (plainPassword, storedPassword) => {
  if (isBcryptHash(storedPassword)) {
    return bcrypt.compare(plainPassword, storedPassword);
  }

  return plainPassword === storedPassword;
};

const getToken = (user) => {
  return jwt.sign({ userId: user._id }, getJwtSecret(), {
    expiresIn: "7d",
  });
};

const isUserAdmin = (user) => {
  return Boolean(user.admin ?? user.isAdmin);
};

export const register = async (req, res) => {
  try {
    const { name, email } = req.body;

    const password = String(req.body.password);

    if (!name || !email || !password) {
      return res
        .status(422)
        .json({ message: "Todos los campos son obligatorios" });
    }

    if (!isEmailValid(email)) {
      return res.status(422).json({ message: "El correo no es valido" });
    }

    if (!isPasswordValid(password)) {
      return res
        .status(422)
        .json({ message: "Contraseña muy corta, mínimo 6 caracteres" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "El correo ya esta registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar al usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { email } = req.body;

    const password = String(req.body.password);

    if (!email || !password) {
      return res
        .status(422)
        .json({ message: "Todos los campos son obligatorios" });
    }

    if (!isEmailValid(email)) {
      return res.status(422).json({ message: "El correo no es valido" });
    }

    if (!isPasswordValid(password)) {
      return res
        .status(422)
        .json({ message: "Contraseña muy corta, mínimo 6 caracteres" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    if (!isBcryptHash(user.password)) {
      user.password = await bcrypt.hash(password, 10);
      await user.save();
    }

    const token = getToken(user);

    res.json({
      message: "Login correcto",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        admin: isUserAdmin(user),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

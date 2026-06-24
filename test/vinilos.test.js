import { expect } from "chai";
import { test } from "mocha";
import request from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import app from "../app.js";
import User from "../src/models/User.js";
import Vinilo from "../src/models/Vinilo.js";

const ADMIN_EMAIL = "admin.test@test.com";
const ADMIN_PASSWORD = "1234567";

describe("CRUD Vinilos", function () {
  this.timeout(15000);

  let viniloId;

  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    await User.deleteMany({ email: ADMIN_EMAIL });
    await Vinilo.deleteMany({ title: { $in: ["Un vinilo", "Vinilo actualizado", "Vinilo de prueba", "Vinilo para borrar"] } });

    const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await User.create({
      email: ADMIN_EMAIL,
      name: "Admin",
      password: hash,
      admin: true,
    });

    const vinilo = await Vinilo.create({
      title: "Vinilo de prueba",
      genre: "Rock",
      year: 2000,
      price: 24.99,
      image: "https://picsum.photos/300/400?random=1",
      featured: false,
    });

    viniloId = vinilo._id.toString();
  });

  test("tiene que traer un array de vinilos", async () => {
    const response = await request(app).get("/api/vinilos");

    expect(response.status).to.equal(200);
    expect(response.body.vinilos).to.be.an("array");
    expect(response.body).to.have.property("totalItems");
    expect(response.body).to.have.property("totalPages");
    expect(response.body).to.have.property("currentPage");
  });

  test("tiene que traer los generos disponibles", async () => {
    const response = await request(app).get("/api/vinilos/genres");

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });

  test("tiene que traer los vinilos destacados", async () => {
    const response = await request(app).get("/api/vinilos/featured");

    expect(response.status).to.equal(200);
    expect(response.body.vinilos).to.be.an("array");
  });

  test("el Admin tiene que poder crear un vinilo", async () => {
    const responseLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });

    expect(responseLogin.status).to.equal(200);
    expect(responseLogin.body).to.have.property("token");

    const token = responseLogin.body.token;

    const vinilo = {
      title: "Un vinilo",
      genre: "Hip hop",
      year: 1998,
      price: 19.99,
      image: "https://picsum.photos/300/400?random=5",
      featured: false,
    };

    const response = await request(app)
      .post("/api/vinilos")
      .set("Authorization", `Bearer ${token}`)
      .send(vinilo);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("title", vinilo.title);
    expect(response.body).to.have.property("genre", vinilo.genre);
    expect(response.body).to.have.property("year", vinilo.year);
    expect(response.body).to.have.property("price", vinilo.price);
  });

  test("devuelve 422 si falta el precio al crear un vinilo", async () => {
    const responseLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });

    const token = responseLogin.body.token;

    const response = await request(app)
      .post("/api/vinilos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Sin precio",
        genre: "Rock",
        year: 2000,
        image: "https://picsum.photos/300/400?random=10",
        featured: false,
      });

    expect(response.status).to.equal(422);
  });

  test("tiene que traer un vinilo por id", async () => {
    const response = await request(app).get(`/api/vinilos/${viniloId}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("_id", viniloId);
    expect(response.body).to.have.property("title", "Vinilo de prueba");
  });

  test("el Admin tiene que poder actualizar un vinilo", async () => {
    const responseLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });

    const token = responseLogin.body.token;

    const response = await request(app)
      .put(`/api/vinilos/${viniloId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Vinilo actualizado" });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("title", "Vinilo actualizado");
  });

  test("el Admin tiene que poder eliminar un vinilo", async () => {
    const responseLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });

    const token = responseLogin.body.token;

    const vinilo = await Vinilo.create({
      title: "Vinilo para borrar",
      genre: "Jazz",
      year: 1990,
      price: 15,
      image: "https://picsum.photos/300/400?random=9",
    });

    const response = await request(app)
      .delete(`/api/vinilos/${vinilo._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("message", "Vinilo borrado");

    const deleted = await Vinilo.findById(vinilo._id);
    expect(deleted).to.be.null;
  });
});

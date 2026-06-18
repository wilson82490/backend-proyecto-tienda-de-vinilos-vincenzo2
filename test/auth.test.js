import { expect } from "chai";
import { test } from "mocha";
import  request  from "supertest";
import app from "../app.js";
import User from "../src/models/User.js";



describe ('Auth User',function () {

    this.timeout(5000);

    test("tiene que crear un usuario", async () => {

        await User.deleteMany({email: "user.test@test.com"});

        const user = {
            email: "user.test@test.com",
             name: "Vincenzo User Test",
            password: "1234567"
        };

        const response = await request(app).post("/api/auth/register").send(user);
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('message',"Usuario registrado correctamente",);

    });
    test ("tendria que retornar 400 si el usuario ya existe", async () => {
        const user = {
            email: "user.test@test.com",
             name: "Vincenzo User Test",
            password: "1234567"
        };

        const response = await request(app).post("/api/auth/register").send(user);
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('message',"El correo ya esta registrado",);
    });

        test("tendria que devolver un token y si el email y el password son correctos", async () => {
        const user = {
            email: "user.test@test.com",
            password: "1234567",
        };

        const response = await request(app).post("/api/auth/login").send(user);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("token");
        });
})
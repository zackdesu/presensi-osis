// @ts-nocheck

import request from "supertest";
import { app } from "../src/app";
import prisma from "../libs/prisma";

describe("account test", () => {
  let cookie: string[] | undefined;
  beforeAll((done) => {
    prisma.$connect();
    done();
  });

  it("should can't check information account", async () => {
    const res = await request(app).get("/login");

    return expect(res.statusCode).toBe(403);
  });

  it(
    "should create account",
    async () => {
      const res = await request(app)
        .post("/register")
        .send({
          name: "testaccount1234567890",
          password: "testaccount1234567890",
          kelas: "X",
          jurusan: "Test",
          lokal: "2",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/);

      return expect(res.statusCode).toBe(200);
    },
    1000 * 20
  );

  it(
    "should login to the account",
    async () => {
      const res = await request(app)
        .post("/login")
        .send({
          name: "testaccount1234567890",
          password: "testaccount1234567890",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/);

      cookie = res.headers["set-cookie"];

      return expect(res.statusCode).toBe(200);
    },
    1000 * 20
  );

  const cRequest = (path: string) =>
    request(app)
      .post(path)
      .set("Cookie", cookie as string[]);

  it("should be able to check acc information", async () => {
    const res = await request(app)
      .get("/login")
      .set("Cookie", cookie as string[]);

    return expect(res.statusCode).toBe(200);
  });

  it("should be able to edit password", async () => {
    const res = await request(app)
      .put("/editpassword")
      .set("Cookie", cookie as string[])
      .send({
        oldPassword: "testaccount1234567890",
        newPassword: "testaccount12345678910",
      })
      .set("Accept", "application/json");

    cookie = res.headers["set-cookie"];

    return expect(res.statusCode).toBe(200);
  });

  it("should be able to logout", async () => {
    const res = await cRequest("/logout");

    cookie = res.headers["set-cookie"];

    return expect(res.statusCode).toBe(200);
  });

  // it("should be able to delete test account", async () => {
  //   const res = await request(app)
  //     .delete("/delete")
  //     .set("Cookie", cookie as string[]);

  //   cookie = res.headers["set-cookie"];

  //   return expect(res.statusCode).toBe(200);
  // });

  afterAll((done) => {
    prisma.$disconnect();
    done();
  });
});

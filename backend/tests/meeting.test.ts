// @ts-nocheck

import request from "supertest";
import { app } from "../src/app";
import prisma from "../libs/prisma";

describe("meeting", () => {
  let cookie: string[];

  beforeAll((done) => {
    prisma.$connect();
    done();
  });

  it(
    "should login first",
    async () => {
      const res = await request(app)
        .post("/login")
        .send({
          name: "testaccount1234567890",
          password: "testaccount12345678910",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/);

      cookie = res.headers["set-cookie"];

      return expect(res.statusCode).toBe(200);
    },
    1000 * 20
  );

  it("should create meeting", async () => {
    const res = await request(app)
      .post("/datapertemuan")
      .set("Cookie", cookie)
      .send({
        name: "RapatTesting1234567890",
        startTime: new Date(Date.now() - 1000 * 60 * 10),
        endTime: new Date(Date.now() + 1000 * 60 * 10),
        location: "testing12345",
        password: "testing12345",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    return expect(res.statusCode).toBe(200);
  });

  it("should checktime meeting", async () => {
    const res = await request(app).get("/checktime").set("Cookie", cookie);

    return expect(res.statusCode).toBe(200);
  });

  it("should presence", async () => {
    const res = await request(app)
      .post("/presensi")
      .set("Cookie", cookie)
      .send({
        password: "testing12345",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    return expect(res.statusCode).toBe(200);
  });

  it("should delete meeting", async () => {
    const meeting = await prisma.pertemuan.findFirst({
      where: {
        name: "RapatTesting1234567890",
      },
    });

    const res = await request(app)
      .delete("/datapertemuan/" + meeting?.id)
      .set("Cookie", cookie)
      .send({
        password: "testing12345",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    return expect(res.statusCode).toBe(200);
  });

  it("should logout", async () => {
    const res = await request(app).post("/logout").set("Cookie", cookie);

    cookie = res.headers["set-cookie"];

    return expect(res.statusCode).toBe(200);
  });

  afterAll((done) => {
    prisma.$disconnect();
    done();
  });
});

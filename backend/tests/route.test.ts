import request from "supertest";
import { app } from "../src/app";
import prisma from "../libs/prisma";
import "@types/jest";

describe("test route path", () => {
  beforeAll((done) => {
    prisma.$connect();
    done();
  });

  it("should show root path", async () => {
    const res = await request(app).get("/");
    return expect(res.statusCode).toBe(200);
  });

  it(
    "should show data user",
    async () => {
      const res = await request(app).get("/datauser");
      return expect(res.statusCode).toBe(200);
    },
    1000 * 10
  );

  it("should show data agenda", async () => {
    const res = await request(app).get("/dataagenda");
    return expect(res.statusCode).toBe(200);
  });

  afterAll((done) => {
    prisma.$disconnect();
    done();
  });
});

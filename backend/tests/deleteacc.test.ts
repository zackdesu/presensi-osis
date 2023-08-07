// @ts-nocheck

import request from "supertest";
import { app } from "../src/app";

describe("account delete", () => {
  let cookie: string[] | undefined;
  it(
    "should login to the account",
    async () => {
      const res = await request(app)
        .post("/login")
        .send({
          name: "testaccount123456789",
          password: "testaccount12345678910",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/);

      cookie = res.headers["set-cookie"];

      return expect(res.statusCode).toBe(200);
    },
    1000 * 20
  );

  it("should be able to delete test account", async () => {
    const res = await request(app)
      .delete("/delete")
      .set("Cookie", cookie as string[]);

    cookie = res.headers["set-cookie"];

    return expect(res.statusCode).toBe(200);
  });
});

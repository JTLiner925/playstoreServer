const supertest = require("supertest");
const app = require("../app");
const { expect } = require("chai");

describe("GET /apps", () => {
  it("should return an array of games", () => {
    return supertest(app)
      .get("/apps")
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf.at.least(1);
        const game = res.body[0];
        expect(game).to.include.all.keys(
          "App",
          "Rating",
          "Genres",
          "Content_Rating"
        );
      });
  });
});
